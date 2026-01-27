// global.css is required
import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { AppThemeProvider } from "@/hooks/use-app-theme";

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AppThemeProvider>
  );
}
