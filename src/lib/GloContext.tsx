import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";

export type Goal = {
  id: string;
  title: string;
  description: string;
  frequency: "Daily" | "Weekly" | "Custom";
  rewardId?: string;
  status: "Active" | "Completed" | "Archived";
  streak: number;
  totalCheckins: number;
};

export type Reward = {
  id: string;
  title: string;
  isUsed: boolean;
};

export type CheckIn = {
  id: string;
  goalId: string;
  date: string;
  status: "Done" | "Fail";
};

export type VisionItem = {
  id: string;
  src?: string;
  text?: string;
};

interface GloState {
  goals: Goal[];
  rewards: Reward[];
  checkIns: CheckIn[];
  visionBoard: VisionItem[];
  stats: {
    successRate: number;
    totalCheckins: number;
    currentStreak: number;
    longestStreak: number;
  };
  isLoading: boolean;
  addGoal: (goal: Omit<Goal, "id" | "streak" | "totalCheckins">) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  addReward: (title: string) => void;
  useReward: (id: string) => void;
  deleteReward: (id: string) => void;
  checkInGoal: (goalId: string, date: Date, status: "Done" | "Fail") => void;
  addVisionItem: (item: Omit<VisionItem, "id">) => void;
  removeVisionItem: (id: string) => void;
}

const GloContext = createContext<GloState | undefined>(undefined);

const DEFAULT_VISION: VisionItem[] = [
  { id: crypto.randomUUID(), src: "vision-1.png" },
  { id: crypto.randomUUID(), src: "vision-2.png" },
  { id: crypto.randomUUID(), src: "vision-3.png" },
  { id: crypto.randomUUID(), src: "vision-4.png" },
  { id: crypto.randomUUID(), text: "it's already yours" },
  { id: crypto.randomUUID(), src: "vision-5.png" },
  { id: crypto.randomUUID(), src: "vision-6.png" },
  { id: crypto.randomUUID(), src: "vision-7.png" },
];

export function GloProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [visionBoard, setVisionBoard] = useState<VisionItem[]>(DEFAULT_VISION);
  const [loaded, setLoaded] = useState(false);

  // LOAD FROM STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("glo-data");

    if (saved) {
      const parsed = JSON.parse(saved);

      setGoals(parsed.goals || []);
      setRewards(parsed.rewards || []);
      setCheckIns(parsed.checkIns || []);
      setVisionBoard(parsed.visionBoard || DEFAULT_VISION);
    }

    setLoaded(true);
  }, []);

  // SAVE TO STORAGE
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "glo-data",
      JSON.stringify({
        goals,
        rewards,
        checkIns,
        visionBoard,
      })
    );
  }, [goals, rewards, checkIns, visionBoard, loaded]);

  const stats = useMemo(() => {
    const done = checkIns.filter((c) => c.status === "Done").length;
    const total = checkIns.length;

    return {
      successRate: total ? Math.round((done / total) * 100) : 0,
      totalCheckins: done,
      currentStreak: Math.max(...goals.map((g) => g.streak), 0),
      longestStreak: Math.max(...goals.map((g) => g.streak), 0),
    };
  }, [checkIns, goals]);

  const value: GloState = {
    goals,
    rewards,
    checkIns,
    visionBoard,
    stats,
    isLoading: !loaded,

    addGoal: (goal) => {
      setGoals((prev) => [
        ...prev,
        {
          ...goal,
          id: crypto.randomUUID(),
          streak: 0,
          totalCheckins: 0,
        },
      ]);
    },

    updateGoal: (id, updates) => {
      setGoals((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
      );
    },

    deleteGoal: (id) => {
      setGoals((prev) => prev.filter((g) => g.id !== id));
      setCheckIns((prev) => prev.filter((c) => c.goalId !== id));
    },

    addReward: (title) => {
      setRewards((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          title,
          isUsed: false,
        },
      ]);
    },

    useReward: (id) => {
      setRewards((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isUsed: true } : r))
      );
    },

    deleteReward: (id) => {
      setRewards((prev) => prev.filter((r) => r.id !== id));
    },

    checkInGoal: (goalId, date, status) => {
      const newCheckin: CheckIn = {
        id: crypto.randomUUID(),
        goalId,
        date: format(date, "yyyy-MM-dd"),
        status,
      };

      setCheckIns((prev) => [...prev, newCheckin]);

      if (status === "Done") {
        setGoals((prev) =>
          prev.map((g) =>
            g.id === goalId
              ? {
                  ...g,
                  streak: g.streak + 1,
                  totalCheckins: g.totalCheckins + 1,
                }
              : g
          )
        );
      }
    },

    addVisionItem: (item) => {
      setVisionBoard((prev) => [
        ...prev,
        {
          ...item,
          id: crypto.randomUUID(),
        },
      ]);
    },

    removeVisionItem: (id) => {
      setVisionBoard((prev) => prev.filter((v) => v.id !== id));
    },
  };

  return <GloContext.Provider value={value}>{children}</GloContext.Provider>;
}

export function useGlo() {
  const context = useContext(GloContext);
  if (!context) {
    throw new Error("useGlo must be used within a GloProvider");
  }
  return context;
}
