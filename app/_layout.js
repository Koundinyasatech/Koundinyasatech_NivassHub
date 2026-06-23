// app/_layout.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants/colors';
import * as SecureStore from 'expo-secure-store';
import { restoreAuth } from '../store/slices/authSlice';

function SplashOverlay({ onDone }) {
  const dispatch = useDispatch();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, { toValue: 1, duration: 1600, easing: Easing.linear, useNativeDriver: true })
    ).start();

    const dotLoop = (anim, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1,   duration: 350, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.3, duration: 350, useNativeDriver: true }),
        ])
      ).start();

    dotLoop(dot1, 0);
    dotLoop(dot2, 160);
    dotLoop(dot3, 320);

    const timer = setTimeout(async () => {
      try {
        const user  = await SecureStore.getItemAsync('user');
        const token = await SecureStore.getItemAsync('token');
        if (user && token) {
          dispatch(restoreAuth({ user: JSON.parse(user), token }));
        }
      } catch {}

      // Fade out then unmount
      Animated.timing(fadeOut, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
        onDone();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View style={[styles.splash, { opacity: fadeOut }]}>
      {/* Decorative circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      {/* Logo */}
      <Animated.View style={{ transform: [{ scale: pulseAnim }], marginBottom: 24 }}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../assets/images/image.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </Animated.View>

      {/* Branding */}
      <Text style={styles.appName}>Nivaas Hub</Text>
      <Text style={styles.tagline}>Smart Gated Community Management</Text>

      {/* Spinner + dots */}
      <View style={styles.loaderArea}>
        <View style={styles.spinnerWrapper}>
          <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
          <View style={styles.spinnerInner}>
            <Text style={styles.spinnerLabel}>NH</Text>
          </View>
        </View>
        <View style={styles.dotsRow}>
          <Text style={styles.loadingLabel}>Loading</Text>
          <Animated.Text style={[styles.dot, { opacity: dot1 }]}>.</Animated.Text>
          <Animated.Text style={[styles.dot, { opacity: dot2 }]}>.</Animated.Text>
          <Animated.Text style={[styles.dot, { opacity: dot3 }]}>.</Animated.Text>
        </View>
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>
    </Animated.View>
  );
}

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={COLORS.primary} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(user)/home" />
          <Stack.Screen name="(user)/profile" />
          <Stack.Screen name="(user)/visitors" />
          <Stack.Screen name="(user)/complaints" />
          <Stack.Screen name="(user)/notices" />
          <Stack.Screen name="(user)/payments" />
        </Stack>

        {/* Splash sits on top of the whole stack as an absolute overlay */}
        {showSplash && <SplashOverlay onDone={() => setShowSplash(false)} />}
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    elevation: 999,
  },
  circle1: {
    position: 'absolute',
    width: 340, height: 340, borderRadius: 170,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -120, right: -100,
  },
  circle2: {
    position: 'absolute',
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -60, left: -60,
  },
  logoCircle: {
    width: 150, height: 150, borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  logo: { width: 100, height: 100 },
  appName: {
    fontSize: 36, fontWeight: 'bold', color: '#FFFFFF',
    letterSpacing: 2, marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 14, color: 'rgba(255,255,255,0.75)', letterSpacing: 0.5,
  },
  loaderArea: {
    marginTop: 48, alignItems: 'center',
  },
  spinnerWrapper: {
    width: 64, height: 64, justifyContent: 'center', alignItems: 'center',
  },
  spinner: {
    position: 'absolute',
    width: 64, height: 64, borderRadius: 32,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.15)',
    borderTopColor: '#FFFFFF',
    borderRightColor: '#FFFFFF',
  },
  spinnerInner: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  spinnerLabel: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  dotsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  loadingLabel: { fontSize: 13, color: 'rgba(255,255,255,0.65)', letterSpacing: 1 },
  dot: { fontSize: 20, color: 'rgba(255,255,255,0.65)', fontWeight: 'bold' },
  version: {
    position: 'absolute', bottom: 36,
    fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.5,
  },
});
