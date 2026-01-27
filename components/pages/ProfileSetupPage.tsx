import { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function ProfileSetupPage() {
  const { isDark } = useAppTheme();

  const [major, setMajor] = useState("");
  const [resume, setResume] = useState("");
  const [gpa, setGpa] = useState("");
  const [testScores, setTestScores] = useState("");

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white border-gray-200";
  const inputBgClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const progressBgClass = isDark ? "bg-gray-800" : "bg-gray-200";
  const placeholderColor = useMemo(() => (isDark ? "#9CA3AF" : "#6B7280"), [isDark]);

  const handleBack = () => {
    router.replace("/login");
  };

  const handleGpaChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      const num = parseFloat(value);
      if (value === "" || (Number.isFinite(num) && num <= 4.0) || value === "0" || value === "0.") {
        setGpa(value);
      }
    }
  };

  const handleSkip = () => {
    router.replace("/(tabs)");
  };

  const handleContinue = () => {
    // later: save to Firebase / state store
    router.replace("/(tabs)");
  };

  const handlePickResume = () => {
    // stub for now (Expo Go file picking will be added later)
    setResume("resume.pdf");
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="w-full max-w-md self-center px-6 pt-8">
          <Pressable onPress={handleBack} className="mb-6 flex-row items-center">
            <MaterialIcons name="arrow-back" size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
          </Pressable>

          <View className="mb-8">
            <Text className={`text-2xl ${textClass} mb-2`}>Set Up Your Profile</Text>
            <Text className={secondaryTextClass}>
              Tell us about yourself to get personalized college recommendations
            </Text>
          </View>

          <View className="flex-row gap-2 mb-8">
            <View className="h-1 flex-1 bg-green-500 rounded" />
            <View className={`h-1 flex-1 ${progressBgClass} rounded`} />
            <View className={`h-1 flex-1 ${progressBgClass} rounded`} />
          </View>

          <View className="gap-4">
            <View>
              <Text className={`text-sm ${secondaryTextClass} mb-2`}>Intended Major/Field of Study</Text>
              <TextInput
                value={major}
                onChangeText={setMajor}
                placeholder="e.g., Computer Science"
                placeholderTextColor={placeholderColor}
                className={`w-full ${inputBgClass} ${textClass} border rounded-lg px-4 py-3`}
              />
            </View>

            <View>
              <Text className={`text-sm ${secondaryTextClass} mb-2`}>GPA (0.0 - 4.0, Optional)</Text>
              <TextInput
                value={gpa}
                onChangeText={handleGpaChange}
                placeholder="e.g., 3.8"
                placeholderTextColor={placeholderColor}
                keyboardType="decimal-pad"
                className={`w-full ${inputBgClass} ${textClass} border rounded-lg px-4 py-3`}
              />
            </View>

            <View>
              <Text className={`text-sm ${secondaryTextClass} mb-2`}>Test Scores (Optional)</Text>
              <TextInput
                value={testScores}
                onChangeText={setTestScores}
                placeholder="e.g., SAT: 1450, ACT: 32"
                placeholderTextColor={placeholderColor}
                className={`w-full ${inputBgClass} ${textClass} border rounded-lg px-4 py-3`}
              />
            </View>

            <View>
              <Text className={`text-sm ${secondaryTextClass} mb-2`}>Resume (Optional)</Text>

              <Pressable
                onPress={handlePickResume}
                className={`${cardBgClass} border rounded-lg px-4 py-4 flex-row items-center justify-between`}
              >
                <Text className={resume ? textClass : secondaryTextClass}>{resume || "Upload your resume"}</Text>
                <MaterialIcons name="upload-file" size={20} color="#22C55E" />
              </Pressable>

              <Text className={`text-xs ${secondaryTextClass} mt-2`}>
                File upload is stubbed for now. We can add Document Picker later.
              </Text>
            </View>

            <View className="flex-row gap-4 pt-6">
              <Pressable
                onPress={handleSkip}
                className={`flex-1 rounded-lg py-4 items-center border ${
                  isDark ? "bg-gray-900/60 border-gray-800" : "bg-white/90 border-gray-200"
                }`}
              >
                <Text className={secondaryTextClass}>Skip for Now</Text>
              </Pressable>

              <Pressable
                onPress={handleContinue}
                className="flex-1 bg-green-500 rounded-lg py-4 items-center flex-row justify-center"
              >
                <Text className="text-black font-semibold mr-2">Continue</Text>
                <MaterialIcons name="arrow-forward" size={18} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}
