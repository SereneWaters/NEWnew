import React, { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListGoals,
  useListCheckins,
  useListRewards,
  useListVisionItems,
  useGetStats,
  useCreateGoal,
  useUpdateGoal,
  useDeleteGoal,
  useCreateCheckin,
  useCreateReward,
  useUpdateReward,
  useDeleteReward,
  useCreateVisionItem,
  useDeleteVisionItem,
  getListGoalsQueryKey,
  getListCheckinsQueryKey,
  getListRewardsQueryKey,
  getListVisionItemsQueryKey,
  getGetStatsQueryKey,
} from "@workspace/api-client-react";

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

const cap = (s: string) =>
  s.length ? s[0].toUpperCase() + s.slice(1) : s;

const DEFAULT_VISION: { imageUrl?: string; text?: string }[] = [
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
  const qc = useQueryClient();

  const goalsQ = useListGoals();
  const checkinsQ = useListCheckins();
  const rewardsQ = useListRewards();
  const visionQ = useListVisionItems();
  const statsQ = useGetStats();

  const invalidateAll = () => {
    qc.invalidateQueries({ queryKey: getListGoalsQueryKey() });
    qc.invalidateQueries({ queryKey: getListCheckinsQueryKey() });
    qc.invalidateQueries({ queryKey: getListRewardsQueryKey() });
    qc.invalidateQueries({ queryKey: getListVisionItemsQueryKey() });
    qc.invalidateQueries({ queryKey: getGetStatsQueryKey() });
  };

  const createGoalM = useCreateGoal({
    mutation: { onSuccess: invalidateAll },
  });
  const updateGoalM = useUpdateGoal({
    mutation: { onSuccess: invalidateAll },
  });
  const deleteGoalM = useDeleteGoal({
    mutation: { onSuccess: invalidateAll },
  });
  const createCheckinM = useCreateCheckin({
    mutation: { onSuccess: invalidateAll },
  });
  const createRewardM = useCreateReward({
    mutation: { onSuccess: invalidateAll },
  });
  const updateRewardM = useUpdateReward({
    mutation: { onSuccess: invalidateAll },
  });
  const deleteRewardM = useDeleteReward({
    mutation: { onSuccess: invalidateAll },
  });
  const createVisionM = useCreateVisionItem({
    mutation: { onSuccess: invalidateAll },
  });
  const deleteVisionM = useDeleteVisionItem({
    mutation: { onSuccess: invalidateAll },
  });

  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current) return;
    if (!visionQ.isSuccess) return;
    if ((visionQ.data ?? []).length > 0) {
      seededRef.current = true;
      return;
    }
    seededRef.current = true;
    DEFAULT_VISION.forEach((v, i) => {
      createVisionM.mutate({
        data: {
          position: i,
          imageUrl: v.imageUrl ?? null,
          text: v.text ?? null,
        },
      });
    });
  }, [visionQ.isSuccess, visionQ.data, createVisionM]);

  const goals: Goal[] = useMemo(() => {
    const checkins = checkinsQ.data ?? [];
    return (goalsQ.data ?? []).map((g) => {
      const total = checkins.filter(
        (c) => c.goalId === g.id && c.status === "done",
      ).length;
      return {
        id: String(g.id),
        title: g.title,
        description: g.description ?? "",
        frequency: cap(g.frequency) as Goal["frequency"],
        rewardId: g.rewardId != null ? String(g.rewardId) : undefined,
        status: cap(g.status) as Goal["status"],
        streak: g.streak,
        totalCheckins: total,
      };
    });
  }, [goalsQ.data, checkinsQ.data]);

  const rewards: Reward[] = useMemo(
    () =>
      (rewardsQ.data ?? []).map((r) => ({
        id: String(r.id),
        title: r.name,
        isUsed: r.used,
      })),
    [rewardsQ.data],
  );

  const checkIns: CheckIn[] = useMemo(
    () =>
      (checkinsQ.data ?? []).map((c) => ({
        id: String(c.id),
        goalId: String(c.goalId),
        date: String(c.date).slice(0, 10),
        status: cap(c.status) as "Done" | "Fail",
      })),
    [checkinsQ.data],
  );

  const visionBoard: VisionItem[] = useMemo(
    () =>
      (visionQ.data ?? []).map((v) => ({
        id: String(v.id),
        src: v.imageUrl ?? undefined,
        text: v.text ?? undefined,
      })),
    [visionQ.data],
  );

  const stats = useMemo(
    () => ({
      successRate: statsQ.data?.successRate ?? 0,
      totalCheckins: statsQ.data?.totalCheckins ?? 0,
      currentStreak: statsQ.data?.currentStreak ?? 0,
      longestStreak: statsQ.data?.longestStreak ?? 0,
    }),
    [statsQ.data],
  );

  const value: GloState = {
    goals,
    rewards,
    checkIns,
    visionBoard,
    stats,
    isLoading:
      goalsQ.isLoading ||
      checkinsQ.isLoading ||
      rewardsQ.isLoading ||
      visionQ.isLoading,
    addGoal: (goal) => {
      createGoalM.mutate({
        data: {
          title: goal.title,
          description: goal.description || null,
          frequency: goal.frequency.toLowerCase() as
            | "daily"
            | "weekly"
            | "custom",
          rewardId: goal.rewardId ? Number(goal.rewardId) : null,
        },
      });
    },
    updateGoal: (id, updates) => {
      updateGoalM.mutate({
        id: Number(id),
        data: {
          ...(updates.title !== undefined ? { title: updates.title } : {}),
          ...(updates.description !== undefined
            ? { description: updates.description }
            : {}),
          ...(updates.frequency !== undefined
            ? {
                frequency: updates.frequency.toLowerCase() as
                  | "daily"
                  | "weekly"
                  | "custom",
              }
            : {}),
          ...(updates.rewardId !== undefined
            ? {
                rewardId: updates.rewardId ? Number(updates.rewardId) : null,
              }
            : {}),
          ...(updates.status !== undefined
            ? {
                status: updates.status.toLowerCase() as
                  | "active"
                  | "completed"
                  | "archived",
              }
            : {}),
        },
      });
    },
    deleteGoal: (id) => {
      deleteGoalM.mutate({ id: Number(id) });
    },
    addReward: (title) => {
      createRewardM.mutate({ data: { name: title } });
    },
    useReward: (id) => {
      updateRewardM.mutate({ id: Number(id), data: { used: true } });
    },
    deleteReward: (id) => {
      deleteRewardM.mutate({ id: Number(id) });
    },
    checkInGoal: (goalId, date, status) => {
      createCheckinM.mutate({
        data: {
          goalId: Number(goalId),
          date: format(date, "yyyy-MM-dd"),
          status: status.toLowerCase() as "done" | "fail",
        },
      });
    },
    addVisionItem: (item) => {
      createVisionM.mutate({
        data: {
          position: visionBoard.length,
          imageUrl: item.src ?? null,
          text: item.text ?? null,
        },
      });
    },
    removeVisionItem: (id) => {
      deleteVisionM.mutate({ id: Number(id) });
    },
  };

  return <GloContext.Provider value={value}>{children}</GloContext.Provider>;
}

export function useGlo() {
  const context = useContext(GloContext);
  if (!context) throw new Error("useGlo must be used within a GloProvider");
  return context;
}
