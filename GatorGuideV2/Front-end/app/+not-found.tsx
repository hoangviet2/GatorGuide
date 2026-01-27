import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function NotFound() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Route not found</Text>
      <Pressable onPress={() => router.replace("/")} style={{ padding: 12, backgroundColor: "#22C55E", borderRadius: 10 }}>
        <Text style={{ color: "black", fontWeight: "600" }}>Go Home</Text>
      </Pressable>
    </View>
  );
}
