import { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function ForgotPasswordPage() {
  const isDarkMode = false;

  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const inputBgClass = isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300";
  const placeholderColor = useMemo(() => (isDarkMode ? "#9CA3AF" : "#6B7280"), [isDarkMode]);

  const handleSubmit = () => {
    if (!email.trim()) return;
    setIsSuccess(true);
    setTimeout(() => {
      router.replace("/login");
    }, 3000);
  };

  if (isSuccess) {
    return (
      <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} items-center justify-center px-6`}>
        <View className="w-full max-w-md">
          <View className="items-center mb-8">
            <View className="bg-green-500 p-4 rounded-full">
              <MaterialIcons name="check-circle" size={48} color="black" />
            </View>
          </View>

          <Text className={`text-3xl text-center ${textClass} mb-2`}>Check Your Email</Text>
          <Text className={`${secondaryTextClass} text-center mb-8`}>
            We&apos;ve sent a password reset link to {email}
          </Text>

          <View className={`${cardBgClass} border rounded-2xl p-6`}>
            <Text className={`text-sm ${secondaryTextClass} text-center`}>
              Click the link in the email to reset your password. If you don&apos;t see it, check your spam folder.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} px-6 py-8`}>
      <View className="w-full max-w-md self-center">
        <Pressable onPress={() => router.back()} className="mb-8 flex-row items-center">
          <MaterialIcons name="arrow-back" size={20} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />
          <Text className={`${secondaryTextClass} ml-2`}>Back to Login</Text>
        </Pressable>

        <View className="items-center mb-8">
          <View className="bg-green-500 p-4 rounded-full">
            <FontAwesome5 name="graduation-cap" size={48} color="black" />
          </View>
        </View>

        <Text className={`text-3xl text-center ${textClass} mb-2`}>Forgot Password?</Text>
        <Text className={`${secondaryTextClass} text-center mb-8`}>
          Enter your email and we&apos;ll send you a reset link
        </Text>

        <View className={`${cardBgClass} border rounded-2xl p-6`}>
          <View className="gap-4">
            <View>
              <Text className={`text-sm ${secondaryTextClass} mb-2`}>Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={placeholderColor}
                keyboardType="email-address"
                autoCapitalize="none"
                className={`w-full ${inputBgClass} ${textClass} border rounded-lg px-4 py-3`}
              />
            </View>

            <Pressable onPress={handleSubmit} className="w-full bg-green-500 rounded-lg py-4 items-center mt-2">
              <Text className="text-black font-semibold">Send Reset Link</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
