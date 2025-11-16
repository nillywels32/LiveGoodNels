# GoodLifeNels Mobile App

React Native mobile application built with Expo for the GoodLifeNels nutrition planning platform.

## Technology Stack

- **Framework**: React Native with Expo (managed workflow)
- **Language**: TypeScript
- **Navigation**: React Navigation 6.x (Bottom Tabs)
- **UI Components**: React Native Paper 5.x
- **State Management**: Zustand 4.x + React Query 4.x
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Forms**: React Hook Form 7.x
- **Notifications**: expo-notifications
- **Calendar**: expo-calendar

## Project Structure

```
apps/mobile/
├── app/                    # Screen components
│   ├── HomeScreen.tsx
│   ├── PlanScreen.tsx
│   ├── ShopScreen.tsx
│   └── TrackScreen.tsx
├── components/             # Reusable UI components
├── lib/                    # Utilities and configurations
│   ├── theme.ts           # GoodLifeNels brand theme
│   └── supabase.ts        # Supabase client setup
├── stores/                 # Zustand stores
│   ├── authStore.ts       # Authentication state
│   └── uiStore.ts         # UI state
├── hooks/                  # Custom React hooks
├── navigation/             # Navigation configuration
│   └── TabNavigator.tsx
├── assets/                 # Images, fonts, etc.
├── App.tsx                 # Root component
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript configuration
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd apps/mobile
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Start Development Server

```bash
# Start Expo dev server
npm start

# Run on iOS simulator (macOS only)
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

### 4. Build for Production

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Configure EAS Build
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## Features

### Current (MVP)

- **4 Tab Navigation**: Home, Plan, Shop, Track
- **GoodLifeNels Branding**: Custom theme with brand colors
- **Supabase Integration**: Authentication ready
- **State Management**: Zustand stores for auth and UI
- **TypeScript**: Full type safety

### Coming Soon (Phase 1-2)

- Weekly questionnaire flow
- AI-powered meal plan generation
- Shopping list with store grouping
- Inventory management
- Recipe detail views
- Calendar integration
- Push notifications

## Brand Colors

Based on WIREFRAME_DESCRIPTIONS.md:

- **Primary**: Deep Forest Green (#2C5F2D)
- **Secondary**: Ocean Blue (#1B4965)
- **Accent**: Vibrant Lime (#9ACD32)
- **Background**: Pure White (#F8F9FA)

## Icons & Assets

The app requires the following assets in the `assets/` directory:

- `icon.png` - App icon (1024x1024)
- `splash.png` - Splash screen (2048x2048)
- `adaptive-icon.png` - Android adaptive icon (1024x1024)
- `favicon.png` - Web favicon (48x48)

**Note**: Placeholder assets need to be added. Current configuration uses Deep Forest Green (#2C5F2D) as the background color.

## Development Tips

### Using Expo Go

1. Install Expo Go app on your device (iOS or Android)
2. Run `npm start`
3. Scan QR code with Expo Go

### Debugging

- Press `m` in terminal to open dev menu
- Shake device to open dev menu on physical device
- Use React Native Debugger or Chrome DevTools

### Hot Reload

- Expo supports fast refresh automatically
- Changes to code will update immediately without losing state

## Permissions Required

### iOS (Info.plist)
- Calendar access: For meal prep events
- Reminders access: For shopping lists
- Notifications: For daily check-ins

### Android (AndroidManifest.xml)
- READ_CALENDAR / WRITE_CALENDAR
- Notifications permission (Android 13+)

## Troubleshooting

### Common Issues

1. **Metro bundler cache**: `npx expo start -c`
2. **Node modules**: `rm -rf node_modules && npm install`
3. **iOS build**: `cd ios && pod install`
4. **TypeScript errors**: `npx tsc --noEmit`

### Platform-Specific

**iOS**: Requires Xcode and CocoaPods (macOS only)
**Android**: Requires Android Studio and JDK

## Contributing

When adding new features:

1. Follow the folder structure
2. Use TypeScript strictly
3. Follow React Native Paper component patterns
4. Test on both iOS and Android
5. Update this README if adding new setup steps

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://reactnativepaper.com/)
- [React Navigation](https://reactnavigation.org/)
- [Supabase Docs](https://supabase.com/docs)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [React Query Docs](https://tanstack.com/query/latest)
