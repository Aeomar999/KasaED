import React, { createContext, useContext, useState, useEffect } from 'react';
import { createSession, getSession, initInactivityMonitor, getUserIdentifiers, resetUserIdentity } from '../utils/encryption';
import { initDatabase, loadUserProfile, loadChatHistory, loadUserPreferences, loadCryptographicIdentifiers, loadAppConfiguration, saveUserProfile as saveUserProfileDB, saveChatHistory as saveChatHistoryDB, saveUserPreferences as saveUserPreferencesDB, saveCryptographicIdentifiers as saveCryptographicIdentifiersDB, saveAppConfiguration as saveAppConfigurationDB } from '../utils/localDatabase';
import localforage from 'localforage';
import { useTheme } from './ThemeContext';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState({
    ageGroup: null,
    language: 'en',
    seenTutorials: [], // Array of tutorial IDs
    preferences: {
      fontSize: 'medium',
      darkMode: false,
      voiceEnabled: false,
      highContrast: false
    }
  });
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [databaseInitialized, setDatabaseInitialized] = useState(false);

  // Theme integration (only works if ThemeProvider is available)
  let themeContext = null;
  try {
    themeContext = useTheme();
  } catch {
    // ThemeProvider not available, ignore
  }

  // Initialize session and database
  useEffect(() => {
    const initializeApp = async () => {
      // Initialize local database
      const dbInitialized = await initDatabase();
      setDatabaseInitialized(dbInitialized);
      
      // Get or create session
      let currentSession = getSession();
      if (!currentSession) {
        currentSession = createSession();
      }
      setSession(currentSession);

      // Initialize inactivity monitor
      initInactivityMonitor();

      // Load saved data from local database
      if (dbInitialized) {
        await loadAllUserData(currentSession.encryptionKey);
      } else {
        // Fallback to localforage if database initialization failed
        await loadPreferences();
      }

      // Setup online/offline listeners
      window.addEventListener('online', () => setIsOnline(true));
      window.addEventListener('offline', () => setIsOnline(false));

      return () => {
        window.removeEventListener('online', () => setIsOnline(true));
        window.removeEventListener('offline', () => setIsOnline(false));
      };
    };

    initializeApp();
  }, []);

  // Load all user data from local database
  const loadAllUserData = async (encryptionKey) => {
    try {
      // Load user profile
      const savedProfile = await loadUserProfile(encryptionKey);
      if (savedProfile) {
        setUserProfile(savedProfile);
        
        // Apply saved preferences to DOM immediately
        applyPreferencesToDOM(savedProfile.preferences);

        // Sync with theme context if available
        if (themeContext && savedProfile.preferences?.darkMode !== undefined) {
          if (savedProfile.preferences.darkMode) {
            themeContext.setDarkTheme();
          } else {
            themeContext.setLightTheme();
          }
        }

        // Check if user has completed onboarding by checking for required profile data
        if (savedProfile.ageGroup && savedProfile.language) {
          setOnboardingComplete(true);
        }
      }

      // Load chat history
      const savedHistory = await loadChatHistory(encryptionKey);
      if (savedHistory) {
        setChatHistory(savedHistory);
      }

      // Load user preferences
      const savedPreferences = await loadUserPreferences(encryptionKey);
      if (savedPreferences) {
        // Already applied above when loading profile
      }

      // Load cryptographic identifiers
      const savedIdentifiers = await loadCryptographicIdentifiers(encryptionKey);
      if (savedIdentifiers) {
        // Identifiers are already in the session, but we can log or use them if needed
        console.log('Loaded cryptographic identifiers from database');
      }

      // Load app configuration
      const savedConfig = await loadAppConfiguration(encryptionKey);
      if (savedConfig) {
        // Apply configuration if needed
        console.log('Loaded app configuration from database');
      }
    } catch (error) {
      console.error('Error loading user data from database:', error);
    }
  };

  // Load preferences from storage (fallback method)
  const loadPreferences = async () => {
    try {
      const savedProfile = await localforage.getItem('userProfile');
      if (savedProfile) {
        setUserProfile(savedProfile);

        // Apply saved preferences to DOM immediately
        applyPreferencesToDOM(savedProfile.preferences);

        // Sync with theme context if available
        if (themeContext && savedProfile.preferences?.darkMode !== undefined) {
          if (savedProfile.preferences.darkMode) {
            themeContext.setDarkTheme();
          } else {
            themeContext.setLightTheme();
          }
        }

        // Check if user has completed onboarding by checking for required profile data
        if (savedProfile.ageGroup && savedProfile.language) {
          setOnboardingComplete(true);
        }
      }

      const savedHistory = await localforage.getItem('chatHistory');
      if (savedHistory) {
        setChatHistory(savedHistory);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  // Apply preferences to DOM
  const applyPreferencesToDOM = (preferences) => {
    if (!preferences) return;

    // Apply font size
    if (preferences.fontSize) {
      document.documentElement.setAttribute('data-font-size', preferences.fontSize);
    }

    // Apply high contrast
    if (preferences.highContrast !== undefined) {
      document.documentElement.setAttribute('data-high-contrast', preferences.highContrast ? 'true' : 'false');
    }
  };

  // Apply preferences whenever userProfile changes
  useEffect(() => {
    if (userProfile && userProfile.preferences) {
      applyPreferencesToDOM(userProfile.preferences);
    }
  }, [userProfile]);

  // Save all user data to local database
  const saveAllUserData = async (profile, history, encryptionKey) => {
    if (!databaseInitialized) return;
    
    try {
      // Save user profile
      await saveUserProfileDB(profile, encryptionKey);
      
      // Save chat history
      await saveChatHistoryDB(history, encryptionKey);
      
      // Save user preferences
      await saveUserPreferencesDB(profile.preferences, encryptionKey);
      
      // Save cryptographic identifiers
      if (session) {
        const identifiers = {
          sessionId: session.sessionId,
          deviceFingerprint: session.deviceFingerprint,
          userIdentifier: session.userIdentifier,
          rotatingIdentifier: session.rotatingIdentifier
        };
        await saveCryptographicIdentifiersDB(identifiers, encryptionKey);
      }
      
      // Save app configuration
      const appConfig = {
        onboardingComplete,
        isOnline
      };
      await saveAppConfigurationDB(appConfig, encryptionKey);
      
      console.log('All user data saved to local database');
    } catch (error) {
      console.error('Error saving user data to database:', error);
    }
  };

  // Save user profile
  const saveUserProfile = async (profile) => {
    try {
      await localforage.setItem('userProfile', profile);
      setUserProfile(profile);

      // Apply preferences to DOM immediately
      applyPreferencesToDOM(profile.preferences);

      // Sync with theme context if available
      if (themeContext && profile.preferences?.darkMode !== undefined) {
        if (profile.preferences.darkMode) {
          themeContext.setDarkTheme();
        } else {
          themeContext.setLightTheme();
        }
      }

      // Save to local database if initialized
      if (session && databaseInitialized) {
        await saveUserProfileDB(profile, session.encryptionKey);
        await saveUserPreferencesDB(profile.preferences, session.encryptionKey);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  // Save chat history
  const saveChatHistory = async (history) => {
    try {
      await localforage.setItem('chatHistory', history);
      setChatHistory(history);
      
      // Save to local database if initialized
      if (session && databaseInitialized) {
        await saveChatHistoryDB(history, session.encryptionKey);
      }
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  // Add message to chat
  const addMessage = (message) => {
    const newHistory = [...chatHistory, {
      ...message,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }];
    saveChatHistory(newHistory);
  };

  // Clear chat history
  const clearChatHistory = async () => {
    try {
      await localforage.removeItem('chatHistory');
      setChatHistory([]);
      
      // Clear from local database if initialized
      if (session && databaseInitialized) {
        await saveChatHistoryDB([], session.encryptionKey);
      }
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  // Complete onboarding
  const completeOnboarding = (profile) => {
    saveUserProfile(profile);
    setOnboardingComplete(true);
    
    // Save onboarding status to database
    if (session && databaseInitialized) {
      saveAppConfigurationDB({ onboardingComplete: true, isOnline }, session.encryptionKey);
    }
  };

  // Update specific preference
  const updatePreference = async (key, value) => {
    const updatedPreferences = {
      ...userProfile.preferences,
      [key]: value
    };
    const updatedProfile = {
      ...userProfile,
      preferences: updatedPreferences
    };
    await saveUserProfile(updatedProfile);
  };

  // Mark tutorial as seen
  const markTutorialSeen = async (tutorialId) => {
    const updatedProfile = {
      ...userProfile,
      seenTutorials: [...(userProfile.seenTutorials || []), tutorialId]
    };
    await saveUserProfile(updatedProfile);
  };

  // Get user identification information
  const getUserIdentifiers = () => {
    return getUserIdentifiers();
  };

  // Reset user identity
  const resetIdentity = async () => {
    // Reset the identity in encryption utilities
    resetUserIdentity();
    
    // Clear all user data from local database
    if (databaseInitialized) {
      await clearAllUserData();
    }
    
    // Clear session state
    setSession(null);
    
    // Reset onboarding status
    setOnboardingComplete(false);
    
    // Reload the page to establish a new session
    window.location.reload();
  };

  const value = {
    session,
    userProfile,
    onboardingComplete,
    chatHistory,
    isOnline,
    databaseInitialized,
    saveUserProfile,
    updatePreference,
    addMessage,
    clearChatHistory,
    saveChatHistory,
    completeOnboarding,
    markTutorialSeen,
    getUserIdentifiers,
    resetIdentity
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};