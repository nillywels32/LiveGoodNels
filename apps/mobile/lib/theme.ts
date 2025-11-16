import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

// GoodLifeNels Brand Colors (from WIREFRAME_DESCRIPTIONS.md)
export const colors = {
  // Primary Colors
  deepForestGreen: '#2C5F2D',
  oceanBlue: '#1B4965',
  earthBrown: '#8B4513',
  pureWhite: '#F8F9FA',

  // Accent Colors
  vibrantLime: '#9ACD32',
  sunsetOrange: '#FF8C42',
  berryPurple: '#6A4C93',

  // Neutrals
  softBeige: '#F5F5DC',
  lightGray: '#E5E5E5',
  darkGray: '#4A4A4A',
  offBlack: '#2D2D2D',
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.deepForestGreen,
    secondary: colors.oceanBlue,
    tertiary: colors.vibrantLime,
    background: colors.pureWhite,
    surface: colors.pureWhite,
    surfaceVariant: colors.softBeige,
    error: colors.sunsetOrange,
    onPrimary: colors.pureWhite,
    onSecondary: colors.pureWhite,
    onBackground: colors.offBlack,
    onSurface: colors.darkGray,
  },
  roundness: 16,
};

export type AppTheme = typeof theme;
