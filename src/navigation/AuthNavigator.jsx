import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '../constants/colors';

/**
 * AuthNavigator configures the unauthenticated stack screens.
 * Rendered inside the (auth) route group layout.
 */
export default function AuthNavigator() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.primary },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="login" />
    </Stack>
  );
}

export const AUTH_SCREENS = [
  { name: 'login', title: 'Login' },
];
