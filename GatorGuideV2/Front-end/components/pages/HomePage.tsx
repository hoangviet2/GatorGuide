import { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function HomePage() {
  const isDarkMode = false;

  const user = useMemo(
    () => ({
      name: "Student",
      email: "",
      major: "",
    }),
    []
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const inputBgClass = isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const placeholderColor = isDarkMode ? "#9CA3AF" : "#6B7280";

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
    <ScrollView
      className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}
      contentContainerStyle={{ paddingBottom: 96 }}
    >
      <View className="max-w-md w-full self-center">
        <View className="px-6 pt-8 pb-6">
          <Text className={`text-2xl ${textClass} mb-1`}>Welcome back, {user.name}!</Text>
          <Text className={secondaryTextClass}>Find your perfect college match</Text>
        </View>

        <View className="px-6">
          <View className="relative mb-4">
            <View className="absolute left-4 top-4">
              <Feather name="search" size={20} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />
            </View>

            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="What are you looking for in a college?"
              placeholderTextColor={placeholderColor}
              onSubmitEditing={handleSearch}
              className={`w-full ${inputBgClass} ${textClass} border rounded-2xl pl-12 pr-4 py-4`}
              returnKeyType="search"
            />
          </View>

          <Pressable
            onPress={() => router.push("/questionnaire")}
            className="w-full bg-green-500 rounded-2xl p-4 flex-row items-center"
          >
            <View className="bg-black/20 p-2 rounded-xl mr-3">
              <MaterialIcons name="description" size={20} color="black" />
            </View>

            <View className="flex-1">
              <Text className="font-semibold text-black">Complete Detailed Questionnaire</Text>
              <Text className="text-sm text-black/70">Get personalized college recommendations</Text>
            </View>

            <MaterialIcons name="auto-awesome" size={20} color="black" />
          </Pressable>
        </View>

        {results.length > 0 && (
          <View className="px-6 mt-8">
            <Text className={`text-lg ${textClass} mb-4`}>Recommended Colleges</Text>

            <View className="gap-3">
              {results.map((college, index) => (
                <Pressable key={index} className={`${cardBgClass} border rounded-xl p-4`}>
                  <Text className={textClass}>{college}</Text>
                  <Text className={`text-sm ${secondaryTextClass} mt-1`}>Great match based on your profile</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {user.major ? (
          <View className="px-6 mt-8">
            <View className={`${cardBgClass} border rounded-2xl p-4`}>
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
  );
}
