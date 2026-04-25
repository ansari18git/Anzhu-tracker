import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signIn } from '../../services/authService';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { SPACING } from '../../utils/constants';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!email.includes('@')) return 'Enter a valid email address';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleLogin = async () => {
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setError('');
    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Anzhu Tracker</Text>
          <Text style={styles.subtitle}>Track your health, simply.</Text>
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
            autoComplete="password"
            mode="outlined"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
            buttonColor={colors.primary}
            labelStyle={typography.button}
          >
            Login
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.link}>
            <Text style={styles.linkText}>
              Don't have an account? <Text style={styles.linkBold}>Sign up</Text>
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
});
