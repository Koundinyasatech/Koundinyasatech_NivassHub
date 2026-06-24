import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import { spacing, typography } from '../../theme';

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to NivassHub</Text>
    <Text style={styles.subtitle}>Your clean React Native project is ready.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: Colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});

export default HomeScreen;
