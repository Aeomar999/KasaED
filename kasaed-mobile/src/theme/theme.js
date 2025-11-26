// KasaEd Mobile Theme System
export const colors = {
  // Primary brand colors
  primary600: "#6366f1",
  primary700: "#4f46e5",
  primary500: "#818cf8",
  primary100: "#e0e7ff",
  primary50: "#eef2ff",

  // Accent colors
  accent600: "#14b8a6",
  accent700: "#0f766e",
  accent500: "#2dd4bf",

  // Semantic colors
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",

  // Neutral colors
  gray900: "#111827",
  gray800: "#1f2937",
  gray700: "#374151",
  gray600: "#4b5563",
  gray500: "#6b7280",
  gray400: "#9ca3af",
  gray300: "#d1d5db",
  gray200: "#e5e7eb",
  gray100: "#f3f4f6",
  gray50: "#f9fafb",

  // Utility
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",

  // Shadows
  shadowColor: "rgba(0, 0, 0, 0.1)",
  shadowColorDark: "rgba(0, 0, 0, 0.25)",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const typography = {
  // Font sizes
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  xxxxl: 36,

  // Font weights
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",

  // Line heights
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
};

export const shadows = {
  sm: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadowColorDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.shadowColorDark,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 12,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
};
