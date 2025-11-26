import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "./src/i18n/i18n";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import ChatScreen from "./src/screens/ChatScreen";

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboarded = await AsyncStorage.getItem("onboardingComplete");
      setIsOnboarded(onboarded === "true");
    } catch (error) {
      console.error("Error checking onboarding status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem("onboardingComplete", "true");
      setIsOnboarded(true);
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#6366f1" />
      {!isOnboarded ? (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      ) : (
        <ChatScreen />
      )}
    </SafeAreaProvider>
  );
}
