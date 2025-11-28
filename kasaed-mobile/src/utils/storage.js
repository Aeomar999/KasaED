import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  encryptMessage,
  decryptMessage,
  createSession,
  getUserIdentifiers,
  resetUserIdentity,
} from "./encryption";

const STORAGE_KEYS = {
  MESSAGES: "chat_messages",
  USER_PROFILE: "user_profile",
  PERIOD_CYCLES: "period_cycles",
  VOICE_DIARY: "voice_diary",
  LEARNING_PROGRESS: "learning_progress",
  FAVORITES: "favorites",
  SESSION: "user_session", // New session storage key
};

// Session Storage
export const saveSession = async (session) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    return true;
  } catch (error) {
    console.error("Error saving session:", error);
    return false;
  }
};

export const loadSession = async () => {
  try {
    const session = await AsyncStorage.getItem(STORAGE_KEYS.SESSION);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error("Error loading session:", error);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.SESSION);
    return true;
  } catch (error) {
    console.error("Error clearing session:", error);
    return false;
  }
};

// Message Storage
export const saveMessages = async (messages) => {
  try {
    const encrypted = encryptMessage(messages);
    await AsyncStorage.setItem(STORAGE_KEYS.MESSAGES, encrypted);
    return true;
  } catch (error) {
    console.error("Error saving messages:", error);
    return false;
  }
};

export const loadMessages = async () => {
  try {
    const encrypted = await AsyncStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (!encrypted) return [];
    const decrypted = decryptMessage(encrypted);
    return decrypted || [];
  } catch (error) {
    console.error("Error loading messages:", error);
    return [];
  }
};

export const clearMessages = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.MESSAGES);
    return true;
  } catch (error) {
    console.error("Error clearing messages:", error);
    return false;
  }
};

// User Profile Storage
export const saveUserProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_PROFILE,
      JSON.stringify(profile)
    );
    return true;
  } catch (error) {
    console.error("Error saving user profile:", error);
    return false;
  }
};

export const loadUserProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error("Error loading user profile:", error);
    return null;
  }
};

// Period Tracker Storage
export const savePeriodCycles = async (cycles) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.PERIOD_CYCLES,
      JSON.stringify(cycles)
    );
    return true;
  } catch (error) {
    console.error("Error saving period cycles:", error);
    return false;
  }
};

export const loadPeriodCycles = async () => {
  try {
    const cycles = await AsyncStorage.getItem(STORAGE_KEYS.PERIOD_CYCLES);
    return cycles ? JSON.parse(cycles) : [];
  } catch (error) {
    console.error("Error loading period cycles:", error);
    return [];
  }
};

// Learning Progress Storage
export const saveLearningProgress = async (progress) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.LEARNING_PROGRESS,
      JSON.stringify(progress)
    );
    return true;
  } catch (error) {
    console.error("Error saving learning progress:", error);
    return false;
  }
};

export const loadLearningProgress = async () => {
  try {
    const progress = await AsyncStorage.getItem(STORAGE_KEYS.LEARNING_PROGRESS);
    return progress
      ? JSON.parse(progress)
      : { points: 0, level: 1, completedPaths: [] };
  } catch (error) {
    console.error("Error loading learning progress:", error);
    return { points: 0, level: 1, completedPaths: [] };
  }
};

// Generic storage utilities
export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error);
    return false;
  }
};

export const loadData = async (key, defaultValue = null) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error loading data for key ${key}:`, error);
    return defaultValue;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing data for key ${key}:`, error);
    return false;
  }
};

// Reset user identity (allows user to get a new anonymous identity)
export const resetUserIdentityStorage = async () => {
  try {
    // Clear session
    await clearSession();

    // Clear user profile
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE);

    // Clear other user-specific data
    await AsyncStorage.removeItem(STORAGE_KEYS.PERIOD_CYCLES);
    await AsyncStorage.removeItem(STORAGE_KEYS.VOICE_DIARY);
    await AsyncStorage.removeItem(STORAGE_KEYS.LEARNING_PROGRESS);
    await AsyncStorage.removeItem(STORAGE_KEYS.FAVORITES);

    // Call the encryption utility reset function
    await resetUserIdentity();

    return true;
  } catch (error) {
    console.error("Error resetting user identity:", error);
    return false;
  }
};

export default {
  saveMessages,
  loadMessages,
  clearMessages,
  saveUserProfile,
  loadUserProfile,
  savePeriodCycles,
  loadPeriodCycles,
  saveLearningProgress,
  loadLearningProgress,
  saveData,
  loadData,
  removeData,
  saveSession,
  loadSession,
  clearSession,
  resetUserIdentityStorage,
};
