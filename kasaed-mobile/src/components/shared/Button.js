import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} from "../../theme/theme";

export const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.button,
    styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`],
    disabled && styles.buttonDisabled,
    fullWidth && styles.buttonFullWidth,
    style,
  ];

  const textStyles = [
    styles.buttonText,
    styles[`buttonText${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`buttonText${size.charAt(0).toUpperCase() + size.slice(1)}`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? colors.white : colors.primary600}
        />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },

  // Variants
  buttonPrimary: {
    backgroundColor: colors.primary600,
  },
  buttonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary600,
  },
  buttonOutline: {
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.gray300,
  },
  buttonDanger: {
    backgroundColor: colors.error,
  },
  buttonSuccess: {
    backgroundColor: colors.success,
  },
  buttonGhost: {
    backgroundColor: colors.transparent,
    shadowOpacity: 0,
    elevation: 0,
  },

  // Sizes
  buttonSm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  buttonMd: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  buttonLg: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    minHeight: 56,
  },

  // States
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonFullWidth: {
    width: "100%",
  },

  // Text styles
  buttonText: {
    fontWeight: typography.semibold,
    textAlign: "center",
  },
  buttonTextPrimary: {
    color: colors.white,
  },
  buttonTextSecondary: {
    color: colors.primary600,
  },
  buttonTextOutline: {
    color: colors.gray700,
  },
  buttonTextDanger: {
    color: colors.white,
  },
  buttonTextSuccess: {
    color: colors.white,
  },
  buttonTextGhost: {
    color: colors.primary600,
  },
  buttonTextSm: {
    fontSize: typography.sm,
  },
  buttonTextMd: {
    fontSize: typography.base,
  },
  buttonTextLg: {
    fontSize: typography.lg,
  },
});
