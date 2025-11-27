import React, { createContext, useContext, useState, useEffect } from 'react';
import { createSession, getSession, initInactivityMonitor } from '../utils/encryption';
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

  // Theme integration (only works if ThemeProvider is available)
  let themeContext = null;
  try {
    themeContext = useTheme();
  } catch {
    // ThemeProvider not available, ignore
  }

  // Initialize session
  useEffect(() => {
    let currentSession = getSession();
    if (!currentSession) {
      currentSession = createSession();
    }
    setSession(currentSession);

    // Initialize inactivity monitor
    initInactivityMonitor();

    // Load saved preferences
    loadPreferences();

    // Setup online/offline listeners
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  // Load preferences from storage
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
        
        // setOnboardingComplete(true); // Always start onboarding on reload for dev
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

  // Save preferences
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
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  // Save chat history
  const saveChatHistory = async (history) => {
    try {
      await localforage.setItem('chatHistory', history);
      setChatHistory(history);
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
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  // Complete onboarding
  const completeOnboarding = (profile) => {
    saveUserProfile(profile);
    setOnboardingComplete(true);
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

  const value = {
    session,
    userProfile,
    onboardingComplete,
    chatHistory,
    isOnline,
    saveUserProfile,
    updatePreference,
    addMessage,
    clearChatHistory,
    saveChatHistory,
    completeOnboarding
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
