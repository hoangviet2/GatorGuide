import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native";
import { router } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";

export default function LanguageScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    "English",
    "Spanish",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Korean",
    "Portuguese",
    "Russian",
    "Arabic",
    "Hindi",
    "Vietnamese",
    "Tagalog",
  ];

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const rowBorder = isDark ? "border-gray-800" : "border-gray-200";

  return (
    <LinearGradient colors={isDark ? ["#000", "#111827", "#000"] : ["#fff", "#ECFDF5", "#fff"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="max-w-md w-full self-center px-6 pt-10">
          <Pressable onPress={() => router.back()} className="flex-row items-center gap-2 mb-4">
            <ArrowLeft size={18} color={isDark ? "#9CA3AF" : "#6B7280"} />
            <Text className={secondaryTextClass}>Back</Text>
          </Pressable>

          <Text className={`text-2xl ${textClass} mb-6`}>Language</Text>

          <View className={`${cardClass} border rounded-2xl overflow-hidden`}>
            {languages.map((lang, idx) => {
              const selected = lang === selectedLanguage;
              return (
                <Pressable
                  key={lang}
                  onPress={() => setSelectedLanguage(lang)}
                  className={`px-4 py-4 flex-row items-center justify-between ${idx !== languages.length - 1 ? `border-b ${rowBorder}` : ""}`}
                >
                  <Text className={textClass}>{lang}</Text>
                  {selected ? <Check size={18} color="#22C55E" /> : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
