import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { saveLanguage } from "../i18n/i18n";
import { saveUserProfile } from "../utils/storage";
import { Button } from "../components/shared/Button";
import { Card } from "../components/shared/Card";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "../theme/theme";

const OnboardingScreen = ({ onComplete }) => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedAge, setSelectedAge] = useState("");

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "tw", name: "Twi", nativeName: "Twi" },
    { code: "ee", name: "Ewe", nativeName: "Eʋegbe" },
    { code: "ha", name: "Hausa", nativeName: "Hausa" },
  ];

  const handleLanguageSelect = async (languageCode) => {
    setSelectedLanguage(languageCode);
    await saveLanguage(languageCode);
    i18n.changeLanguage(languageCode);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleComplete = async () => {
    await saveUserProfile({
      language: selectedLanguage,
      ageGroup: selectedAge,
      onboardingCompletedAt: new Date().toISOString(),
    });
    onComplete();
  };

  // Step 1: Language Selection
  if (step === 1) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.headerCompact}>
            <Text style={styles.logoSmall}>🌟</Text>
            <Text style={styles.appNameCompact}>{t("appName")}</Text>
          </View>

          <Card style={styles.cardCompact}>
            <Text style={styles.titleCompact}>{t("selectLanguage")}</Text>
            <View style={styles.languageGridCompact}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOptionCompact,
                    selectedLanguage === lang.code &&
                      styles.languageOptionSelected,
                  ]}
                  onPress={() => handleLanguageSelect(lang.code)}
                >
                  <Text
                    style={[
                      styles.languageNameCompact,
                      selectedLanguage === lang.code &&
                        styles.languageNameSelected,
                    ]}
                  >
                    {lang.nativeName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Button
            title={t("continue") || "Continue"}
            onPress={handleNextStep}
            fullWidth
            style={styles.buttonCompact}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Step 2: Privacy Notice
  if (step === 2) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.headerCompact}>
            <Text style={styles.iconCompact}>🔒</Text>
            <Text style={styles.titleCompact}>{t("privacyTitle")}</Text>
          </View>

          <Card style={styles.cardCompact}>
            <Text style={styles.privacyText}>{t("privacyText")}</Text>

            <View style={styles.privacyPoints}>
              <View style={styles.privacyPoint}>
                <Text style={styles.privacyIcon}>✅</Text>
                <Text style={styles.privacyPointText}>
                  All conversations are encrypted end-to-end
                </Text>
              </View>
              <View style={styles.privacyPoint}>
                <Text style={styles.privacyIcon}>✅</Text>
                <Text style={styles.privacyPointText}>
                  No personal information is collected
                </Text>
              </View>
              <View style={styles.privacyPoint}>
                <Text style={styles.privacyIcon}>✅</Text>
                <Text style={styles.privacyPointText}>
                  You can delete your data anytime
                </Text>
              </View>
              <View style={styles.privacyPoint}>
                <Text style={styles.privacyIcon}>✅</Text>
                <Text style={styles.privacyPointText}>
                  Quick exit button for emergencies
                </Text>
              </View>
            </View>
          </Card>

          <Button
            title={t("agreePrivacy")}
            onPress={handleNextStep}
            fullWidth
            style={styles.buttonCompact}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Step 3: Age Selection
  if (step === 3) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.headerCompact}>
            <Text style={styles.iconCompact}>👤</Text>
            <Text style={styles.titleCompact}>{t("selectAge")}</Text>
          </View>

          <Card style={styles.cardCompact}>
            <TouchableOpacity
              style={[
                styles.ageOptionCompact,
                selectedAge === "13-17" && styles.ageOptionSelected,
              ]}
              onPress={() => setSelectedAge("13-17")}
            >
              <Text
                style={[
                  styles.ageText,
                  selectedAge === "13-17" && styles.ageTextSelected,
                ]}
              >
                {t("age13_17")}
              </Text>
              {selectedAge === "13-17" && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.ageOptionCompact,
                selectedAge === "18-25" && styles.ageOptionSelected,
              ]}
              onPress={() => setSelectedAge("18-25")}
            >
              <Text
                style={[
                  styles.ageText,
                  selectedAge === "18-25" && styles.ageTextSelected,
                ]}
              >
                {t("age18_25")}
              </Text>
              {selectedAge === "18-25" && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          </Card>

          <Button
            title={t("getStarted")}
            onPress={handleComplete}
            disabled={!selectedAge}
            fullWidth
            style={styles.buttonCompact}
          />
        </View>
      </SafeAreaView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
    justifyContent: "center",
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xxxl,
  },
  headerCompact: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  logo: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  logoSmall: {
    fontSize: 40,
    marginBottom: spacing.xs,
  },
  appName: {
    fontSize: typography.xxxxl,
    fontWeight: typography.bold,
    color: colors.primary600,
    marginBottom: spacing.xs,
  },
  appNameCompact: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary600,
  },
  tagline: {
    fontSize: typography.sm,
    color: colors.gray600,
    textAlign: "center",
  },
  iconLarge: {
    fontSize: 56,
    marginBottom: spacing.sm,
  },
  iconCompact: {
    fontSize: 40,
    marginBottom: spacing.xs,
  },
  card: {
    marginBottom: spacing.xl,
  },
  cardCompact: {
    marginBottom: spacing.md,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.gray900,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  titleCompact: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.gray900,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  languageGrid: {
    gap: spacing.md,
  },
  languageGridCompact: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "space-between",
  },
  languageOption: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: "center",
    ...shadows.sm,
  },
  languageOptionCompact: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    width: "48%",
    ...shadows.sm,
  },
  languageOptionSelected: {
    borderColor: colors.primary600,
    backgroundColor: colors.primary50,
  },
  languageName: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  languageNameCompact: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.gray900,
  },
  languageNameSelected: {
    color: colors.primary600,
  },
  languageCode: {
    fontSize: typography.sm,
    color: colors.gray600,
  },
  languageCodeSelected: {
    color: colors.primary600,
  },
  privacyText: {
    fontSize: typography.sm,
    color: colors.gray700,
    textAlign: "center",
    marginBottom: spacing.md,
    lineHeight: typography.normal * typography.sm,
  },
  privacyPoints: {
    gap: spacing.sm,
  },
  privacyPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  privacyIcon: {
    fontSize: typography.base,
    marginRight: spacing.xs,
  },
  privacyPointText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.gray700,
    lineHeight: typography.normal * typography.sm,
  },
  ageOption: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...shadows.sm,
  },
  ageOptionCompact: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...shadows.sm,
  },
  ageOptionSelected: {
    borderColor: colors.primary600,
    backgroundColor: colors.primary50,
  },
  ageText: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.gray900,
  },
  ageTextSelected: {
    color: colors.primary600,
  },
  checkmark: {
    fontSize: typography.xl,
    color: colors.primary600,
  },
  button: {
    marginTop: spacing.md,
  },
  buttonCompact: {
    marginTop: spacing.md,
  },
});

export default OnboardingScreen;
