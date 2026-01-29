import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAppTheme } from "@/hooks/use-app-theme";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";

export default function HomePage() {
  const { isDark } = useAppTheme();

  const user = {
    name: "Student",
    email: "",
    major: "",
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [hasSubmittedSearch, setHasSubmittedSearch] = useState(false);

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const inputClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const placeholderTextColor = isDark ? "#9CA3AF" : "#6B7280";

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setHasSubmittedSearch(true);

    setResults([
      "Massachusetts Institute of Technology (MIT)",
      "Stanford University",
      "Harvard University",
      "California Institute of Technology",
      "University of California, Berkeley",
    ]);
  };

  const showExtraInfoPrompt = !hasSubmittedSearch;

  return (
    <ScreenBackground>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 96 }}>
        <View className="max-w-md w-full self-center px-6 pt-10">
          <Text className={`text-2xl ${textClass} mb-1`}>Welcome back, {user.name}!</Text>
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

          {showExtraInfoPrompt ? (
            <View className={`${cardClass} border rounded-2xl p-4 mt-4`}>
              <View className="flex-row items-start">
                <View className="mt-0.5 mr-3">
                  <Ionicons name="chatbubble-ellipses" size={18} color={placeholderTextColor} />
                </View>

                <View className="flex-1">
                  <Text className={`${textClass} font-medium mb-1`}>Anything else?</Text>
                  <Text className={`${secondaryTextClass} text-sm`}>
                    Type anything you feel is relevant and hasn’t been answered elsewhere.
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          {results.length > 0 && (
            <View className="mt-8">
              <Text className={`text-lg ${textClass} mb-4`}>Recommended Colleges</Text>

              <View className="gap-3">
                {results.map((college) => (
                  <Pressable key={college} className={`${cardClass} border rounded-xl p-4`}>
                    <Text className={textClass}>{college}</Text>
                    <Text className={`text-sm ${secondaryTextClass} mt-1`}>Great match based on your profile</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {user.major ? (
            <View className="mt-8">
              <View className={`${cardClass} border rounded-2xl p-4`}>
                <Text className={`${textClass} mb-3`}>Your Profile</Text>
                <View className="flex-row justify-between">
                  <Text className={secondaryTextClass}>Major</Text>
                  <Text className="text-green-500">{user.major}</Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}
