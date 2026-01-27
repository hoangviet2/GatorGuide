import React, { useState } from react;
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from react-native;
import { Ionicons } from @expovector-icons;
import { router } from expo-router;
import { useColorScheme } from react-native;

export default function AuthScreen() {
  const scheme = useColorScheme();
  const isDarkMode = scheme === dark;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isSignUp, setIsSignUp] = useState(true);

  const bgClass = isDarkMode  bg-black  bg-white;
  const textClass = isDarkMode  text-white  text-gray-900;
  const secondaryTextClass = isDarkMode  text-gray-400  text-gray-600;
  const cardBgClass = isDarkMode  bg-gray-900 border-gray-800  bg-white border-gray-200;
  const inputBgClass = isDarkMode  bg-gray-800 border-gray-700  bg-gray-50 border-gray-300;
  const inactiveButtonClass = isDarkMode  bg-gray-800  bg-gray-100;
  const inactiveTextClass = isDarkMode  text-gray-400  text-gray-600;
  const placeholder = isDarkMode  #9CA3AF  #6B7280;

  const handleSubmit = () = {
    if (name.trim() && email.trim()) {
       test behavior go to tabs after “login”
      router.replace((tabs));
    }
  };

  return (
    KeyboardAvoidingView
      style={{ flex 1 }}
      behavior={Platform.OS === ios  padding  undefined}
    
      ScrollView
        contentContainerStyle={{ flexGrow 1 }}
        keyboardShouldPersistTaps=handled
      
        View className={`flex-1 ${bgClass} items-center justify-center px-6`}
          View className=w-full max-w-md
            View className=items-center mb-8
              View className=bg-green-500 p-4 rounded-full
                Ionicons name=school size={48} color=#000 
              View
            View

            Text className={`text-3xl text-center ${textClass} mb-2`}Gator GuideText
            Text className={`${secondaryTextClass} text-center mb-8`}
              Find your perfect college match
            Text

            View className={`${cardBgClass} border rounded-2xl p-6`}
              View className=flex-row gap-4 mb-6
                Pressable
                  onPress={() = setIsSignUp(true)}
                  className={`flex-1 py-3 rounded-lg items-center ${
                    isSignUp  bg-green-500  inactiveButtonClass
                  }`}
                
                  Text className={`${isSignUp  text-black  inactiveTextClass}`}Sign UpText
                Pressable

                Pressable
                  onPress={() = setIsSignUp(false)}
                  className={`flex-1 py-3 rounded-lg items-center ${
                    !isSignUp  bg-green-500  inactiveButtonClass
                  }`}
                
                  Text className={`${!isSignUp  text-black  inactiveTextClass}`}LoginText
                Pressable
              View

              View className=gap-4
                View
                  Text className={`text-sm ${secondaryTextClass} mb-2`}NameText
                  TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder=Enter your name
                    placeholderTextColor={placeholder}
                    className={`w-full ${inputBgClass} ${textClass} border rounded-lg px-4 py-3`}
                    autoCapitalize=words
                    returnKeyType=next
                  
                View

                View
                  Text className={`text-sm ${secondaryTextClass} mb-2`}EmailText
                  TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder=Enter your email
                    placeholderTextColor={placeholder}
                    className={`w-full ${inputBgClass} ${textClass} border rounded-lg px-4 py-3`}
                    keyboardType=email-address
                    autoCapitalize=none
                    returnKeyType=done
                  
                View

                {!isSignUp && (
                  View className=items-end
                    Pressable onPress={() = router.push(forgot-password)}
                      Text className=text-sm text-green-500Forgot passwordText
                    Pressable
                  View
                )}

                Pressable
                  onPress={handleSubmit}
                  className=w-full bg-green-500 py-4 rounded-lg items-center mt-2
                
                  Text className=text-black font-semibold
                    {isSignUp  Create Account  Sign In}
                  Text
                Pressable
              View
            View
          View
        View
      ScrollView
    KeyboardAvoidingView
  );
}
