import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING } from '../../theme/spacing';

export default function AppLoader({ message = 'Loading...', fullScreen = true, size = 'large' }) {
  if (fullScreen) {
    return (
      <View style={styles.fullScreen}>
        <ActivityIndicator size={size} color={COLORS.primary} />
        {message ? (
          <Text style={styles.message}>{message}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.inline}>
      <ActivityIndicator size={size} color={COLORS.primary} />
      {message ? (
        <Text style={styles.inlineMessage}>{message}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    gap: SPACING.md,
  },
  inline: {
    paddingVertical: SPACING.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  message: {
    ...TYPOGRAPHY.presets.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  inlineMessage: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
  },
});
