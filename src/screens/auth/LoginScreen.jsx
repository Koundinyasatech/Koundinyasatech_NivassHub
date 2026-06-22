import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { loginUser, clearAuthError } from '../../redux/slices/authSlice';
import CustomInput from '../../components/inputs/CustomInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { STRINGS } from '../../constants/strings';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    let valid = true;
    if (!email.trim()) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleLogin = async () => {
    dispatch(clearAuthError());
    if (!validate()) return;

    const result = await dispatch(loginUser({ email: email.trim(), password }));
    if (loginUser.fulfilled.match(result)) {
      router.replace('/home');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brand}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>NH</Text>
            </View>
            <Text style={styles.appName}>{STRINGS.app.name}</Text>
            <Text style={styles.tagline}>{STRINGS.app.tagline}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{STRINGS.auth.login}</Text>
            <Text style={styles.cardSubtitle}>{STRINGS.auth.loginSubtitle}</Text>

            {error ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>⚠ {error}</Text>
              </View>
            ) : null}

            <CustomInput
              label={STRINGS.auth.email}
              value={email}
              onChangeText={setEmail}
              placeholder={STRINGS.auth.emailPlaceholder}
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
            />

            <CustomInput
              label={STRINGS.auth.password}
              value={password}
              onChangeText={setPassword}
              placeholder={STRINGS.auth.passwordPlaceholder}
              secureTextEntry
              error={passwordError}
            />

            <TouchableOpacity style={styles.forgotWrap}>
              <Text style={styles.forgotText}>{STRINGS.auth.forgotPassword}</Text>
            </TouchableOpacity>

            <PrimaryButton
              label={STRINGS.auth.loginButton}
              onPress={handleLogin}
              loading={loading}
              style={styles.loginBtn}
            />
          </View>

          <Text style={styles.hint}>
            Demo: use any email from users.json with any 4+ char password
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.primary },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.base,
  },
  brand: {
    alignItems: 'center',
    marginBottom: SPACING['2xl'],
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  logoText: {
    ...TYPOGRAPHY.presets.h3,
    color: COLORS.textInverse,
    fontWeight: '800',
  },
  appName: {
    ...TYPOGRAPHY.presets.h3,
    color: COLORS.textInverse,
    marginBottom: SPACING.xs,
  },
  tagline: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textInverse + 'BB',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
  },
  cardTitle: {
    ...TYPOGRAPHY.presets.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  cardSubtitle: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  errorBanner: {
    backgroundColor: COLORS.errorLight,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.base,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.error,
  },
  errorBannerText: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.error,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.lg,
    marginTop: -SPACING.sm,
  },
  forgotText: {
    ...TYPOGRAPHY.presets.bodySmall,
    color: COLORS.primary,
    fontWeight: '500',
  },
  loginBtn: { width: '100%' },
  hint: {
    ...TYPOGRAPHY.presets.caption,
    color: COLORS.textInverse + '88',
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
});
