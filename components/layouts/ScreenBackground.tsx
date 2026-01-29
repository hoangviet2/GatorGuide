import React from "react";
import { View, type ViewProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "@/hooks/use-app-theme";

type Props = ViewProps & {
  children: React.ReactNode;
};

export function ScreenBackground({ children, style, ...rest }: Props) {
  const { isDark } = useAppTheme();

  const colors = isDark
    ? ["#000000", "#111827", "#000000"]
    : ["#FFFFFF", "#ECFDF5", "#FFFFFF"];

  return (
    <LinearGradient colors={colors} style={[{ flex: 1 }, style]} {...rest}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
}
