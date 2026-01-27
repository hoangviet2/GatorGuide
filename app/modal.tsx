import React from "react";
import { Pressable, View, Text } from "react-native";
import { Link } from "expo-router";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function ModalScreen() {
  const { isDark } = useAppTheme();

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <ScreenBackground>
      <View className="flex-1 items-center justify-center px-6">
        <View className="max-w-md w-full items-center">
          <Text className={`text-2xl ${textClass} mb-2`}>This is a modal</Text>
          <Text className={`${secondaryTextClass} text-center mb-6`}>
            You can close this and return home.
          </Text>

          <Link href="/(tabs)" dismissTo asChild>
            <Pressable className="w-full bg-green-500 rounded-2xl py-4 items-center">
              <Text className="text-black font-semibold">Go to home screen</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScreenBackground>
  );
}
