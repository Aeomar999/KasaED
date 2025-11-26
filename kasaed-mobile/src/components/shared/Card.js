import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "../../theme/theme";

export const Card = ({ children, style, padding = true }) => {
  return (
    <View style={[styles.card, !padding && styles.noPadding, style]}>
      {children}
    </View>
  );
};

export const CardHeader = ({ title, subtitle, style }) => {
  return (
    <View style={[styles.cardHeader, style]}>
      {title && <Text style={styles.cardTitle}>{title}</Text>}
      {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
    </View>
  );
};

export const CardContent = ({ children, style }) => {
  return <View style={[styles.cardContent, style]}>{children}</View>;
};

export const CardFooter = ({ children, style }) => {
  return <View style={[styles.cardFooter, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
  },
  noPadding: {
    padding: 0,
  },
  cardHeader: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    fontSize: typography.sm,
    color: colors.gray600,
  },
  cardContent: {
    marginVertical: spacing.sm,
  },
  cardFooter: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
});
