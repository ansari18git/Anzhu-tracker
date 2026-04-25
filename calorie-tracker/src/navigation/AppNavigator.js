import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LogFoodScreen from '../screens/LogFoodScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const tabIcon = (label) => () => (
  <Text style={{ fontSize: 20 }}>
    {label === 'Home' ? '🏠' : label === 'Progress' ? '📊' : '⚙️'}
  </Text>
);

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.background,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: tabIcon('Home') }} />
      <Tab.Screen name="Progress" component={ProgressScreen} options={{ tabBarIcon: tabIcon('Progress') }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: tabIcon('Settings') }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen
        name="LogFood"
        component={LogFoodScreen}
        options={{ presentation: 'card', headerShown: false }}
      />
    </RootStack.Navigator>
  );
}
