import { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useAppData } from "@/hooks/use-app-data";

type Question =
  | { id: string; question: string; type: "text" | "textarea"; placeholder: string }
  | { id: string; question: string; type: "radio"; options: string[] };

export default function ProfilePage() {
  const { isDark } = useAppTheme();
  const { isHydrated, state, updateUser, setQuestionnaireAnswers } = useAppData();

  const user = state.user;

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    major: "",
    gpa: "",
    testScores: "",
    resume: "",
  });

  // Questionnaire state
  const questions: Question[] = useMemo(
    () => [
      { id: "volunteerActivities", question: "What volunteer activities have you participated in?", placeholder: "Describe your volunteer experiences...", type: "textarea" },
      { id: "extracurriculars", question: "What extracurricular activities are you involved in?", placeholder: "List your activities and roles...", type: "textarea" },
      { id: "collegeSetting", question: "What type of college setting do you prefer?", options: ["Urban", "Suburban", "Rural", "No Preference"], type: "radio" },
      { id: "collegeSize", question: "What size college are you looking for?", options: ["Small (< 5,000)", "Medium (5,000-15,000)", "Large (> 15,000)", "No Preference"], type: "radio" },
      { id: "environment", question: "What kind of campus environment appeals to you?", options: ["Research-focused", "Liberal Arts", "Technical/Engineering", "Pre-professional", "Mixed"], type: "radio" },
      { id: "programs", question: "Are there specific programs or resources you're looking for?", placeholder: "e.g., Study abroad, research opportunities, internships...", type: "textarea" },
      { id: "budget", question: "What is your budget range for annual tuition?", options: ["< $20,000", "$20,000 - $40,000", "$40,000 - $60,000", "> $60,000", "Need financial aid"], type: "radio" },
      { id: "location", question: "Do you have a preferred geographic location?", placeholder: "Enter preferred states, regions, or countries...", type: "text" },
      { id: "housingPreference", question: "What are your housing preferences?", options: ["On-campus dormitory", "Off-campus apartment", "Commute from home", "No preference"], type: "radio" },
      { id: "careerGoals", question: "What are your career goals after graduation?", placeholder: "Describe your aspirations and career path...", type: "textarea" },
    ],
    []
  );

  const blankAnswers = useMemo(() => {
    const init: Record<string, string> = {};
    for (const q of questions) init[q.id] = "";
    return init;
  }, [questions]);

  const [questionnaireAnswers, setLocalAnswers] = useState<Record<string, string>>(() => blankAnswers);

  useEffect(() => {
    if (!isHydrated) return;
    setEditData({
      major: user?.major ?? "",
      gpa: user?.gpa ?? "",
      testScores: user?.testScores ?? "",
      resume: user?.resume ?? "",
    });
    setLocalAnswers({ ...blankAnswers, ...(state.questionnaireAnswers ?? {}) });
  }, [isHydrated, user, state.questionnaireAnswers, blankAnswers]);

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const inputBgClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const borderClass = isDark ? "border-gray-800" : "border-gray-200";
  const placeholderColor = isDark ? "#9CA3AF" : "#6B7280";

  const hasQuestionnaireData = useMemo(
    () => Object.keys(state.questionnaireAnswers ?? {}).length > 0,
    [state.questionnaireAnswers]
  );

  const handleSaveProfile = async () => {
    if (!user) return;
    await updateUser({
      major: editData.major,
      gpa: editData.gpa,
      testScores: editData.testScores,
      resume: editData.resume,
    });
    setIsEditing(false);
  };

  const handleSaveQuestionnaire = async () => {
    await setQuestionnaireAnswers(questionnaireAnswers);
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
    setEditData((p) => ({ ...p, resume: "resume.pdf" }));
  };

  const handleAnswerChange = (id: string, value: string) => {
    setLocalAnswers((p) => ({ ...p, [id]: value }));
  };

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
              onPress={handleSaveProfile}
              className="bg-green-500 rounded-lg px-4 py-3 flex-row items-center"
              disabled={!isHydrated}
            >
              <MaterialIcons name="save" size={16} color="black" />
              <Text className="text-black font-semibold ml-2">Save</Text>
            </Pressable>
          </View>

          <View className="px-6">
            {/* Profile Card */}
            <View className={`${cardBgClass} border rounded-2xl p-6`}>
              {/* avatar, email, major, gpa, test scores, resume */}
              <View className="flex-row items-center mb-6">
                <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mr-4">
                  <Text className="text-black text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</Text>
                </View>
                <View>
                  <Text className={`text-xl ${textClass}`}>{user.name}</Text>
                  <Text className={secondaryTextClass}>{user.email}</Text>
                </View>
              </View>
              {/* Email */}
              <View className={`border-t ${borderClass} pt-4`}>
                <View className="flex-row items-start">
                  <MaterialIcons name="mail" size={20} color="#22C55E" />
                  <View className="flex-1 ml-3">
                    <Text className={`text-sm ${secondaryTextClass} mb-1`}>Email</Text>
                    <Text className={textClass}>{user.email}</Text>
                  </View>
                </View>
              </View>
              {/* Major */}
              <View className={`border-t ${borderClass} pt-4 mt-4`}>
                <View className="flex-row items-start">
                  <MaterialIcons name="school" size={20} color="#22C55E" />
                  <View className="flex-1 ml-3">
                    <Text className={`text-sm ${secondaryTextClass} mb-1`}>Major</Text>
                    <TextInput
                      value={editData.major}
                      onChangeText={(t) => setEditData((p) => ({ ...p, major: t }))}
                      placeholder="e.g., Computer Science"
                      placeholderTextColor={placeholderColor}
                      className={`w-full ${inputBgClass} ${textClass} border rounded-lg px-3 py-2`}
                    />
                  </View>
                </View>
              </View>
              {/* GPA */}
              <View className={`border-t ${borderClass} pt-4 mt-4`}>
                <View className="flex-row items-start">
                  <MaterialIcons name="description" size={20} color="#22C55E" />
                  <View className="flex-1 ml-3">
                    <Text className={`text-sm ${secondaryTextClass} mb-1`}>GPA (0.0 - 4.0)</Text>
                    <TextInput
                      value={editData.gpa}
                      onChangeText={handleGpaChange}
                      placeholder="e.g., 3.8"
                      placeholderTextColor={placeholderColor}
                      keyboardType="decimal-pad"
                      className={`w-full ${inputBgClass} ${textClass} border rounded-lg px-3 py-2`}
                    />
                  </View>
                </View>
              </View>
              {/* Test Scores */}
              <View className={`border-t ${borderClass} pt-4 mt-4`}>
                <View className="flex-row items-start">
                  <MaterialIcons name="notes" size={20} color="#22C55E" />
                  <View className="flex-1 ml-3">
                    <Text className={`text-sm ${secondaryTextClass} mb-1`}>Test Scores</Text>
                    <TextInput
                      value={editData.testScores}
                      onChangeText={(t) => setEditData((p) => ({ ...p, testScores: t }))}
                      placeholder="e.g., SAT: 1450"
                      placeholderTextColor={placeholderColor}
                      className={`w-full ${inputBgClass} ${textClass} border rounded-lg px-3 py-2`}
                    />
                  </View>
                </View>
              </View>
              {/* Resume */}
              <View className={`border-t ${borderClass} pt-4 mt-4`}>
                <View className="flex-row items-start">
                  <MaterialIcons name="upload-file" size={20} color="#22C55E" />
                  <View className="flex-1 ml-3">
                    <Text className={`text-sm ${secondaryTextClass} mb-1`}>Resume</Text>
                    <Pressable
                      onPress={handlePickResume}
                      className={`${inputBgClass} border rounded-lg px-3 py-3 flex-row items-center justify-between`}
                    >
                      <Text className={`${textClass} text-sm`}>{editData.resume || "Upload resume"}</Text>
                      <MaterialIcons name="upload" size={18} color="#22C55E" />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            {/* Questionnaire Card */}
            <View className={`${cardBgClass} border rounded-2xl p-6 mt-4`}>
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <MaterialIcons name="assignment" size={20} color="#22C55E" />
                  <Text className={`text-lg ${textClass} ml-3`}>Questionnaire</Text>
                </View>
              </View>

              {!isEditing ? (
                <>
                  <Text className={`text-sm ${secondaryTextClass} mb-4`}>
                    {hasQuestionnaireData
                      ? "Your preferences have been saved."
                      : "Complete the questionnaire to get personalized college recommendations."}
                  </Text>
                  <Pressable onPress={() => setIsEditing(true)}>
                    <Text className="text-green-500 text-sm">{hasQuestionnaireData ? "Edit" : "Complete"}</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  {questions.map((q) => {
                    const value = questionnaireAnswers[q.id] ?? "";
                    return (
                      <View key={q.id} className="mb-4">
                        <Text className={`text-sm ${textClass} mb-1`}>{q.question}</Text>

                        {q.type === "textarea" && (
                          <TextInput
                            value={value}
                            onChangeText={(t) => handleAnswerChange(q.id, t)}
                            placeholder={q.placeholder}
                            placeholderTextColor={placeholderColor}
                            multiline
                            textAlignVertical="top"
                            className={`min-h-[100px] ${inputBgClass} ${textClass} border rounded-lg px-3 py-2`}
                          />
                        )}

                        {q.type === "text" && (
                          <TextInput
                            value={value}
                            onChangeText={(t) => handleAnswerChange(q.id, t)}
                            placeholder={q.placeholder}
                            placeholderTextColor={placeholderColor}
                            className={`${inputBgClass} ${textClass} border rounded-lg px-3 py-2`}
                          />
                        )}

                        {q.type === "radio" && (
                          <View className="flex-row flex-wrap gap-2">
                            {q.options.map((option) => {
                              const isSelected = value === option;
                              return (
                                <Pressable
                                  key={option}
                                  onPress={() => handleAnswerChange(q.id, option)}
                                  className={`px-3 py-2 rounded-lg border ${
                                    isSelected
                                      ? "bg-green-500/10 border-green-500"
                                      : isDark
                                      ? "bg-gray-900/70 border-gray-800"
                                      : "bg-white/90 border-gray-200"
                                  }`}
                                >
                                  <Text className={isSelected ? "text-green-500" : textClass}>{option}</Text>
                                </Pressable>
                              );
                            })}
                          </View>
                        )}
                      </View>
                    );
                  })}
                  <Pressable
                    onPress={handleSaveQuestionnaire}
                    className="bg-green-500 rounded-lg py-3 items-center mt-4"
                  >
                    <Text className="text-black font-semibold">Save Questionnaire</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}
