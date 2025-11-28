import CryptoJS from "crypto-js";

// Generate a device fingerprint based on non-personal browser/device characteristics
export const generateDeviceFingerprint = () => {
  try {
    // Collect non-personal device information
    const fingerprintData = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cookieEnabled: navigator.cookieEnabled,
      touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      hardwareConcurrency: navigator.hardwareConcurrency || "unknown",
      deviceMemory: navigator.deviceMemory || "unknown",
    };

    // Create a stable string representation
    const fingerprintString = JSON.stringify(fingerprintData);

    // Hash the fingerprint data to create a unique identifier
    const hashedFingerprint = CryptoJS.SHA256(fingerprintString).toString();

    return hashedFingerprint;
  } catch (error) {
    console.error("Fingerprint generation error:", error);
    // Fallback to a random identifier if fingerprinting fails
    return CryptoJS.lib.WordArray.random(256 / 8).toString();
  }
};

// Generate cryptographic key pair for user identification
export const generateUserKeyPair = () => {
  try {
    // In a real implementation, we would use Web Crypto API for key generation
    // For this implementation, we'll generate a key pair using CryptoJS
    const privateKey = CryptoJS.lib.WordArray.random(256 / 8).toString();
    const publicKey = CryptoJS.SHA256(privateKey).toString();

    return {
      privateKey,
      publicKey,
      userId: publicKey, // Use public key hash as user identifier
    };
  } catch (error) {
    console.error("Key pair generation error:", error);
    return null;
  }
};

// Create a rotating pseudonymous identifier
export const generateRotatingIdentifier = (baseIdentifier, timestamp) => {
  try {
    const rotationData = `${baseIdentifier}-${Math.floor(
      timestamp / (1000 * 60 * 60 * 24)
    )}`; // Rotate daily
    return CryptoJS.SHA256(rotationData).toString();
  } catch (error) {
    console.error("Rotating identifier generation error:", error);
    return CryptoJS.lib.WordArray.random(256 / 8).toString();
  }
};

export default {
  generateDeviceFingerprint,
  generateUserKeyPair,
  generateRotatingIdentifier,
};
