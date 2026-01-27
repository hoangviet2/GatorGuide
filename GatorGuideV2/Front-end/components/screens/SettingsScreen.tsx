import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native";
import { router } from "expo-router";
import { Bell, Moon, Globe, Info, Trash2, LogOut, ChevronRight } from "lucide-react-native";

export default function SettingsScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(isDark);

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const cardClass = isDarkMode ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const rowBorder = isDarkMode ? "border-gray-800" : "border-gray-200";

  const Row = (props: {
    icon: React.ReactNode;
    label: string;
    right?: React.ReactNode;
    onPress?: () => void;
    hasBorder?: boolean;
  }) => (
    <Pressable
      onPress={props.onPress}
      className={`flex-row items-center gap-3 px-4 py-4 ${props.hasBorder ? `border-b ${rowBorder}` : ""}`}
    >
      {props.icon}
      <Text className={`flex-1 ${textClass}`}>{props.label}</Text>
      {props.right}
    </Pressable>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ["#000000", "#111827", "#000000"] : ["#FFFFFF", "#ECFDF5", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="max-w-md w-full self-center px-6 pt-10">
          <Text className={`text-2xl ${textClass} mb-6`}>Settings</Text>

          <Text className={`text-sm ${secondaryTextClass} mb-3 px-2`}>Preferences</Text>
          <View className={`${cardClass} border rounded-2xl overflow-hidden mb-6`}>
            <Row
              icon={<Bell size={18} color="#22C55E" />}
              label="Notifications"
              hasBorder
              right={
                <Switch
                  value={isNotificationsEnabled}
                  onValueChange={setIsNotificationsEnabled}
                  trackColor={{ false: isDarkMode ? "#374151" : "#D1D5DB", true: "#22C55E" }}
                  thumbColor="#FFFFFF"
                />
              }
            />
            <Row
              icon={<Moon size={18} color="#22C55E" />}
              label="Dark Mode"
              hasBorder
              right={
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  trackColor={{ false: isDarkMode ? "#374151" : "#D1D5DB", true: "#22C55E" }}
                  thumbColor="#FFFFFF"
                />
              }
            />
            <Row
              icon={<Globe size={18} color="#22C55E" />}
              label="Language"
              onPress={() => router.push("/language")}
              right={<ChevronRight size={18} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />}
            />
          </View>

          <Text className={`text-sm ${secondaryTextClass} mb-3 px-2`}>Support</Text>
          <View className={`${cardClass} border rounded-2xl overflow-hidden mb-6`}>
            <Row
              icon={<Info size={18} color="#22C55E" />}
              label="About"
              onPress={() => router.push("/about")}
              right={<ChevronRight size={18} color={isDarkMode ? "#9CA3AF" : "#6B7280"} />}
            />
          </View>

          <Pressable
            onPress={() => {}}
            className="w-full border rounded-2xl px-4 py-4 flex-row items-center gap-3 mb-3"
            style={{ borderColor: isDarkMode ? "rgba(239,68,68,0.35)" : "#FECACA", backgroundColor: isDarkMode ? "rgba(239,68,68,0.10)" : "#FEF2F2" }}
          >
            <LogOut size={18} color="#EF4444" />
            <Text className="flex-1 text-red-500">Logout</Text>
          </Pressable>

          <Pressable
            onPress={() => {}}
            className="w-full border rounded-2xl px-4 py-4 flex-row items-center gap-3"
            style={{ borderColor: isDarkMode ? "rgba(239,68,68,0.35)" : "#FECACA", backgroundColor: isDarkMode ? "rgba(239,68,68,0.10)" : "#FEF2F2" }}
          >
            <Trash2 size={18} color="#EF4444" />
            <Text className="flex-1 text-red-500">Delete Account</Text>
          </Pressable>

          <Text className={`text-center text-sm mt-8 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>
            Gator Guide v1.0.0
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
