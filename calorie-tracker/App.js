import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import SplashAnimation from './src/components/SplashAnimation';
import { colors } from './src/theme/colors';

const paperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary:          colors.primary,
    secondary:        colors.secondary,
    background:       colors.background,
    surface:          colors.surface,
    onSurface:        colors.textPrimary,
    onBackground:     colors.textPrimary,
    outline:          colors.border,
    surfaceVariant:   colors.surfaceHigh,
    onSurfaceVariant: colors.textSecondary,
    error:            colors.error,
  },
};

const navTheme = {
  dark: true,
  colors: {
    primary:    colors.primary,
    background: colors.background,
    card:       colors.surface,
    text:       colors.textPrimary,
    border:     colors.border,
    notification: colors.error,
  },
};

function RootNavigator() {
  const { user, loading } = useAuth();
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashAnimation onFinish={() => setSplashDone(true)} />;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <AuthProvider>
          <NavigationContainer theme={navTheme}>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
