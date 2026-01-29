// app/index.tsx
import { useEffect } from "react";
import { router } from "expo-router";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useAppData } from "@/hooks/use-app-data";

export default function Index() {
  const { isHydrated, state } = useAppData();

  useEffect(() => {
    if (!isHydrated) return;
    if (state.user) router.replace("/(tabs)");
    else router.replace("/login");
  }, [isHydrated, state.user]);

  if (!isHydrated) {
    return <LoadingScreen message="Preparing your data" />;
  }

  return null;
}
