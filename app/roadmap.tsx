import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function RoadmapPage() {
  const { isDark } = useAppTheme();

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const borderClass = isDark ? "border-gray-800" : "border-gray-200";

  // Mock data representing what your API would eventually fill
  const roadmapData = {
    targetCollege: "University of Florida",
    progress: 65,
    requirements: [
      { id: 1, title: "English Composition I", status: "completed", subtitle: "Grade: A" },
      { id: 2, title: "Calculus II", status: "missing", subtitle: "Required for CS Major" },
      { id: 3, title: "Volunteer Hours", status: "in-progress", subtitle: "12/20 hours logged" },
    ],
    deadlines: [
      { date: "Mar 1", event: "Transfer Application Deadline" },
      { date: "May 15", event: "FAFSA Priority Date" },
    ]
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="max-w-md w-full self-center">
          
          {/* Header Section */}
          <View className="px-6 pt-8 pb-4">
            <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center">
              <MaterialIcons name="arrow-back" size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
              <Text className={`${secondaryTextClass} ml-2`}>Back</Text>
            </Pressable>

            <Text className={`text-3xl font-bold ${textClass}`}>Your Roadmap</Text>
            <Text className={`${secondaryTextClass} mt-1`}>
              Path to {roadmapData.targetCollege}
            </Text>
          </View>

          <View className="px-6 gap-6">
            
            {/* Progress Card */}
            <View className={`${cardBgClass} border rounded-3xl p-6`}>
              <View className="flex-row justify-between items-end mb-4">
                <View>
                  <Text className={`${textClass} text-lg font-semibold`}>Overall Readiness</Text>
                  <Text className={`${secondaryTextClass} text-sm`}>Based on transcript & activities</Text>
                </View>
                <Text className="text-blue-500 font-bold text-2xl">{roadmapData.progress}%</Text>
              </View>
              {/* Simple Progress Bar */}
              <View className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <View className="h-full bg-blue-500" style={{ width: `${roadmapData.progress}%` }} />
              </View>
            </View>

            {/* Checklist Section */}
            <View>
              <Text className={`${textClass} text-lg font-semibold mb-3 ml-1`}>Requirements</Text>
              <View className={`${cardBgClass} border rounded-2xl overflow-hidden`}>
                {roadmapData.requirements.map((req, idx, arr) => (
                  <View 
                    key={req.id} 
                    className={`px-5 py-4 flex-row items-center ${idx !== arr.length - 1 ? `border-b ${borderClass}` : ""}`}
                  >
                    <View className="mr-4">
                      {req.status === "completed" ? (
                        <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                      ) : (
                        <Ionicons name="ellipse-outline" size={24} color={isDark ? "#4B5563" : "#D1D5DB"} />
                      )}
                    </View>
                    <View className="flex-1">
                      <Text className={`${textClass} font-medium`}>{req.title}</Text>
                      <Text className={`${secondaryTextClass} text-xs`}>{req.subtitle}</Text>
                    </View>
                    {req.status === "missing" && (
                      <View className="bg-red-500/10 px-2 py-1 rounded">
                        <Text className="text-red-500 text-[10px] font-bold">MISSING</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* Deadlines Section */}
            <View>
              <Text className={`${textClass} text-lg font-semibold mb-3 ml-1`}>Upcoming Deadlines</Text>
              {roadmapData.deadlines.map((item, idx) => (
                <View key={idx} className={`${cardBgClass} border rounded-2xl p-4 flex-row items-center mb-3`}>
                  <View className="bg-blue-500/10 w-12 h-12 rounded-xl items-center justify-center mr-4">
                    <Text className="text-blue-500 font-bold text-xs uppercase">{item.date.split(' ')[0]}</Text>
                    <Text className="text-blue-500 font-bold text-lg leading-5">{item.date.split(' ')[1]}</Text>
                  </View>
                  <Text className={`${textClass} font-medium flex-1`}>{item.event}</Text>
                </View>
              ))}
            </View>

          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}
