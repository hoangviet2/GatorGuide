import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, GraduationCap } from "lucide-react-native";

export default function AboutScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";

  return (
    <LinearGradient colors={isDark ? ["#000", "#111827", "#000"] : ["#fff", "#ECFDF5", "#fff"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="max-w-md w-full self-center px-6 pt-10">
          <Pressable onPress={() => router.back()} className="flex-row items-center gap-2 mb-4">
            <ArrowLeft size={18} color={isDark ? "#9CA3AF" : "#6B7280"} />
            <Text className={secondaryTextClass}>Back</Text>
          </Pressable>

          <Text className={`text-2xl ${textClass} mb-6`}>About Gator Guide</Text>

          <View className={`${cardClass} border rounded-2xl p-6`}>
            <View className="items-center mb-4">
              <View className="p-4 rounded-2xl" style={{ backgroundColor: "#22C55E" }}>
                <GraduationCap size={36} color="#000" />
              </View>
            </View>

            <Text className={`text-xl ${textClass} text-center mb-2`}>Gator Guide</Text>
            <Text className={`${secondaryTextClass} text-center text-sm`}>
              Helping Green River College students plan a strong transfer path.
            </Text>

            <View className="mt-6">
              <Text className={`${secondaryTextClass} text-xs leading-5`}>
                Recommendations are informational and do not guarantee admission. Always verify requirements with each university.
              </Text>
            </View>
          </View>

          <Text className={`text-center text-sm mt-8 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
