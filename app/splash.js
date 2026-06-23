// app/splash.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { restoreAuth } from '../store/slices/authSlice';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Animation values — all start visible so background shows immediately
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dot1Anim = useRef(new Animated.Value(0.3)).current;
  const dot2Anim = useRef(new Animated.Value(0.3)).current;
  const dot3Anim = useRef(new Animated.Value(0.3)).current;
  const logoFadeAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in logo
    Animated.timing(logoFadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Fade in text 200ms after logo
    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 200,
      useNativeDriver: true,
    }).start();

    // Pulse the logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Spinner rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Bouncing dots
    const dotLoop = (anim, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 350,
            useNativeDriver: true,
          }),
        ])
      ).start();

    dotLoop(dot1Anim, 0);
    dotLoop(dot2Anim, 160);
    dotLoop(dot3Anim, 320);

    // Check stored auth state then navigate after 3 s
    const timer = setTimeout(async () => {
      try {
        const user = await SecureStore.getItemAsync('user');
        const token = await SecureStore.getItemAsync('token');
        if (user && token) {
          dispatch(restoreAuth({ user: JSON.parse(user), token }));
          router.replace('/home');
        } else {
          router.replace('/login');
        }
      } catch {
        router.replace('/login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Decorative circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      {/* Logo */}
      <Animated.View
        style={[styles.logoWrapper, { opacity: logoFadeAnim, transform: [{ scale: pulseAnim }] }]}
      >
        <View style={styles.logoCircle}>
          <Image
            source={require('../assets/images/image.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </Animated.View>

      {/* App name + tagline */}
      <Animated.View style={{ opacity: textFadeAnim, alignItems: 'center' }}>
        <Text style={styles.appName}>Nivaas Hub</Text>
        <Text style={styles.tagline}>Smart Gated Community Management</Text>
      </Animated.View>

      {/* Spinner + loading dots */}
      <View style={styles.loaderArea}>
        <View style={styles.spinnerWrapper}>
          <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
          <View style={styles.spinnerInner}>
            <Text style={styles.spinnerLabel}>NH</Text>
          </View>
        </View>

        <View style={styles.dotsRow}>
          <Text style={styles.loadingLabel}>Loading</Text>
          <Animated.Text style={[styles.dot, { opacity: dot1Anim }]}>.</Animated.Text>
          <Animated.Text style={[styles.dot, { opacity: dot2Anim }]}>.</Animated.Text>
          <Animated.Text style={[styles.dot, { opacity: dot3Anim }]}>.</Animated.Text>
        </View>
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -120,
    right: -100,
  },
  circle2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -60,
    left: -60,
  },
  logoWrapper: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.5,
  },
  loaderArea: {
    marginTop: 48,
    alignItems: 'center',
  },
  spinnerWrapper: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.15)',
    borderTopColor: '#FFFFFF',
    borderRightColor: '#FFFFFF',
  },
  spinnerInner: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  loadingLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 1,
  },
  dot: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: 'bold',
  },
  version: {
    position: 'absolute',
    bottom: 36,
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.5,
  },
});
