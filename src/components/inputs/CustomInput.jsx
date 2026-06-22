import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  hint,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isSecure = secureTextEntry && !showPassword;
  const hasError = !!error;

  const borderColor = hasError
    ? COLORS.error
    : focused
    ? COLORS.primary
    : COLORS.border;

  return (
    <View style={[styles.wrapper, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputRow,
          { borderColor },
          focused && styles.inputFocused,
          !editable && styles.inputDisabled,
          multiline && styles.inputMultiline,
        ]}
      >
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

        <TextInput
          style={[styles.input, multiline && styles.textArea, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          textAlignVertical={multiline ? 'top' : 'center'}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.rightIcon}
          >
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.base,
  },
  label: {
    ...TYPOGRAPHY.presets.label,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    minHeight: 52,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySurface,
  },
  inputDisabled: {
    backgroundColor: COLORS.borderLight,
    opacity: 0.7,
  },
  inputMultiline: {
    alignItems: 'flex-start',
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.presets.bodyLarge,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  textArea: {
    minHeight: 80,
  },
  leftIcon: {
    marginRight: SPACING.sm,
  },
  rightIcon: {
    marginLeft: SPACING.sm,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 18,
  },
  error: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  hint: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
});
