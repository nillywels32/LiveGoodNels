import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

// Screens
import { HomeScreen } from '../app/HomeScreen';
import { PlanScreen } from '../app/PlanScreen';
import { ShopScreen } from '../app/ShopScreen';
import { TrackScreen } from '../app/TrackScreen';

export type TabParamList = {
  Home: undefined;
  Plan: undefined;
  Shop: undefined;
  Track: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Plan':
              iconName = focused ? 'calendar-check' : 'calendar-check-outline';
              break;
            case 'Shop':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Track':
              iconName = focused ? 'chart-line' : 'chart-line-variant';
              break;
            default:
              iconName = 'circle';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.surfaceVariant,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.onPrimary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Plan"
        component={PlanScreen}
        options={{ title: 'Meal Plan' }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{ title: 'Shopping' }}
      />
      <Tab.Screen
        name="Track"
        component={TrackScreen}
        options={{ title: 'Track' }}
      />
    </Tab.Navigator>
  );
}
