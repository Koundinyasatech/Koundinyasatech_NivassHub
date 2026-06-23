import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../theme/typography';

/**
 * AppNavigator configures the authenticated stack screens.
 * Rendered inside the (app) route group layout.
 */
export default function AppNavigator() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="visitors" />
      <Stack.Screen name="complaints" />
      <Stack.Screen name="notices" />
      <Stack.Screen name="payments" />
    </Stack>
  );
}

export const APP_SCREENS = [
  { name: 'home', title: 'Dashboard' },
  { name: 'profile', title: 'My Profile' },
  { name: 'visitors', title: 'Visitors' },
  { name: 'complaints', title: 'Complaints' },
  { name: 'notices', title: 'Notices' },
  { name: 'payments', title: 'Payments' },
];
