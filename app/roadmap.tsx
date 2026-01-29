import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function RoadmapPage() {
  const { isDark } = useAppTheme();

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const borderClass = isDark ? "border-gray-800" : "border-gray-200";

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="max-w-md w-full self-center">
          <View className="px-6 pt-8 pb-6">
            <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center">
              <MaterialIcons name="arrow-back" size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
              <Text className={`${secondaryTextClass} ml-2`}>Back</Text>
            </Pressable>

            <Text className={`text-2xl ${textClass}`}>Roadmap</Text>
            <Text className={`${secondaryTextClass} mt-2`}>
              This page will become your transfer plan checklist (courses, deadlines, activities).
            </Text>
          </View>

          <View className="px-6 gap-4">
            <View className={`${cardBgClass} border rounded-2xl p-5`}>
              <Text className={`${textClass} text-base mb-1`}>Potential spot to add API info</Text>
              <Text className={`${secondaryTextClass} text-sm`}>
                What API's do we have access to when it comes to the progress of their degree?
              </Text>
            </View>

            <View className={`${cardBgClass} border rounded-2xl overflow-hidden`}>
              {[
                { title: "placeholder1", body: "placeholder4" },
                { title: "placeholder2", body: "placeholder5" },
                { title: "placeholder", body: "placeholder6" },
              ].map((item, idx, arr) => (
                <View
                  key={item.title}
                  className={`px-5 py-5 ${idx !== arr.length - 1 ? `border-b ${borderClass}` : ""}`}
                >
                  <Text className={`${textClass} mb-1`}>{item.title}</Text>
                  <Text className={`${secondaryTextClass} text-sm`}>{item.body}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}
