import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { Checkin, CreateCheckinInput, CreateGoalInput, CreateRewardInput, CreateVisionItemInput, Goal, HealthStatus, Reward, Stats, UpdateGoalInput, UpdateRewardInput, VisionItem } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * Returns server health status
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List goals
 */
export declare const getListGoalsUrl: () => string;
export declare const listGoals: (options?: RequestInit) => Promise<Goal[]>;
export declare const getListGoalsQueryKey: () => readonly ["/api/goals"];
export declare const getListGoalsQueryOptions: <TData = Awaited<ReturnType<typeof listGoals>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGoals>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listGoals>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListGoalsQueryResult = NonNullable<Awaited<ReturnType<typeof listGoals>>>;
export type ListGoalsQueryError = ErrorType<unknown>;
/**
 * @summary List goals
 */
export declare function useListGoals<TData = Awaited<ReturnType<typeof listGoals>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listGoals>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a goal
 */
export declare const getCreateGoalUrl: () => string;
export declare const createGoal: (createGoalInput: CreateGoalInput, options?: RequestInit) => Promise<Goal>;
export declare const getCreateGoalMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createGoal>>, TError, {
        data: BodyType<CreateGoalInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createGoal>>, TError, {
    data: BodyType<CreateGoalInput>;
}, TContext>;
export type CreateGoalMutationResult = NonNullable<Awaited<ReturnType<typeof createGoal>>>;
export type CreateGoalMutationBody = BodyType<CreateGoalInput>;
export type CreateGoalMutationError = ErrorType<unknown>;
/**
 * @summary Create a goal
 */
export declare const useCreateGoal: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createGoal>>, TError, {
        data: BodyType<CreateGoalInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createGoal>>, TError, {
    data: BodyType<CreateGoalInput>;
}, TContext>;
/**
 * @summary Update a goal
 */
export declare const getUpdateGoalUrl: (id: number) => string;
export declare const updateGoal: (id: number, updateGoalInput: UpdateGoalInput, options?: RequestInit) => Promise<Goal>;
export declare const getUpdateGoalMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateGoal>>, TError, {
        id: number;
        data: BodyType<UpdateGoalInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateGoal>>, TError, {
    id: number;
    data: BodyType<UpdateGoalInput>;
}, TContext>;
export type UpdateGoalMutationResult = NonNullable<Awaited<ReturnType<typeof updateGoal>>>;
export type UpdateGoalMutationBody = BodyType<UpdateGoalInput>;
export type UpdateGoalMutationError = ErrorType<unknown>;
/**
 * @summary Update a goal
 */
export declare const useUpdateGoal: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateGoal>>, TError, {
        id: number;
        data: BodyType<UpdateGoalInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateGoal>>, TError, {
    id: number;
    data: BodyType<UpdateGoalInput>;
}, TContext>;
/**
 * @summary Delete a goal
 */
export declare const getDeleteGoalUrl: (id: number) => string;
export declare const deleteGoal: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteGoalMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteGoal>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteGoal>>, TError, {
    id: number;
}, TContext>;
export type DeleteGoalMutationResult = NonNullable<Awaited<ReturnType<typeof deleteGoal>>>;
export type DeleteGoalMutationError = ErrorType<unknown>;
/**
 * @summary Delete a goal
 */
export declare const useDeleteGoal: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteGoal>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteGoal>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List check-ins
 */
export declare const getListCheckinsUrl: () => string;
export declare const listCheckins: (options?: RequestInit) => Promise<Checkin[]>;
export declare const getListCheckinsQueryKey: () => readonly ["/api/checkins"];
export declare const getListCheckinsQueryOptions: <TData = Awaited<ReturnType<typeof listCheckins>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCheckins>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCheckins>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCheckinsQueryResult = NonNullable<Awaited<ReturnType<typeof listCheckins>>>;
export type ListCheckinsQueryError = ErrorType<unknown>;
/**
 * @summary List check-ins
 */
export declare function useListCheckins<TData = Awaited<ReturnType<typeof listCheckins>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCheckins>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a check-in
 */
export declare const getCreateCheckinUrl: () => string;
export declare const createCheckin: (createCheckinInput: CreateCheckinInput, options?: RequestInit) => Promise<Checkin>;
export declare const getCreateCheckinMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCheckin>>, TError, {
        data: BodyType<CreateCheckinInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createCheckin>>, TError, {
    data: BodyType<CreateCheckinInput>;
}, TContext>;
export type CreateCheckinMutationResult = NonNullable<Awaited<ReturnType<typeof createCheckin>>>;
export type CreateCheckinMutationBody = BodyType<CreateCheckinInput>;
export type CreateCheckinMutationError = ErrorType<unknown>;
/**
 * @summary Create a check-in
 */
export declare const useCreateCheckin: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createCheckin>>, TError, {
        data: BodyType<CreateCheckinInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createCheckin>>, TError, {
    data: BodyType<CreateCheckinInput>;
}, TContext>;
/**
 * @summary Delete a check-in
 */
export declare const getDeleteCheckinUrl: (id: number) => string;
export declare const deleteCheckin: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteCheckinMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCheckin>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteCheckin>>, TError, {
    id: number;
}, TContext>;
export type DeleteCheckinMutationResult = NonNullable<Awaited<ReturnType<typeof deleteCheckin>>>;
export type DeleteCheckinMutationError = ErrorType<unknown>;
/**
 * @summary Delete a check-in
 */
export declare const useDeleteCheckin: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteCheckin>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteCheckin>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List rewards
 */
export declare const getListRewardsUrl: () => string;
export declare const listRewards: (options?: RequestInit) => Promise<Reward[]>;
export declare const getListRewardsQueryKey: () => readonly ["/api/rewards"];
export declare const getListRewardsQueryOptions: <TData = Awaited<ReturnType<typeof listRewards>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listRewards>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listRewards>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListRewardsQueryResult = NonNullable<Awaited<ReturnType<typeof listRewards>>>;
export type ListRewardsQueryError = ErrorType<unknown>;
/**
 * @summary List rewards
 */
export declare function useListRewards<TData = Awaited<ReturnType<typeof listRewards>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listRewards>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a reward
 */
export declare const getCreateRewardUrl: () => string;
export declare const createReward: (createRewardInput: CreateRewardInput, options?: RequestInit) => Promise<Reward>;
export declare const getCreateRewardMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createReward>>, TError, {
        data: BodyType<CreateRewardInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createReward>>, TError, {
    data: BodyType<CreateRewardInput>;
}, TContext>;
export type CreateRewardMutationResult = NonNullable<Awaited<ReturnType<typeof createReward>>>;
export type CreateRewardMutationBody = BodyType<CreateRewardInput>;
export type CreateRewardMutationError = ErrorType<unknown>;
/**
 * @summary Create a reward
 */
export declare const useCreateReward: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createReward>>, TError, {
        data: BodyType<CreateRewardInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createReward>>, TError, {
    data: BodyType<CreateRewardInput>;
}, TContext>;
/**
 * @summary Update a reward
 */
export declare const getUpdateRewardUrl: (id: number) => string;
export declare const updateReward: (id: number, updateRewardInput: UpdateRewardInput, options?: RequestInit) => Promise<Reward>;
export declare const getUpdateRewardMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateReward>>, TError, {
        id: number;
        data: BodyType<UpdateRewardInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateReward>>, TError, {
    id: number;
    data: BodyType<UpdateRewardInput>;
}, TContext>;
export type UpdateRewardMutationResult = NonNullable<Awaited<ReturnType<typeof updateReward>>>;
export type UpdateRewardMutationBody = BodyType<UpdateRewardInput>;
export type UpdateRewardMutationError = ErrorType<unknown>;
/**
 * @summary Update a reward
 */
export declare const useUpdateReward: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateReward>>, TError, {
        id: number;
        data: BodyType<UpdateRewardInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateReward>>, TError, {
    id: number;
    data: BodyType<UpdateRewardInput>;
}, TContext>;
/**
 * @summary Delete a reward
 */
export declare const getDeleteRewardUrl: (id: number) => string;
export declare const deleteReward: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteRewardMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteReward>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteReward>>, TError, {
    id: number;
}, TContext>;
export type DeleteRewardMutationResult = NonNullable<Awaited<ReturnType<typeof deleteReward>>>;
export type DeleteRewardMutationError = ErrorType<unknown>;
/**
 * @summary Delete a reward
 */
export declare const useDeleteReward: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteReward>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteReward>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List vision board items
 */
export declare const getListVisionItemsUrl: () => string;
export declare const listVisionItems: (options?: RequestInit) => Promise<VisionItem[]>;
export declare const getListVisionItemsQueryKey: () => readonly ["/api/vision-items"];
export declare const getListVisionItemsQueryOptions: <TData = Awaited<ReturnType<typeof listVisionItems>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listVisionItems>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listVisionItems>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListVisionItemsQueryResult = NonNullable<Awaited<ReturnType<typeof listVisionItems>>>;
export type ListVisionItemsQueryError = ErrorType<unknown>;
/**
 * @summary List vision board items
 */
export declare function useListVisionItems<TData = Awaited<ReturnType<typeof listVisionItems>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listVisionItems>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a vision item
 */
export declare const getCreateVisionItemUrl: () => string;
export declare const createVisionItem: (createVisionItemInput: CreateVisionItemInput, options?: RequestInit) => Promise<VisionItem>;
export declare const getCreateVisionItemMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createVisionItem>>, TError, {
        data: BodyType<CreateVisionItemInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createVisionItem>>, TError, {
    data: BodyType<CreateVisionItemInput>;
}, TContext>;
export type CreateVisionItemMutationResult = NonNullable<Awaited<ReturnType<typeof createVisionItem>>>;
export type CreateVisionItemMutationBody = BodyType<CreateVisionItemInput>;
export type CreateVisionItemMutationError = ErrorType<unknown>;
/**
 * @summary Create a vision item
 */
export declare const useCreateVisionItem: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createVisionItem>>, TError, {
        data: BodyType<CreateVisionItemInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createVisionItem>>, TError, {
    data: BodyType<CreateVisionItemInput>;
}, TContext>;
/**
 * @summary Delete a vision item
 */
export declare const getDeleteVisionItemUrl: (id: number) => string;
export declare const deleteVisionItem: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteVisionItemMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteVisionItem>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteVisionItem>>, TError, {
    id: number;
}, TContext>;
export type DeleteVisionItemMutationResult = NonNullable<Awaited<ReturnType<typeof deleteVisionItem>>>;
export type DeleteVisionItemMutationError = ErrorType<unknown>;
/**
 * @summary Delete a vision item
 */
export declare const useDeleteVisionItem: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteVisionItem>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteVisionItem>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Aggregate stats
 */
export declare const getGetStatsUrl: () => string;
export declare const getStats: (options?: RequestInit) => Promise<Stats>;
export declare const getGetStatsQueryKey: () => readonly ["/api/stats"];
export declare const getGetStatsQueryOptions: <TData = Awaited<ReturnType<typeof getStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getStats>>>;
export type GetStatsQueryError = ErrorType<unknown>;
/**
 * @summary Aggregate stats
 */
export declare function useGetStats<TData = Awaited<ReturnType<typeof getStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map