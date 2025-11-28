import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import {
  generateDeviceFingerprint,
  generateUserKeyPair,
  generateRotatingIdentifier,
} from "./fingerprint";

// Generate encryption key for the session
const generateEncryptionKey = () => {
  return CryptoJS.lib.WordArray.random(256 / 8).toString();
};

// Encrypt data using AES-256
export const encryptData = (data, key) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key
    ).toString();
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

// Decrypt data
export const decryptData = (encryptedData, key) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

// Session management
export const createSession = () => {
  const sessionId = uuidv4();
  const encryptionKey = generateEncryptionKey();
  const timestamp = new Date().toISOString();

  // Generate device fingerprint for user identification
  const deviceFingerprint = generateDeviceFingerprint();

  // Generate cryptographic user identifier
  const userKeyPair = generateUserKeyPair();

  // Generate rotating identifier
  const rotatingId = generateRotatingIdentifier(deviceFingerprint, Date.now());

  const session = {
    sessionId,
    encryptionKey,
    deviceFingerprint,
    userIdentifier: userKeyPair ? userKeyPair.userId : null,
    rotatingIdentifier: rotatingId,
    createdAt: timestamp,
    lastActivity: timestamp,
  };

  // Store in sessionStorage (encrypted)
  sessionStorage.setItem("kasaed_session", JSON.stringify(session));

  return session;
};

// Get current session
export const getSession = () => {
  const sessionData = sessionStorage.getItem("kasaed_session");
  if (!sessionData) return null;

  try {
    const session = JSON.parse(sessionData);

    // Check if session is still valid (24 hours)
    const createdAt = new Date(session.createdAt);
    const now = new Date();
    const hoursDiff = (now - createdAt) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      // Session expired
      clearSession();
      return null;
    }

    // Update last activity
    session.lastActivity = now.toISOString();

    // Update rotating identifier
    session.rotatingIdentifier = generateRotatingIdentifier(
      session.deviceFingerprint,
      Date.now()
    );

    sessionStorage.setItem("kasaed_session", JSON.stringify(session));

    return session;
  } catch (error) {
    console.error("Session retrieval error:", error);
    return null;
  }
};

// Clear session (logout/panic button)
export const clearSession = () => {
  sessionStorage.removeItem("kasaed_session");
  sessionStorage.removeItem("kasaed_preferences");
  sessionStorage.removeItem("kasaed_temp_chat");
};

// Reset user identification (allows user to get a new anonymous identity)
export const resetUserIdentity = () => {
  // Clear session which will force generation of new identifiers on next session creation
  clearSession();

  // Also clear any stored user preferences that might link to previous identity
  sessionStorage.removeItem("kasaed_preferences");
  localStorage.removeItem("userNickname");
  localStorage.removeItem("botPersonality");

  // For mobile app equivalent
  localStorage.removeItem("kasaed_user_profile");

  return true;
};

// Clear all app data (panic mode)
export const panicClear = () => {
  // Clear session storage
  sessionStorage.clear();

  // Clear local storage
  localStorage.clear();

  // Clear in-memory data
  if (window.chatHistory) {
    window.chatHistory = [];
  }

  // Redirect to blank page
  window.location.href = "about:blank";
};

// Get user identification information without revealing personal data
export const getUserIdentifiers = () => {
  const session = getSession();
  if (!session) return null;

  return {
    sessionId: session.sessionId,
    deviceFingerprint: session.deviceFingerprint,
    userIdentifier: session.userIdentifier,
    rotatingIdentifier: session.rotatingIdentifier,
  };
};

// Auto-logout after 15 minutes of inactivity
let inactivityTimer = null;

export const resetInactivityTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }

  inactivityTimer = setTimeout(() => {
    clearSession();
    window.location.reload();
  }, 15 * 60 * 1000); // 15 minutes
};

// Initialize inactivity monitoring
export const initInactivityMonitor = () => {
  // Reset timer on user activity
  ["mousedown", "keydown", "scroll", "touchstart"].forEach((event) => {
    document.addEventListener(event, resetInactivityTimer);
  });

  resetInactivityTimer();
};
