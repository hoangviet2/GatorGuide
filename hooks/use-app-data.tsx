import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type User = {
  name: string;
  email: string;
  major?: string;
  gpa?: string;
  testScores?: string;
  resume?: string; // store a filename or local URI later
};

export type QuestionnaireAnswers = Record<string, string>;

export type AppDataState = {
  user: User | null;
  questionnaireAnswers: QuestionnaireAnswers;
};

const STORAGE_KEY = "gatorguide:appdata:v1";

const initialState: AppDataState = {
  user: null,
  questionnaireAnswers: {},
};

type AppDataContextValue = {
  isHydrated: boolean;
  state: AppDataState;

  signIn: (user: Pick<User, "name" | "email">) => Promise<void>;
  signOut: () => Promise<void>;

  updateUser: (patch: Partial<User>) => Promise<void>;

  setQuestionnaireAnswers: (answers: QuestionnaireAnswers) => Promise<void>;
  clearAll: () => Promise<void>;
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [state, setState] = useState<AppDataState>(initialState);

  // Load once
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!mounted) return;

        if (raw) {
          const parsed = JSON.parse(raw) as AppDataState;
          setState({
            user: parsed.user ?? null,
            questionnaireAnswers: parsed.questionnaireAnswers ?? {},
          });
        }
      } catch {
        // ignore corrupt storage; fall back to initialState
      } finally {
        if (mounted) setIsHydrated(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [isHydrated, state]);

  const signIn = useCallback(async (u: Pick<User, "name" | "email">) => {
    setState((prev) => ({
      ...prev,
      user: {
        name: u.name,
        email: u.email,
        // keep any previously saved profile fields if re-signing in
        major: prev.user?.major ?? "",
        gpa: prev.user?.gpa ?? "",
        testScores: prev.user?.testScores ?? "",
        resume: prev.user?.resume ?? "",
      },
    }));
  }, []);

  const signOut = useCallback(async () => {
    setState((prev) => ({ ...prev, user: null }));
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      return {
        ...prev,
        user: { ...prev.user, ...patch },
      };
    });
  }, []);

  const setQuestionnaireAnswers = useCallback(async (answers: QuestionnaireAnswers) => {
    setState((prev) => ({
      ...prev,
      questionnaireAnswers: { ...answers },
    }));
  }, []);

  const clearAll = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
    setState(initialState);
  }, []);

  const value = useMemo<AppDataContextValue>(
    () => ({
      isHydrated,
      state,
      signIn,
      signOut,
      updateUser,
      setQuestionnaireAnswers,
      clearAll,
    }),
    [isHydrated, state, signIn, signOut, updateUser, setQuestionnaireAnswers, clearAll]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error("useAppData must be used within <AppDataProvider />");
  }
  return ctx;
}
