import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { router } from "expo-router";

import { HapticTab } from "@/components/haptic-tab";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useAppData } from "@/hooks/use-app-data";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";

export default function TabLayout() {
  const { isDark } = useAppTheme();
  const { isHydrated, state } = useAppData();

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";

  // Protect tabs from direct deep link access
  useEffect(() => {
    if (!isHydrated) return;
    if (!state.user) {
      router.replace("/login");
    }
  }, [isHydrated, state.user]);

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <ScreenBackground>
        <View className="flex-1 items-center justify-center px-6">
          <Text className={`text-lg ${textClass}`}>Loading…</Text>
          <Text className={`${secondaryTextClass} mt-2`}>Preparing your data</Text>
        </View>
      </ScreenBackground>
    );
  }

  // Redirect if not signed in
  if (!state.user) {
    return null;
  }

  const active = "#22C55E";
  const inactive = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: active,
        tabBarInactiveTintColor: inactive,
        tabBarStyle: {
          backgroundColor: isDark ? "#000000" : "#FFFFFF",
          borderTopColor: isDark ? "#1F2937" : "#E5E7EB",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size ?? 26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="resources"
        options={{
          title: "Resources",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" size={size ?? 26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size ?? 26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size ?? 26} color={color} />
          ),
        }}
      />

      {/* Hide Plan if app/(tabs)/plan.tsx still exists */}
      <Tabs.Screen name="plan" options={{ href: null }} />
    </Tabs>
  );
}
