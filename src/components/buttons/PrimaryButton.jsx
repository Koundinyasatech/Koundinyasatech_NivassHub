import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING, BORDER_RADIUS, SHADOWS } from '../../theme/spacing';

export default function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = 'filled',
  small = false,
  style,
  labelStyle,
}) {
  const isFilled = variant === 'filled';
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.base,
        small && styles.small,
        isFilled && styles.filled,
        isOutline && styles.outline,
        isGhost && styles.ghost,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isFilled ? COLORS.textInverse : COLORS.primary}
        />
      ) : (
        <Text
          style={[
            styles.label,
            small && styles.labelSmall,
            isFilled && styles.labelFilled,
            isOutline && styles.labelOutline,
            isGhost && styles.labelGhost,
            isDisabled && styles.labelDisabled,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    ...SHADOWS.sm,
  },
  small: {
    height: 40,
    paddingHorizontal: SPACING.base,
  },
  filled: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...TYPOGRAPHY.presets.button,
  },
  labelSmall: {
    ...TYPOGRAPHY.presets.buttonSmall,
  },
  labelFilled: {
    color: COLORS.textInverse,
  },
  labelOutline: {
    color: COLORS.primary,
  },
  labelGhost: {
    color: COLORS.primary,
  },
  labelDisabled: {
    color: COLORS.textDisabled,
  },
});
