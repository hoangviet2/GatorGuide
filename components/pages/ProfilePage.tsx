import { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useAppData } from "@/hooks/use-app-data";
import { ProfileField } from "@/components/ui/ProfileField";

export default function ProfilePage() {
  const { isDark } = useAppTheme();
  const { isHydrated, state, updateUser } = useAppData();

  const user = state.user;

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    major: "",
    gpa: "",
    testScores: "",
    resume: "",
  });

  useEffect(() => {
    if (!isHydrated) return;
    setEditData({
      major: user?.major ?? "",
      gpa: user?.gpa ?? "",
      testScores: user?.testScores ?? "",
      resume: user?.resume ?? "",
    });
  }, [isHydrated, user?.major, user?.gpa, user?.testScores, user?.resume]);

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const inputBgClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const inputClass = `w-full ${inputBgClass} ${textClass} border rounded-lg px-3 py-2`;
  const borderClass = isDark ? "border-gray-800" : "border-gray-200";
  const placeholderColor = isDark ? "#9CA3AF" : "#6B7280";

  const hasQuestionnaireData = useMemo(
    () => Object.keys(state.questionnaireAnswers ?? {}).length > 0,
    [state.questionnaireAnswers]
  );

  const handleSave = () => {
    if (!user) return;
    updateUser({
      major: editData.major,
      gpa: editData.gpa,
      testScores: editData.testScores,
      resume: editData.resume,
    });
    setIsEditing(false);
  };

  const handleGpaChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      const num = parseFloat(value);
      if (value === "" || value === "0" || value === "0." || (Number.isFinite(num) && num <= 4.0)) {
        setEditData((p) => ({ ...p, gpa: value }));
      }
    }
  };

  const handlePickResume = () => {
    // stub for now; can add expo-document-picker later
    setEditData((p) => ({ ...p, resume: "resume.pdf" }));
  };

  // If not signed in yet, show a simple prompt (prevents null crashes)
  if (!user) {
    return (
      <ScreenBackground>
        <View className="flex-1 items-center justify-center px-6">
          <View className={`${cardBgClass} border rounded-2xl p-6 w-full max-w-md`}>
            <Text className={`text-xl ${textClass} mb-2`}>Not signed in</Text>
            <Text className={`${secondaryTextClass} mb-4`}>
              Create an account or sign in to edit your profile.
            </Text>
            <Pressable
              onPress={() => router.replace("/login")}
              className="bg-green-500 rounded-lg py-4 items-center"
              disabled={!isHydrated}
            >
              <Text className="text-black font-semibold">Go to Login</Text>
            </Pressable>
          </View>
        </View>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="max-w-md w-full self-center">
          {/* Header */}
          <View className="px-6 pt-8 pb-6 flex-row items-center justify-between">
            <Text className={`text-2xl ${textClass}`}>Profile</Text>

            <Pressable
              onPress={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              className="bg-green-500 rounded-lg px-4 py-3 flex-row items-center"
            >
              <MaterialIcons name={isEditing ? "save" : "edit"} size={16} color="black" />
              <Text className="text-black font-semibold ml-2">{isEditing ? "Save" : "Edit"}</Text>
            </Pressable>
          </View>

          <View className="px-6">
            {/* Profile Card */}
            <View className={`${cardBgClass} border rounded-2xl p-6`}>
              <View className="flex-row items-center mb-6">
                <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mr-4">
                  <Text className="text-black text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</Text>
                </View>

                <View>
                  <Text className={`text-xl ${textClass}`}>{user.name}</Text>
                  <Text className={secondaryTextClass}>{user.email}</Text>
                </View>
              </View>

              <ProfileField
                type="display"
                icon="mail"
                label="Email"
                value={user.email}
                isEditing={false}
                textClass={textClass}
                secondaryTextClass={secondaryTextClass}
                borderClass={borderClass}
              />

              <ProfileField
                type="text"
                icon="school"
                label="Major"
                value={user.major}
                isEditing={isEditing}
                editValue={editData.major}
                onChangeText={(t) => setEditData((p) => ({ ...p, major: t }))}
                placeholder="e.g., Computer Science"
                placeholderColor={placeholderColor}
                inputBgClass={inputBgClass}
                inputClass={inputClass}
                textClass={textClass}
                secondaryTextClass={secondaryTextClass}
                borderClass={borderClass}
              />

              <ProfileField
                type="text"
                icon="description"
                label="GPA (0.0 - 4.0)"
                value={user.gpa}
                isEditing={isEditing}
                editValue={editData.gpa}
                onChangeText={handleGpaChange}
                placeholder="e.g., 3.8"
                placeholderColor={placeholderColor}
                inputBgClass={inputBgClass}
                inputClass={inputClass}
                keyboardType="decimal-pad"
                textClass={textClass}
                secondaryTextClass={secondaryTextClass}
                borderClass={borderClass}
              />

              <ProfileField
                type="text"
                icon="notes"
                label="Test Scores"
                value={user.testScores}
                isEditing={isEditing}
                editValue={editData.testScores}
                onChangeText={(t) => setEditData((p) => ({ ...p, testScores: t }))}
                placeholder="e.g., SAT: 1450"
                placeholderColor={placeholderColor}
                inputBgClass={inputBgClass}
                inputClass={inputClass}
                textClass={textClass}
                secondaryTextClass={secondaryTextClass}
                borderClass={borderClass}
              />

              <ProfileField
                type="upload"
                icon="upload-file"
                label="Resume"
                value={user.resume}
                isEditing={isEditing}
                editValue={editData.resume}
                onPress={handlePickResume}
                uploadText="Upload resume"
                emptyText="Not uploaded"
                inputBgClass={inputBgClass}
                textClass={textClass}
                secondaryTextClass={secondaryTextClass}
                borderClass={borderClass}
              />
            </View>

            {/* Questionnaire */}
            <View className={`${cardBgClass} border rounded-2xl p-6 mt-4`}>
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <MaterialIcons name="assignment" size={20} color="#22C55E" />
                  <Text className={`text-lg ${textClass} ml-3`}>Questionnaire</Text>
                </View>

                <Pressable onPress={() => router.push("/questionnaire")}>
                  <Text className="text-green-500 text-sm">{hasQuestionnaireData ? "Edit" : "Complete"}</Text>
                </Pressable>
              </View>

              <Text className={`text-sm ${secondaryTextClass}`}>
                {hasQuestionnaireData
                  ? "Your preferences have been saved. Tap Edit to update your responses."
                  : "Complete the questionnaire to get personalized college recommendations."}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}
