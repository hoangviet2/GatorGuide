import React, { useState, useEffect, useMemo } from "react";
import { View, Text, Pressable, ScrollView, TextInput, Animated } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layouts/ScreenBackground";
import { useThemeStyles } from "@/hooks/use-theme-styles";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  notes: string[];
  expanded: boolean;
}

interface StudentProfile {
  name: string;
  gradeLevel: number;
  intendedMajor: string;
  targetSchools: string[];
  completedCourses: string[];
  interests: string[];
}

export default function RoadmapPage() {
  const styles = useThemeStyles();
  const { textClass, secondaryTextClass, cardBgClass, borderClass } = styles;

  // Mocked student profile
  const studentProfile: StudentProfile = {
    name: "Jane Doe",
    gradeLevel: 11,
    intendedMajor: "Computer Science",
    targetSchools: ["UW", "CWU"],
    completedCourses: ["Math 101", "English 101"],
    interests: ["Robotics Club", "Volunteer Work"],
  };

  // Mocked active clubs
  const [activeClubs, setActiveClubs] = useState<string[]>([
    "Robotics Club",
    "Dance Club",
    "Math Club",
  ]);

  // Generate tasks from profile
  const generateTasks = (profile: StudentProfile): Task[] => {
    const courseTasks: Task[] = profile.completedCourses.map((course) => ({
      id: `course-${course}`,
      title: `Complete ${course}`,
      description: `Finish all assignments and exams for ${course}.`,
      completed: true,
      notes: [],
      expanded: false,
    }));

    const appTask: Task = {
      id: "submit-applications",
      title: `Submit applications for ${profile.targetSchools.join(", ")}`,
      description: "Submit your college applications before the deadlines.",
      completed: false,
      notes: [],
      expanded: false,
    };

    const interestTasks: Task[] = profile.interests.map((interest, idx) => ({
      id: `interest-${idx}`,
      title: `Join ${interest}`,
      description: `Participate in ${interest} activities.`,
      completed: false,
      notes: [],
      expanded: false,
    }));

    return [...courseTasks, appTask, ...interestTasks];
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [aiInput, setAiInput] = useState("");
  const [aiResponses, setAiResponses] = useState<string[]>([]);

  useEffect(() => {
    setTasks(generateTasks(studentProfile));
  }, []);

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

  const addNote = (id: string, note: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, notes: [...task.notes, note] } : task
      )
    );
  };

  const handleSendAI = () => {
    if (!aiInput) return;
    setAiResponses((prev) => [
      ...prev,
      `You: ${aiInput}`,
      `AI: Suggestion for "${aiInput}"`,
    ]);
    setAiInput("");
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  // Group tasks by type
  const groupedTasks = useMemo(() => ({
    courses: tasks.filter((t) => t.id.startsWith("course")),
    applications: tasks.filter((t) => t.id.startsWith("submit")),
    interests: tasks.filter((t) => t.id.startsWith("interest")),
  }), [tasks]);

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="max-w-md w-full self-center">
          {/* Header */}
          <View className="px-6 pt-8 pb-6">
            <Pressable
              onPress={() => router.back()}
              className="mb-4 flex-row items-center"
            >
              <MaterialIcons
                name="arrow-back"
                size={20}
                color={styles.placeholderColor}
              />
              <Text className={`${secondaryTextClass} ml-2`}>Back</Text>
            </Pressable>

            <Text className={`text-2xl ${textClass}`}>Roadmap</Text>
            <Text className={`${secondaryTextClass} mt-2`}>
              Personalized transfer plan checklist
            </Text>

            {/* Progress Bar */}
            <View className="mt-4 h-4 w-full bg-gray-300 rounded-full overflow-hidden">
              <Animated.View
                style={{
                  width: `${progress}%`,
                  height: 16,
                  backgroundColor: "#22C55E",
                  borderRadius: 8,
                }}
              />
            </View>
            <Text className={`${secondaryTextClass} mt-1 text-sm`}>
              {completedCount} of {tasks.length} tasks completed ({progress}%)
            </Text>
          </View>

          {/* AI Assistant */}
          <View className="px-6 mb-4">
            <View className={`${cardBgClass} border rounded-2xl p-5`}>
              <Text className={`${textClass} text-base mb-2`}>
                Personal AI Assistant
              </Text>
              <TextInput
                value={aiInput}
                onChangeText={setAiInput}
                placeholder="Ask your AI assistant..."
                placeholderTextColor={styles.placeholderColor}
                onSubmitEditing={handleSendAI}
                className={`border p-2 rounded-lg mb-2 ${styles.inputBgClass} ${textClass}`}
              />
              <Pressable
                onPress={handleSendAI}
                className="bg-green-500 rounded-lg px-4 py-2 mb-2 items-center"
              >
                <Text className="text-black font-semibold">Send</Text>
              </Pressable>

              {aiResponses.map((r, i) => (
                <Text key={i} className={`${textClass} text-sm mb-1`}>
                  {r}
                </Text>
              ))}
            </View>
          </View>

          {/* Task List */}
          <View className="px-6 gap-4">
            {Object.entries(groupedTasks).map(([groupName, groupTasks]) => (
              <View key={groupName} className="mb-4">
                <Text className={`${textClass} text-lg mb-2 capitalize`}>
                  {groupName} ({groupTasks.length})
                </Text>
                {groupTasks.map((task) => (
                  <View
                    key={task.id}
                    className={`${cardBgClass} border rounded-2xl overflow-hidden mb-2`}
                  >
                    <Pressable
                      className="px-5 py-5 flex-row items-start"
                      onPress={() => toggleExpanded(task.id)}
                    >
                      <Pressable
                        onPress={() => toggleCompleted(task.id)}
                        className={`w-6 h-6 rounded-full border-2 ${
                          task.completed
                            ? "bg-green-500 border-green-500"
                            : borderClass
                        } mr-4`}
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
                          <>
                            {task.notes.map((note, idx) => (
                              <Text
                                key={idx}
                                className={`${textClass} mt-2 text-sm border p-2 rounded-lg`}
                              >
                                {note}
                              </Text>
                            ))}
                            <TextInput
                              placeholder="Add a note..."
                              placeholderTextColor={styles.placeholderColor}
                              onSubmitEditing={(e) =>
                                addNote(task.id, e.nativeEvent.text)
                              }
                              className={`mt-2 border p-2 rounded-lg ${styles.inputBgClass} ${textClass}`}
                            />
                          </>
                        )}
                      </View>
                    </Pressable>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Active Clubs */}
          <View className="px-6 mt-6 mb-8">
            <View className={`${cardBgClass} border rounded-2xl p-5`}>
              <Text className={`${textClass} text-base mb-2`}>Active Clubs</Text>
              <View className="flex-row flex-wrap">
                {activeClubs.map((club, i) => (
                  <View
                    key={i}
                    className="bg-green-500 px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    <Text className="text-black text-sm">{club}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}
