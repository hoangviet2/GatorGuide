import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function AboutPage() {
  const isDarkMode = false;

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`} contentContainerStyle={{ paddingBottom: 32 }}>
      <View className="max-w-md w-full self-center">
        <View className="px-6 pt-8 pb-6">
          <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center">
            <MaterialIcons name="arrow-back" size={20} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />
            <Text className={`${secondaryTextClass} ml-2`}>Back</Text>
          </Pressable>

          <Text className={`text-2xl ${textClass}`}>About Gator Guide</Text>
        </View>

        <View className="px-6 mb-6">
          <View className={`${cardBgClass} border rounded-2xl p-6`}>
            <View className="items-center mb-4">
              <View className="bg-green-500 p-4 rounded-2xl">
                <FontAwesome5 name="graduation-cap" size={48} color="black" />
              </View>
            </View>

            <Text className={`text-xl ${textClass} text-center mb-2`}>Gator Guide</Text>
            <Text className={`${secondaryTextClass} text-center text-sm`}>
              Helping Green River College students find their perfect transfer match
            </Text>
          </View>
        </View>

        <View className="px-6 mb-6">
          <Text className={`${textClass} mb-3 px-2`}>How It Works</Text>

          <View className={`${cardBgClass} border rounded-2xl p-6 gap-4`}>
            {[
              {
                n: "1",
                title: "Profile Analysis",
                body: "The app analyzes your academic profile including GPA, test scores, major interests, and extracurricular activities.",
              },
              {
                n: "2",
                title: "Preference Matching",
                body: "Your preferences for campus setting, location, size, and other factors are matched against our college database.",
              },
              {
                n: "3",
                title: "Smart Recommendations",
                body: "Our algorithm weighs transfer credit policies, program strength, and admission probability to provide personalized recommendations.",
              },
              {
                n: "4",
                title: "Continuous Updates",
                body: "As you update your profile and complete more coursework, recommendations are refined to reflect your evolving academic journey.",
              },
            ].map((item) => (
              <View key={item.n}>
                <View className="flex-row items-center mb-2">
                  <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center mr-2">
                    <Text className="text-black text-sm font-semibold">{item.n}</Text>
                  </View>
                  <Text className={`${textClass} font-medium`}>{item.title}</Text>
                </View>
                <Text className={`text-sm ${secondaryTextClass} ml-8`}>{item.body}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-6 mb-4">
          <Text className={`${textClass} mb-3 px-2`}>App Information</Text>

          <View className={`${cardBgClass} border rounded-2xl overflow-hidden`}>
            <View className={`px-4 py-4 flex-row items-center justify-between border-b ${borderClass}`}>
              <Text className={secondaryTextClass}>Version</Text>
              <Text className={textClass}>1.0.0</Text>
            </View>

            <Pressable
              onPress={() => {}}
              className={`px-4 py-4 flex-row items-center justify-between border-b ${borderClass}`}
            >
              <Text className={secondaryTextClass}>Privacy Policy</Text>
              <MaterialIcons name="chevron-right" size={22} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />
            </Pressable>

            <Pressable onPress={() => {}} className="px-4 py-4 flex-row items-center justify-between">
              <Text className={secondaryTextClass}>Terms of Service</Text>
              <MaterialIcons name="chevron-right" size={22} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />
            </Pressable>
          </View>
        </View>

        <View className="px-6">
          <View className={`${isDarkMode ? "bg-gray-900/50 border-gray-800" : "bg-gray-50 border-gray-200"} border rounded-2xl p-4`}>
            <Text className={`${textClass} text-sm mb-2`}>Disclaimer</Text>
            <Text className={`${secondaryTextClass} text-xs leading-relaxed`}>
              Gator Guide provides recommendations based on available data and your profile information. Admission decisions are made by
              individual institutions and are subject to their specific requirements and policies. We recommend contacting colleges directly
              for the most accurate and up-to-date information. This app is designed for informational purposes and does not guarantee
              admission to any institution.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
