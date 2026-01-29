import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useAppData } from "@/hooks/use-app-data";

export default function AuthPage() {
  const { isDark } = useAppTheme();
  const { isHydrated, signIn } = useAppData();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const inputBgClass = isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300";
  const inactiveButtonClass = isDark ? "bg-gray-800" : "bg-gray-100";
  const placeholderColor = isDark ? "#9CA3AF" : "#6B7280";

  const handleSubmit = async () => {
    if (!isHydrated) return;
    if (name.trim() && email.trim()) {
      await signIn({ name: name.trim(), email: email.trim() });
      router.replace("/(tabs)");
    }
  };

  return (
    <ScreenBackground>
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-md">
          <View className="items-center mb-8">
            <View className="bg-green-500 p-4 rounded-full">
              <FontAwesome5 name="graduation-cap" size={48} color="black" />
            </View>
          </View>

          <Text className={`text-3xl text-center ${textClass} mb-2`}>Gator Guide</Text>
          <Text className={`${secondaryTextClass} text-center mb-8`}>Find your perfect college match</Text>

          <View className={`${cardBgClass} border rounded-2xl p-6`}>
            <View className="flex-row gap-4 mb-6">
              <Pressable
                onPress={() => setIsSignUp(true)}
                className={`flex-1 py-3 rounded-lg items-center ${isSignUp ? "bg-green-500" : inactiveButtonClass}`}
              >
                <Text className={isSignUp ? "text-black" : secondaryTextClass}>Sign Up</Text>
              </Pressable>

              <Pressable
                onPress={() => setIsSignUp(false)}
                className={`flex-1 py-3 rounded-lg items-center ${!isSignUp ? "bg-green-500" : inactiveButtonClass}`}
              >
                <Text className={!isSignUp ? "text-black" : secondaryTextClass}>Login</Text>
              </Pressable>
            </View>

            <View className="gap-4">
              <View>
                <Text className={`text-sm ${secondaryTextClass} mb-2`}>Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor={placeholderColor}
                  className={`w-full ${inputBgClass} ${textClass} border rounded-lg px-4 py-3`}
                />
              </View>

              <View>
                <Text className={`text-sm ${secondaryTextClass} mb-2`}>Email</Text>
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

              <Pressable
                onPress={handleSubmit}
                className={`bg-green-500 rounded-lg py-4 items-center mt-2 ${!isHydrated ? "opacity-60" : ""}`}
                disabled={!isHydrated}
              >
                <Text className="text-black font-semibold">
                  {isSignUp ? "Create Account" : "Sign In"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScreenBackground>
  );
}
