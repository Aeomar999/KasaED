import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "../../theme/theme";

export const Badge = ({ text, variant = "default", style }) => {
  return (
    <View
      style={[
        styles.badge,
        styles[`badge${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        style,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          styles[
            `badgeText${variant.charAt(0).toUpperCase() + variant.slice(1)}`
          ],
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: "flex-start",
  },
  badgeDefault: {
    backgroundColor: colors.gray200,
  },
  badgePrimary: {
    backgroundColor: colors.primary100,
  },
  badgeSuccess: {
    backgroundColor: "#d1fae5",
  },
  badgeWarning: {
    backgroundColor: "#fef3c7",
  },
  badgeError: {
    backgroundColor: "#fee2e2",
  },
  badgeInfo: {
    backgroundColor: "#dbeafe",
  },
  badgeText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
  },
  badgeTextDefault: {
    color: colors.gray700,
  },
  badgeTextPrimary: {
    color: colors.primary700,
  },
  badgeTextSuccess: {
    color: "#065f46",
  },
  badgeTextWarning: {
    color: "#92400e",
  },
  badgeTextError: {
    color: "#991b1b",
  },
  badgeTextInfo: {
    color: "#1e40af",
  },
});
