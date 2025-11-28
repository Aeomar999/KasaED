import CryptoJS from "crypto-js";
import {
  generateDeviceFingerprint,
  generateUserKeyPair,
  generateRotatingIdentifier,
} from "./fingerprint";

const ENCRYPTION_KEY = "KasaEd-Secure-Key-2024-SRH-Mobile-App";

export const encryptMessage = (message) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(message),
      ENCRYPTION_KEY
    ).toString();
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const decryptMessage = (encryptedMessage) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, ENCRYPTION_KEY);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

export const generateMessageId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Generate a session with anonymous user identification
export const createSession = async () => {
  try {
    const sessionId = generateMessageId();
    const timestamp = new Date().toISOString();

    // Generate device fingerprint for user identification
    const deviceFingerprint = await generateDeviceFingerprint();

    // Generate cryptographic user identifier
    const userKeyPair = generateUserKeyPair();

    // Generate rotating identifier
    const rotatingId = generateRotatingIdentifier(
      deviceFingerprint,
      Date.now()
    );

    const session = {
      sessionId,
      deviceFingerprint,
      userIdentifier: userKeyPair ? userKeyPair.userId : null,
      rotatingIdentifier: rotatingId,
      createdAt: timestamp,
      lastActivity: timestamp,
    };

    return session;
  } catch (error) {
    console.error("Session creation error:", error);
    return null;
  }
};

// Get user identification information without revealing personal data
export const getUserIdentifiers = async (sessionId) => {
  try {
    const deviceFingerprint = await generateDeviceFingerprint();
    const userKeyPair = generateUserKeyPair();
    const rotatingId = generateRotatingIdentifier(
      deviceFingerprint,
      Date.now()
    );

    return {
      sessionId,
      deviceFingerprint,
      userIdentifier: userKeyPair ? userKeyPair.userId : null,
      rotatingIdentifier: rotatingId,
    };
  } catch (error) {
    console.error("Error getting user identifiers:", error);
    return null;
  }
};

// Reset user identification (allows user to get a new anonymous identity)
export const resetUserIdentity = async () => {
  try {
    // In a real implementation, you would clear secure storage
    // For now, we'll just return true to indicate success
    return true;
  } catch (error) {
    console.error("Error resetting user identity:", error);
    return false;
  }
};
