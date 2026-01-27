import { useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function LanguagePage() {
  const isDarkMode = false;

  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = useMemo(
    () => [
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
    ],
    []
  );

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const itemBorderClass = isDarkMode ? "border-gray-800" : "border-gray-200";

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setTimeout(() => {
      router.replace("/(tabs)/settings");
    }, 300);
  };

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`} contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="max-w-md w-full self-center">
        <View className="px-6 pt-8 pb-6">
          <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center">
            <MaterialIcons name="arrow-back" size={20} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />
            <Text className={`${secondaryTextClass} ml-2`}>Back</Text>
          </Pressable>

          <Text className={`text-2xl ${textClass}`}>Language</Text>
        </View>

        <View className="px-6">
          <View className={`${cardBgClass} border rounded-2xl overflow-hidden`}>
            {languages.map((language, index) => {
              const isSelected = selectedLanguage === language;

              return (
                <Pressable
                  key={language}
                  onPress={() => handleSelectLanguage(language)}
                  className={`flex-row items-center justify-between px-4 py-5 ${
                    index !== languages.length - 1 ? `border-b ${itemBorderClass}` : ""
                  }`}
                >
                  <Text className={textClass}>{language}</Text>
                  {isSelected ? <MaterialIcons name="check" size={20} color="#22C55E" /> : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
