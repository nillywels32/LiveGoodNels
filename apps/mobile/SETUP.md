# GoodLifeNels Mobile - Quick Start Guide

## What Was Just Created

The React Native mobile application has been fully initialized with:

### Project Configuration Files
- `package.json` - All dependencies configured (React Native, Expo, React Navigation, Paper, Supabase, Zustand, React Query)
- `app.json` - Expo configuration with GoodLifeNels branding and iOS/Android settings
- `tsconfig.json` - TypeScript configuration with strict mode
- `babel.config.js` - Babel configuration for Expo
- `.env.example` - Environment variable template for Supabase credentials

### Core Application Files
- `App.tsx` - Root component with providers (QueryClient, PaperProvider, NavigationContainer)
- `navigation/TabNavigator.tsx` - Bottom tab navigation with 4 tabs

### Screen Components
- `app/HomeScreen.tsx` - Home dashboard with greeting and quick actions
- `app/PlanScreen.tsx` - Meal planning screen placeholder
- `app/ShopScreen.tsx` - Shopping list screen placeholder
- `app/TrackScreen.tsx` - Progress tracking screen placeholder

### Configuration & State Management
- `lib/theme.ts` - GoodLifeNels brand theme with all colors from design specs
- `lib/supabase.ts` - Supabase client configured with Expo SecureStore
- `stores/authStore.ts` - Zustand store for authentication state
- `stores/uiStore.ts` - Zustand store for UI state

### Documentation
- `README.md` - Comprehensive documentation
- `SETUP.md` - This quick start guide

## Next Steps to Run the App

### 1. Install Dependencies

```bash
cd apps/mobile
npm install
```

This will install all required packages:
- expo (~52.0.0)
- react-native (0.76.5)
- @react-navigation/native & @react-navigation/bottom-tabs
- react-native-paper (5.11.6)
- @supabase/supabase-js (2.39.0)
- zustand (4.4.7)
- @tanstack/react-query (5.17.9)
- react-hook-form (7.49.2)
- expo-notifications & expo-calendar
- And more...

### 2. Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your Supabase credentials
# You'll need:
# - EXPO_PUBLIC_SUPABASE_URL (from Supabase project settings)
# - EXPO_PUBLIC_SUPABASE_ANON_KEY (from Supabase project settings)
```

To get Supabase credentials:
1. Go to https://supabase.com/dashboard
2. Select your project (or create one)
3. Go to Settings > API
4. Copy the Project URL and anon/public key

### 3. Add Placeholder Assets

Create simple placeholder images in `assets/`:

**Required assets:**
- `icon.png` (1024x1024) - App icon
- `splash.png` (2048x2048) - Splash screen
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `favicon.png` (48x48) - Web favicon

**Quick solution:** Use a simple green square (#2C5F2D) as placeholder for all images during development.

### 4. Start the Development Server

```bash
npm start
```

This will start the Expo development server. You can then:

#### Option A: Use Expo Go (Easiest)
1. Install "Expo Go" app on your iOS/Android device
2. Scan the QR code shown in terminal
3. App will load on your device

#### Option B: Use Simulators/Emulators
```bash
# iOS (macOS only, requires Xcode)
npm run ios

# Android (requires Android Studio)
npm run android

# Web browser
npm run web
```

### 5. Verify the Setup

Once the app loads, you should see:

1. **Home Tab** - Greeting with current date, welcome card, quick actions
2. **Plan Tab** - Empty state with questionnaire prompt
3. **Shop Tab** - Empty state with feature list
4. **Track Tab** - Progress indicators at 0%

All screens use GoodLifeNels brand colors:
- Deep Forest Green (#2C5F2D) primary color
- Ocean Blue (#1B4965) secondary color
- Vibrant Lime (#9ACD32) accent color

## Folder Structure Created

```
apps/mobile/
├── app/                    # ✅ Screens
│   ├── HomeScreen.tsx
│   ├── PlanScreen.tsx
│   ├── ShopScreen.tsx
│   └── TrackScreen.tsx
├── components/             # ✅ (empty, ready for UI components)
├── lib/                    # ✅ Utilities
│   ├── theme.ts
│   └── supabase.ts
├── stores/                 # ✅ State management
│   ├── authStore.ts
│   └── uiStore.ts
├── hooks/                  # ✅ (empty, ready for custom hooks)
├── navigation/             # ✅ Navigation
│   └── TabNavigator.tsx
├── assets/                 # ⚠️ Needs placeholder images
├── App.tsx                 # ✅ Root component
├── app.json               # ✅ Expo config
├── package.json           # ✅ Dependencies
├── tsconfig.json          # ✅ TypeScript config
├── babel.config.js        # ✅ Babel config
├── .env.example           # ✅ Environment template
├── .gitignore             # ✅ Git ignore rules
└── README.md              # ✅ Documentation
```

## What's Configured

### ✅ Complete Setup
- React Native 0.76.5 with Expo 52
- TypeScript with strict mode
- 4-tab bottom navigation (Home, Plan, Shop, Track)
- React Native Paper UI library with custom theme
- Supabase client with SecureStore for auth tokens
- Zustand stores for auth and UI state
- React Query for server state management
- React Hook Form ready for forms
- Expo notifications & calendar modules
- iOS permissions configured (calendar, reminders, notifications)
- Android permissions configured

### ⏳ Next Development Steps
1. Create Supabase database schema (see DATABASE_SCHEMA.md)
2. Implement authentication screens (login, signup)
3. Build weekly questionnaire flow
4. Create meal plan detail screens
5. Implement shopping list functionality
6. Add inventory management
7. Connect to Supabase Edge Functions for AI meal planning
8. Add push notifications
9. Implement calendar/reminders integration

## Troubleshooting

### npm install fails
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Metro bundler issues
```bash
# Start with clean cache
npx expo start -c
```

### TypeScript errors
```bash
# Check for type errors
npx tsc --noEmit
```

### iOS build issues (macOS only)
```bash
cd ios
pod install
cd ..
npm run ios
```

## Development Resources

- **Expo Docs**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/
- **React Native Paper**: https://reactnativepaper.com/
- **Supabase**: https://supabase.com/docs
- **Zustand**: https://github.com/pmndrs/zustand
- **React Query**: https://tanstack.com/query/latest

## Project Documentation

- `TECHNICAL_SPEC.md` - Full technical specification
- `WIREFRAME_DESCRIPTIONS.md` - UI/UX design details
- `DATABASE_SCHEMA.md` - Database structure
- `DEVELOPMENT_PHASES.md` - Implementation roadmap

All documentation located in `h:/My Drive/Projects/GoodLifeNels/docs/`
