import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signUp } from '../../services/authService';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { SPACING } from '../../utils/constants';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!email.includes('@')) return 'Enter a valid email address';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleSignup = async () => {
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setError('');
    setLoading(true);
    try {
      await signUp(email.trim(), password);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Account Created!</Text>
          <Text style={styles.successText}>
            Check your email to confirm your account, then log in.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
            buttonColor={colors.primary}
            labelStyle={typography.button}
          >
            Go to Login
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start tracking your health today.</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            mode="outlined"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="new-password"
            mode="outlined"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleSignup}
            loading={loading}
            disabled={loading}
            style={styles.button}
            buttonColor={colors.primary}
            labelStyle={typography.button}
          >
            Sign Up
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.linkBold}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
  },
  form: {
    gap: SPACING.sm,
  },
  input: {
    backgroundColor: colors.background,
  },
  error: {
    ...typography.body2,
    color: colors.error,
    textAlign: 'center',
  },
  button: {
    marginTop: SPACING.sm,
    borderRadius: 8,
    paddingVertical: SPACING.xs,
  },
  link: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  linkText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  linkBold: {
    color: colors.primary,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  successIcon: {
    fontSize: 64,
  },
  successTitle: {
    ...typography.h2,
    color: colors.primary,
  },
  successText: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
