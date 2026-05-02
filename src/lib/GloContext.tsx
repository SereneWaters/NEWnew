import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";

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

const cap = (s: string) => (s.length ? s[0].toUpperCase() + s.slice(1) : s);

const DEFAULT_VISION = [
  { imageUrl: "vision-1.png" },
  { imageUrl: "vision-2.png" },
  { imageUrl: "vision-3.png" },
  { imageUrl: "vision-4.png" },
  { text: "it's already yours" },
  { imageUrl: "vision-5.png" },
  { imageUrl: "vision-6.png" },
  { imageUrl: "vision-7.png" },
];

export function GloProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [visionBoard, setVisionBoard] = useState<VisionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const seededRef = useRef(false);

  const loadData = async () => {
    setIsLoading(true);

    const [goalsRes, rewardsRes, checkinsRes, visionRes] = await Promise.all([
      supabase.from("goals").select("*").order("created_at"),
      supabase.from("rewards").select("*").order("created_at"),
      supabase.from("checkins").select("*").order("created_at"),
      supabase.from("vision_items").select("*").order("position"),
    ]);

    const loadedCheckins =
      (checkinsRes.data ?? []).map((c) => ({
        id: String(c.id),
        goalId: String(c.goal_id),
        date: c.date,
        status: cap(c.status) as "Done" | "Fail",
      }));

    setCheckIns(loadedCheckins);

    setGoals(
      (goalsRes.data ?? []).map((g) => ({
        id: String(g.id),
        title: g.title,
        description: g.description ?? "",
        frequency: cap(g.frequency) as Goal["frequency"],
        rewardId: g.reward_id ? String(g.reward_id) : undefined,
        status: cap(g.status) as Goal["status"],
        streak: g.streak ?? 0,
        totalCheckins: loadedCheckins.filter(
          (c) => c.goalId === String(g.id) && c.status === "Done"
        ).length,
      }))
    );

    setRewards(
      (rewardsRes.data ?? []).map((r) => ({
        id: String(r.id),
        title: r.name,
        isUsed: r.used,
      }))
    );

    const loadedVision =
      (visionRes.data ?? []).map((v) => ({
        id: String(v.id),
        src: v.image_url ?? undefined,
        text: v.text ?? undefined,
      }));

    setVisionBoard(loadedVision);

    if (!seededRef.current && loadedVision.length === 0) {
      seededRef.current = true;

      await supabase.from("vision_items").insert(
        DEFAULT_VISION.map((v, i) => ({
          position: i,
          image_url: v.imageUrl ?? null,
          text: v.text ?? null,
        }))
      );

      return loadData();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const stats = useMemo(() => {
    const done = checkIns.filter((c) => c.status === "Done").length;
    const total = checkIns.length;

    return {
      successRate: total ? Math.round((done / total) * 100) : 0,
      totalCheckins: total,
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
    isLoading,

    addGoal: async (goal) => {
      await supabase.from("goals").insert({
        title: goal.title,
        description: goal.description || null,
        frequency: goal.frequency.toLowerCase(),
        reward_id: goal.rewardId ? Number(goal.rewardId) : null,
        status: "active",
      });
      loadData();
    },

    updateGoal: async (id, updates) => {
      await supabase
        .from("goals")
        .update({
          ...(updates.title !== undefined && { title: updates.title }),
          ...(updates.description !== undefined && { description: updates.description }),
          ...(updates.frequency !== undefined && {
            frequency: updates.frequency.toLowerCase(),
          }),
          ...(updates.rewardId !== undefined && {
            reward_id: updates.rewardId ? Number(updates.rewardId) : null,
          }),
          ...(updates.status !== undefined && {
            status: updates.status.toLowerCase(),
          }),
        })
        .eq("id", Number(id));

      loadData();
    },

    deleteGoal: async (id) => {
      await supabase.from("goals").delete().eq("id", Number(id));
      loadData();
    },

    addReward: async (title) => {
      await supabase.from("rewards").insert({ name: title });
      loadData();
    },

    useReward: async (id) => {
      await supabase.from("rewards").update({ used: true }).eq("id", Number(id));
      loadData();
    },

    deleteReward: async (id) => {
      await supabase.from("rewards").delete().eq("id", Number(id));
      loadData();
    },

    checkInGoal: async (goalId, date, status) => {
      await supabase.from("checkins").insert({
        goal_id: Number(goalId),
        date: format(date, "yyyy-MM-dd"),
        status: status.toLowerCase(),
      });
      loadData();
    },

    addVisionItem: async (item) => {
      await supabase.from("vision_items").insert({
        position: visionBoard.length,
        image_url: item.src ?? null,
        text: item.text ?? null,
      });
      loadData();
    },

    removeVisionItem: async (id) => {
      await supabase.from("vision_items").delete().eq("id", Number(id));
      loadData();
    },
  };

  return <GloContext.Provider value={value}>{children}</GloContext.Provider>;
}

export function useGlo() {
  const context = useContext(GloContext);
  if (!context) throw new Error("useGlo must be used within a GloProvider");
  return context;
}
