// app/splash.js
import React, { useEffect, useRef, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restoreAuth } from '../redux/slices/authSlice';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  const [navigationReady, setNavigationReady] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const translateYAnim = useRef(new Animated.Value(80)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const loaderScaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    const startAnimations = () => {
      // Main content fade and scale
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 30,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(textFadeAnim, {
          toValue: 1,
          duration: 1000,
          delay: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Logo pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Loader scale animation
      Animated.spring(loaderScaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 30,
        delay: 500,
        useNativeDriver: true,
      }).start();

      // Continuous rotation for loader
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Rotating border animation
      Animated.loop(
        Animated.timing(borderAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Animated dots
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim1, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim1, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim2, {
            toValue: 1,
            duration: 400,
            delay: 200,
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim2, {
            toValue: 0,
            duration: 400,
            delay: 200,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim3, {
            toValue: 1,
            duration: 400,
            delay: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim3, {
            toValue: 0,
            duration: 400,
            delay: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    // Check stored auth state
    const checkAuth = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');
        if (user && token) {
          dispatch(restoreAuth({ 
            user: JSON.parse(user), 
            token: token 
          }));
        }
      } catch (error) {
        console.log('Error checking auth:', error);
      } finally {
        setIsLoading(false);
        // Start animations after auth check
        startAnimations();
        
        // Navigate after splash screen duration
        setTimeout(() => {
          setNavigationReady(true);
        }, 3000);
      }
    };

    checkAuth();

    return () => {
      // Cleanup
    };
  }, []);

  // Handle navigation
  useEffect(() => {
    if (navigationReady && !isLoading) {
      if (isAuthenticated) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }
  }, [navigationReady, isLoading, isAuthenticated]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const borderSpin = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const dot1Opacity = dotAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const dot2Opacity = dotAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const dot3Opacity = dotAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      {/* Animated Background Circles */}
      <Animated.View style={[styles.circle1, { transform: [{ scale: pulseAnim }] }]} />
      <Animated.View style={[styles.circle2, { transform: [{ scale: pulseAnim }] }]} />
      
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim },
            ],
          },
        ]}
      >
        {/* Rotating Border */}
        <Animated.View 
          style={[
            styles.logoBorder,
            { transform: [{ rotate: borderSpin }] }
          ]}
        />
        
        {/* Company Logo */}
        <View style={styles.logoContainer}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Image
              source={require('../../assets/images/image.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* App Name */}
        <Animated.View style={{ opacity: textFadeAnim }}>
          <Text style={styles.appName}>Nivaas Hub</Text>
        </Animated.View>
        
        {/* Tagline */}
        <Animated.View style={{ opacity: textFadeAnim }}>
          <Text style={styles.tagline}>Nivas Hub Tower</Text>
        </Animated.View>

        {/* Custom Animated Loader */}
        <Animated.View 
          style={[
            styles.loaderContainer,
            { 
              opacity: loaderScaleAnim,
              transform: [{ scale: loaderScaleAnim }]
            }
          ]}
        >
          <View style={styles.loaderWrapper}>
            <Animated.View 
              style={[
                styles.loader,
                { transform: [{ rotate: spin }] }
              ]} 
            />
            <View style={styles.loaderInner}>
              <Text style={styles.loaderText}>NH</Text>
            </View>
          </View>
          
          {/* Animated Loading Text with Dots */}
          <View style={styles.loadingTextContainer}>
            <Text style={styles.loadingText}>Loading</Text>
            <Animated.Text style={[styles.dot, { opacity: dot1Opacity }]}>.</Animated.Text>
            <Animated.Text style={[styles.dot, { opacity: dot2Opacity }]}>.</Animated.Text>
            <Animated.Text style={[styles.dot, { opacity: dot3Opacity }]}>.</Animated.Text>
          </View>
        </Animated.View>
      </Animated.View>

      {/* Version Text at Bottom */}
      <Animated.View style={{ opacity: textFadeAnim }}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary || '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: -100,
    right: -100,
  },
  circle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.03)',
    bottom: -50,
    left: -50,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoBorder: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 15,
    zIndex: 1,
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  loaderContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  loaderWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loader: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
    borderTopColor: '#FFFFFF',
    borderRightColor: '#FFFFFF',
  },
  loaderInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingTextContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
  },
  dot: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 0,
    fontWeight: 'bold',
  },
  versionText: {
    position: 'absolute',
    bottom: 40,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    letterSpacing: 0.5,
  },
});