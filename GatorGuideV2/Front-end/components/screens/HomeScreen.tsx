import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const inputClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const placeholderTextColor = isDark ? "#9CA3AF" : "#6B7280";

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setResults([
      "Massachusetts Institute of Technology (MIT)",
      "Stanford University",
      "Harvard University",
      "California Institute of Technology",
      "University of California, Berkeley",
    ]);
  };

  return (
    <LinearGradient
      colors={isDark ? ["#000000", "#111827", "#000000"] : ["#FFFFFF", "#ECFDF5", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="max-w-md w-full self-center px-6 pt-10">
          <Text className={`text-2xl ${textClass} mb-1`}>Welcome back!</Text>
          <Text className={`${secondaryTextClass} mb-6`}>Find your perfect college match</Text>

          <View className="relative mb-4">
            <View className="absolute left-4 top-1/2 -translate-y-1/2">
              <Ionicons name="search" size={18} color={placeholderTextColor} />
            </View>

            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              placeholder="What are you looking for in a college?"
              placeholderTextColor={placeholderTextColor}
              className={`w-full ${inputClass} ${textClass} border rounded-2xl pl-12 pr-4 py-4`}
              returnKeyType="search"
            />
          </View>

          <Pressable
            onPress={() => router.push("/questionnaire")}
            className="w-full rounded-2xl p-4 flex-row items-center"
            style={{ backgroundColor: "#22C55E" }}
          >
            <View className="mr-3 p-2 rounded-xl" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
              <Ionicons name="document-text" size={18} color="#000" />
            </View>

            <View className="flex-1">
              <Text className="font-semibold text-black">Complete Detailed Questionnaire</Text>
              <Text className="text-black/70 text-sm">Get personalized college recommendations</Text>
            </View>

            <Ionicons name="sparkles" size={18} color="#000" />
          </Pressable>

          {results.length > 0 && (
            <View className="mt-8">
              <Text className={`text-lg ${textClass} mb-4`}>Recommended Colleges</Text>

              <View className="gap-3">
                {results.map((college) => (
                  <Pressable key={college} className={`${cardClass} border rounded-xl p-4`}>
                    <Text className={textClass}>{college}</Text>
                    <Text className={`text-sm ${secondaryTextClass} mt-1`}>
                      Great match based on your profile
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
