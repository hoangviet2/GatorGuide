# GatorGuide AI Assistant Instructions

## Project Overview

GatorGuide is a React Native/Expo app built with TypeScript, NativeWind (Tailwind for React Native), and Expo Router. The app helps students find college matches and manage their academic profile. It uses file-based routing and context-based state management for user data and theme persistence.

**Tech Stack:** Expo 54, React 19, React Native 0.81, TypeScript 5.9, NativeWind 4.2, Expo Router 6, AsyncStorage

## Architecture

### Core Providers (Root Level: `app/_layout.tsx`)
Three context providers wrap the entire app:
1. **SafeAreaProvider** - Handles safe area insets for notches/home indicators
2. **AppThemeProvider** (`hooks/use-app-theme.tsx`) - Manages theme state (light/dark/system) with AsyncStorage persistence; exposes `theme`, `isDark`, `setTheme`
3. **AppDataProvider** (`hooks/use-app-data.tsx`) - Manages user profile and questionnaire answers with AsyncStorage persistence; exposes `state`, `signIn`, `updateUser`, `setQuestionnaireAnswers`

Both custom providers handle hydration (`isHydrated`/`hydrated` states) to prevent rendering before local data loads. Components must check these flags before rendering dependent content.

### Navigation Structure
- **Expo Router** (`expo-router` v6) with file-based routing in `app/` directory
- Entry point: `app/index.tsx` (hydration/auth guard that routes to login or main tabs)
- Main flow after auth: `app/(tabs)/_layout.tsx` with bottom tab navigation (Home, Resources, Profile, Settings)
- Auth flow: `login.tsx`, `forgot-password.tsx`, `profile-setup.tsx`, `questionnaire.tsx`

### State Management
- **AppDataProvider** stores user and questionnaire state in AsyncStorage with key `gatorguide:appdata:v1` (exact JSON structure of AppDataState)
- **AppThemeProvider** stores theme preference in AsyncStorage with key `app-theme` with values `"light" | "dark" | "system"`
- **Color scheme** (`hooks/use-color-scheme.ts`): Platform-native hook that detects system dark/light mode preference
- **Hydration timing:** AppDataProvider resolves in ~5-50ms; always check `isHydrated` before accessing `state` in routes

### Styling Approach
- **NativeWind + Tailwind**: All styling uses Tailwind utility classes (`className` prop)
- **Theme colors defined in** `constants/theme.ts`: Colors export with light/dark variants
- **Theme-aware components**: Components read `isDark` from `useAppTheme()` hook and apply conditional classes like `isDark ? "text-white" : "text-gray-900"`
- **ScreenBackground**: Reusable gradient wrapper (`components/layouts/ScreenBackground.tsx`) with LinearGradient effect based on theme
- **Global CSS** (`global.css`): Imports Tailwind directives only

## Key Conventions

### Component Pages vs Routes
- **Page components** in `components/pages/` are presentational, take no props (access context directly), and encapsulate full screen UI
- **Route components** in `app/` are thin wrappers that call page components; routes handle navigation guards and redirects
- **Pattern**: `app/profile.tsx` imports and renders `ProfilePage.tsx` directly
- **Naming:** Routes use kebab-case (`profile-setup.tsx`); pages use PascalCase (`ProfileSetupPage.tsx`)

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
Uses expo-lint config based on ESLint v9 flat config (`eslint.config.js`).

### Reset Project
```bash
npm run reset-project
```
Moves starter code to `app-example/` and creates fresh `app/` directory.

### Build Configuration
- **Metro bundler:** Configured in `metro.config.js` with NativeWind integration via `withNativeWind()`
- **Global CSS:** All Tailwind styles loaded through `global.css` (imported in `app/_layout.tsx`)

## Critical Integration Points

### AsyncStorage Persistence
- Theme: `app-theme` key with values `"light" | "dark" | "system"`
- App data: `gatorguide:appdata:v1` key with JSON-stringified `AppDataState`
- Always await storage operations; handle errors gracefully (don't crash on corrupt data)

### Router Navigation
- Use `router.push()` for stack navigation, `router.replace()` for replacing current screen, `router.back()` to go back
- Import from `expo-router`: `import { router } from "expo-router"`
- Guards: Auth check happens in `app/index.tsx` before tabs are accessible
- Navigation pattern: Routes redirect based on auth state after hydration (see `app/index.tsx` and `app/(tabs)/_layout.tsx`)

### Icons
- Primary: `@expo/vector-icons` (Ionicons, MaterialIcons): `import { Ionicons, MaterialIcons } from "@expo/vector-icons"`
- Alternative: `lucide-react-native` for additional icon options
- Tab icons defined in `app/(tabs)/_layout.tsx`

### Haptic Feedback
- Configured via `components/haptic-tab.tsx` for tab interactions
- Uses `expo-haptics` for platform-native feedback (iOS only via `process.env.EXPO_OS === 'ios'` check)
- Pattern: `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` in onPressIn handler

## Common Patterns to Follow

1. **Export types explicitly** for data structures (User, AppDataState, QuestionnaireAnswers)
2. **Use `useCallback` in context providers** for memoized action functions
3. **Separate concerns**: hooks for logic, components for UI, pages for screen-specific composition
4. **Always unsubscribe/cleanup**: useEffect in providers returns cleanup functions to prevent memory leaks
5. **Theme-aware class names**: Prefer computed class strings over inline ternaries for readability
6. **Questionnaire answers stored as** `Record<string, string>` for flexible form handling
7. **Input validation patterns**: Use regex tests and type guards (e.g., GPA validation with `/^\d*\.?\d*$/` and `num <= 4.0`)
8. **Conditional rendering for auth**: Pages that require user data should return fallback UI if `!user`, not null (prevents crashes)
9. **Use `useMemo`** for derived state calculations (e.g., checking if questionnaire data exists: `useMemo(() => Object.keys(state.questionnaireAnswers ?? {}).length > 0, [state.questionnaireAnswers])`)
10. **Always provide sensible defaults** in TextInput and form fields to prevent uncontrolled/controlled component warnings
11. **Multi-step forms pattern**: Use local state for step tracking (see `ProfileSetupPage.tsx`); progress indicators use conditional `bg-green-500` vs `bg-gray-200`/`bg-gray-800` classes
12. **File picking stubs**: Document pickers (resume/transcript) currently use placeholder implementations pending full `expo-document-picker` integration

## Files to Reference

- Navigation: [app/_layout.tsx](app/_layout.tsx), [app/(tabs)/_layout.tsx](app/(tabs)/_layout.tsx), [app/index.tsx](app/index.tsx)
- State: [hooks/use-app-data.tsx](hooks/use-app-data.tsx), [hooks/use-app-theme.tsx](hooks/use-app-theme.tsx)
- Styling: [tailwind.config.js](tailwind.config.js), [constants/theme.ts](constants/theme.ts), [global.css](global.css)
- Layout: [components/layouts/ScreenBackground.tsx](components/layouts/ScreenBackground.tsx)
- Example pages: [components/pages/ProfilePage.tsx](components/pages/ProfilePage.tsx) (editing pattern), [components/pages/ProfileSetupPage.tsx](components/pages/ProfileSetupPage.tsx) (multi-step form)
- Route wrapping: [app/profile-setup.tsx](app/profile-setup.tsx) (demonstrates thin route wrapper pattern)
