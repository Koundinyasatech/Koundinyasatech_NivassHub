import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING } from '../../theme/spacing';

export default function AppHeader({
  title,
  subtitle,
  onBack,
  rightAction,
  rightLabel,
  transparent = false,
  light = false,
}) {
  const insets = useSafeAreaInsets();

  const bgColor = transparent ? 'transparent' : COLORS.primary;
  const textColor = light ? COLORS.textPrimary : COLORS.textInverse;

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top, backgroundColor: bgColor }]}>
      <StatusBar
        barStyle={light ? 'dark-content' : 'light-content'}
        backgroundColor={bgColor}
      />
      <View style={styles.row}>
        <View style={styles.left}>
          {onBack && (
            <TouchableOpacity
              onPress={onBack}
              style={styles.backBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={[styles.backIcon, { color: textColor }]}>‹</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.center}>
          <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: textColor + 'CC' }]} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View style={styles.right}>
          {rightAction && (
            <TouchableOpacity onPress={rightAction} style={styles.rightBtn}>
              <Text style={[styles.rightLabel, { color: textColor }]}>
                {rightLabel || '•••'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    minHeight: 56,
  },
  left: {
    width: 40,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  backBtn: {
    padding: 4,
  },
  backIcon: {
    fontSize: 32,
    lineHeight: 34,
    color: COLORS.textInverse,
    marginTop: -4,
  },
  title: {
    ...TYPOGRAPHY.presets.h6,
    color: COLORS.textInverse,
  },
  subtitle: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textInverse,
    marginTop: 1,
  },
  rightBtn: {
    padding: 4,
  },
  rightLabel: {
    ...TYPOGRAPHY.presets.label,
    color: COLORS.textInverse,
  },
});
