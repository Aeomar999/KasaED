import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "../../theme/theme";

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          error && styles.inputError,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray400}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.gray700,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.base,
    color: colors.gray900,
    minHeight: 48,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: typography.xs,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
