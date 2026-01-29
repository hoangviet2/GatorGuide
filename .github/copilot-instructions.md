# GatorGuide AI Assistant Instructions

## Project Overview

GatorGuide is a React Native/Expo app built with TypeScript, NativeWind (Tailwind for React Native), and Expo Router. The app helps students find college matches and manage their academic profile. It uses file-based routing and context-based state management for user data and theme persistence.

## Architecture

### Core Providers (Root Level: `app/_layout.tsx`)
Three context providers wrap the entire app:
1. **SafeAreaProvider** - Handles safe area insets for notches/home indicators
2. **AppThemeProvider** - Manages theme state (light/dark/system) with AsyncStorage persistence
3. **AppDataProvider** - Manages user profile and questionnaire answers with AsyncStorage persistence

Both custom providers handle hydration (`isHydrated`/`hydrated` states) to prevent rendering before local data loads.

### Navigation Structure
- **Expo Router** (`expo-router` v6) with file-based routing in `app/` directory
- Entry point: `app/index.tsx` (hydration/auth guard that routes to login or main tabs)
- Main flow after auth: `app/(tabs)/_layout.tsx` with bottom tab navigation (Home, Resources, Profile, Settings)
- Auth flow: `login.tsx`, `forgot-password.tsx`, `profile-setup.tsx`, `questionnaire.tsx`

### State Management
- **AppDataProvider** (`hooks/use-app-data.tsx`): User object and questionnaire answers stored in AsyncStorage with key `gatorguide:appdata:v1`
- **AppThemeProvider** (`hooks/use-app-theme.tsx`): Theme preference stored in AsyncStorage with key `app-theme`
- **Color scheme** (`hooks/use-color-scheme.ts`): Platform-native hook to detect system theme

### Styling Approach
- **NativeWind + Tailwind**: All styling uses Tailwind utility classes (`className` prop)
- **Theme colors defined in** `constants/theme.ts`: Colors export with light/dark variants
- **Theme-aware components**: Components read `isDark` from `useAppTheme()` hook and apply conditional classes like `isDark ? "text-white" : "text-gray-900"`
- **ScreenBackground**: Reusable gradient wrapper (`components/layouts/ScreenBackground.tsx`) with LinearGradient effect based on theme
- **Global CSS** (`global.css`): Imports Tailwind directives only

## Key Conventions

### Component Pages vs Routes
- **Page components** in `components/pages/` are presentational, take props, and integrate with multiple screens
- **Route components** in `app/` are thin wrappers that use hooks and navigation, rendering the corresponding page component
- Pattern: `app/login.tsx` → renders `LoginPage.tsx` component

### Hydration Pattern
Routes that depend on context data must:
1. Check `isHydrated` from the relevant provider hook
2. Show a loading state until hydrated (typically in `app/index.tsx`)
3. Redirect based on auth state once hydrated

Example in `app/index.tsx`:
```tsx
const { isHydrated, state } = useAppData();
if (!isHydrated) return <LoadingScreen />;
if (state.user) router.replace("/(tabs)");
else router.replace("/login");
```

### User Data Structure
```tsx
type User = {
  name: string;
  email: string;
  major?: string;
  gpa?: string;
  testScores?: string;
  resume?: string;
};
```

Update user fields via `updateUser(patch)` from `useAppData()` hook.

### Theme Integration
Always use theme context when applying colors/styles:
```tsx
const { isDark } = useAppTheme();
const textColor = isDark ? "text-white" : "text-gray-900";
<Text className={textColor}>Content</Text>
```

## Development Workflows

### Start Development
```bash
npm install
npx expo start
```
Then choose: `a` (Android), `i` (iOS), `w` (Web), or scan QR for Expo Go.

### Lint Code
```bash
npm run lint
```
Uses expo-lint config based on ESLint v9 flat config.

### Reset Project
```bash
npm run reset-project
```
Moves starter code to `app-example/` and creates fresh `app/` directory.

## Critical Integration Points

### AsyncStorage Persistence
- Theme: `app-theme` key with values `"light" | "dark" | "system"`
- App data: `gatorguide:appdata:v1` key with JSON-stringified `AppDataState`
- Always await storage operations; handle errors gracefully (don't crash on corrupt data)

### Router Navigation
- Use `router.push()` for stack navigation, `router.replace()` for replacing current screen
- Import from `expo-router`: `import { router } from "expo-router"`
- Guards: Auth check happens in `app/index.tsx` before tabs are accessible

### Icons
- Use `@expo/vector-icons` (Ionicons): `import { Ionicons } from "@expo/vector-icons"`
- Tab icons defined in `app/(tabs)/_layout.tsx`

### Haptic Feedback
- Configured via `components/haptic-tab.tsx` for tab interactions
- Uses `expo-haptics` for platform-native feedback

## Common Patterns to Follow

1. **Export types explicitly** for data structures (User, AppDataState, QuestionnaireAnswers)
2. **Use `useCallback` in context providers** for memoized action functions
3. **Separate concerns**: hooks for logic, components for UI, pages for screen-specific composition
4. **Always unsubscribe/cleanup**: useEffect in providers returns cleanup functions to prevent memory leaks
5. **Theme-aware class names**: Prefer computed class strings over inline ternaries for readability
6. **Questionnaire answers stored as** `Record<string, string>` for flexible form handling

## Files to Reference

- Navigation: [app/_layout.tsx](app/_layout.tsx), [app/(tabs)/_layout.tsx](app/(tabs)/_layout.tsx)
- State: [hooks/use-app-data.tsx](hooks/use-app-data.tsx), [hooks/use-app-theme.tsx](hooks/use-app-theme.tsx)
- Styling: [tailwind.config.js](tailwind.config.js), [constants/theme.ts](constants/theme.ts)
- Layout: [components/layouts/ScreenBackground.tsx](components/layouts/ScreenBackground.tsx)
- Example page: [components/pages/HomePage.tsx](components/pages/HomePage.tsx)
