import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

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

  const session = {
    sessionId,
    encryptionKey,
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
