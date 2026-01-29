import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function RoadmapPage() {
  const { isDark } = useAppTheme();

  const textClass = isDark ? "text-white" : "text-gray-900";
  const secondaryTextClass = isDark ? "text-gray-400" : "text-gray-600";
  const cardBgClass = isDark ? "bg-gray-900/80 border-gray-800" : "bg-white/90 border-gray-200";
  const borderClass = isDark ? "border-gray-800" : "border-gray-200";

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Complete Math 101",
      description: "Finish all assignments and exams for Math 101.",
      completed: false,
      notes: "",
      expanded: false,
    },
    {
      id: "2",
      title: "Submit Application",
      description: "Submit your college application before the deadline.",
      completed: false,
      notes: "",
      expanded: false,
    },
    {
      id: "3",
      title: "Join Student Club",
      description: "Participate in at least one extracurricular club.",
      completed: false,
      notes: "",
      expanded: false,
    },
  ]);

  const toggleCompleted = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleExpanded = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, expanded: !task.expanded } : task
      )
    );
  };

  const updateNotes = (id: string, notes: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, notes } : task))
    );
  };

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="max-w-md w-full self-center">
          {/* Header */}
          <View className="px-6 pt-8 pb-6">
            <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center">
              <MaterialIcons
                name="arrow-back"
                size={20}
                color={isDark ? "#9CA3AF" : "#6B7280"}
              />
              <Text className={`${secondaryTextClass} ml-2`}>Back</Text>
            </Pressable>

            <Text className={`text-2xl ${textClass}`}>Roadmap</Text>
            <Text className={`${secondaryTextClass} mt-2`}>
              This page will become your transfer plan checklist (courses, deadlines, activities).
            </Text>
          </View>

          {/* Task List */}
          <View className="px-6 gap-4">
            {tasks.map((task, idx) => (
              <View
                key={task.id}
                className={`${cardBgClass} border rounded-2xl overflow-hidden`}
              >
                <Pressable
                  className={`px-5 py-5 flex-row items-start ${idx !== tasks.length - 1 ? `border-b ${borderClass}` : ""}`}
                  onPress={() => toggleExpanded(task.id)}
                >
                  {/* Checkbox */}
                  <Pressable
                    onPress={() => toggleCompleted(task.id)}
                    className={`w-6 h-6 rounded-full border-2 ${task.completed ? "bg-green-500 border-green-500" : borderClass} mr-4`}
                  />

                  <View className="flex-1">
                    <Text
                      className={`${textClass} text-base mb-1 ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </Text>
                    <Text
                      className={`${secondaryTextClass} text-sm ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.description}
                    </Text>

                    {task.expanded && (
                      <TextInput
                        value={task.notes}
                        onChangeText={(text) => updateNotes(task.id, text)}
                        placeholder="Add your notes here..."
                        placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                        multiline
                        className={`${textClass} mt-3 border p-2 rounded-lg ${
                          isDark ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-gray-100"
                        }`}
                      />
                    )}
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}
