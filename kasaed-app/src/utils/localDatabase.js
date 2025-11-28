import localforage from "localforage";
import { encryptData, decryptData } from "./encryption";

// Initialize localForage instances for different data types
const dbConfig = {
  name: "KasaEdDB",
  version: 1.0,
  description: "Local database for KasaEd application",
};

// Create separate stores for different data types
const userProfileStore = localforage.createInstance({
  ...dbConfig,
  storeName: "userProfiles",
});

const chatHistoryStore = localforage.createInstance({
  ...dbConfig,
  storeName: "chatHistories",
});

const identifiersStore = localforage.createInstance({
  ...dbConfig,
  storeName: "cryptographicIdentifiers",
});

const preferencesStore = localforage.createInstance({
  ...dbConfig,
  storeName: "userPreferences",
});

const appConfigStore = localforage.createInstance({
  ...dbConfig,
  storeName: "appConfigurations",
});

// Database initialization
export const initDatabase = async () => {
  try {
    // Configure all stores
    await userProfileStore.ready();
    await chatHistoryStore.ready();
    await identifiersStore.ready();
    await preferencesStore.ready();
    await appConfigStore.ready();

    console.log("Local database initialized successfully");
    return true;
  } catch (error) {
    console.error("Database initialization error:", error);
    return false;
  }
};

// Save user profile with encryption
export const saveUserProfile = async (profile, encryptionKey) => {
  try {
    const encryptedProfile = encryptData(profile, encryptionKey);
    if (encryptedProfile) {
      await userProfileStore.setItem("currentUserProfile", encryptedProfile);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error saving user profile:", error);
    return false;
  }
};

// Load user profile with decryption
export const loadUserProfile = async (encryptionKey) => {
  try {
    const encryptedProfile = await userProfileStore.getItem(
      "currentUserProfile"
    );
    if (encryptedProfile) {
      const decryptedProfile = decryptData(encryptedProfile, encryptionKey);
      return decryptedProfile;
    }
    return null;
  } catch (error) {
    console.error("Error loading user profile:", error);
    return null;
  }
};

// Save chat history with encryption
export const saveChatHistory = async (history, encryptionKey) => {
  try {
    const encryptedHistory = encryptData(history, encryptionKey);
    if (encryptedHistory) {
      await chatHistoryStore.setItem(
        "currentUserChatHistory",
        encryptedHistory
      );
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error saving chat history:", error);
    return false;
  }
};

// Load chat history with decryption
export const loadChatHistory = async (encryptionKey) => {
  try {
    const encryptedHistory = await chatHistoryStore.getItem(
      "currentUserChatHistory"
    );
    if (encryptedHistory) {
      const decryptedHistory = decryptData(encryptedHistory, encryptionKey);
      return decryptedHistory || [];
    }
    return [];
  } catch (error) {
    console.error("Error loading chat history:", error);
    return [];
  }
};

// Save cryptographic identifiers with encryption
export const saveCryptographicIdentifiers = async (
  identifiers,
  encryptionKey
) => {
  try {
    const encryptedIdentifiers = encryptData(identifiers, encryptionKey);
    if (encryptedIdentifiers) {
      await identifiersStore.setItem(
        "currentUserIdentifiers",
        encryptedIdentifiers
      );
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error saving cryptographic identifiers:", error);
    return false;
  }
};

// Load cryptographic identifiers with decryption
export const loadCryptographicIdentifiers = async (encryptionKey) => {
  try {
    const encryptedIdentifiers = await identifiersStore.getItem(
      "currentUserIdentifiers"
    );
    if (encryptedIdentifiers) {
      const decryptedIdentifiers = decryptData(
        encryptedIdentifiers,
        encryptionKey
      );
      return decryptedIdentifiers;
    }
    return null;
  } catch (error) {
    console.error("Error loading cryptographic identifiers:", error);
    return null;
  }
};

// Save user preferences with encryption
export const saveUserPreferences = async (preferences, encryptionKey) => {
  try {
    const encryptedPreferences = encryptData(preferences, encryptionKey);
    if (encryptedPreferences) {
      await preferencesStore.setItem(
        "currentUserPreferences",
        encryptedPreferences
      );
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error saving user preferences:", error);
    return false;
  }
};

// Load user preferences with decryption
export const loadUserPreferences = async (encryptionKey) => {
  try {
    const encryptedPreferences = await preferencesStore.getItem(
      "currentUserPreferences"
    );
    if (encryptedPreferences) {
      const decryptedPreferences = decryptData(
        encryptedPreferences,
        encryptionKey
      );
      return decryptedPreferences;
    }
    return null;
  } catch (error) {
    console.error("Error loading user preferences:", error);
    return null;
  }
};

// Save application configuration with encryption
export const saveAppConfiguration = async (config, encryptionKey) => {
  try {
    const encryptedConfig = encryptData(config, encryptionKey);
    if (encryptedConfig) {
      await appConfigStore.setItem("currentAppConfig", encryptedConfig);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error saving app configuration:", error);
    return false;
  }
};

// Load application configuration with decryption
export const loadAppConfiguration = async (encryptionKey) => {
  try {
    const encryptedConfig = await appConfigStore.getItem("currentAppConfig");
    if (encryptedConfig) {
      const decryptedConfig = decryptData(encryptedConfig, encryptionKey);
      return decryptedConfig;
    }
    return null;
  } catch (error) {
    console.error("Error loading app configuration:", error);
    return null;
  }
};

// Clear all user data (for logout/panic button)
export const clearAllUserData = async () => {
  try {
    await userProfileStore.clear();
    await chatHistoryStore.clear();
    await identifiersStore.clear();
    await preferencesStore.clear();
    await appConfigStore.clear();
    return true;
  } catch (error) {
    console.error("Error clearing user data:", error);
    return false;
  }
};

// Get database statistics
export const getDatabaseStats = async () => {
  try {
    const stats = {
      userProfile: await userProfileStore.length(),
      chatHistory: await chatHistoryStore.length(),
      identifiers: await identifiersStore.length(),
      preferences: await preferencesStore.length(),
      appConfig: await appConfigStore.length(),
    };
    return stats;
  } catch (error) {
    console.error("Error getting database stats:", error);
    return null;
  }
};

export default {
  initDatabase,
  saveUserProfile,
  loadUserProfile,
  saveChatHistory,
  loadChatHistory,
  saveCryptographicIdentifiers,
  loadCryptographicIdentifiers,
  saveUserPreferences,
  loadUserPreferences,
  saveAppConfiguration,
  loadAppConfiguration,
  clearAllUserData,
  getDatabaseStats,
};
