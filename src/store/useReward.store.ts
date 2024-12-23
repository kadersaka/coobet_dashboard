import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Reward from "@/models/reward.model";
import RewardApi from "@/api/reward.api";
import { AxiosError } from "axios";
import { extractAxiosError } from "@/utils/functions.util";

interface RewardStore {
  rewards: Reward[];
  loading: boolean;
  error: string | null;
  fetchRewards: (searchField?: string, page?: number) => Promise<void>;
  addReward: (reward: Reward) => Promise<void>;
  updateReward: (rewardId: string, reward: Reward) => Promise<void>;
  deleteReward: (rewardId: string) => Promise<void>;
}

const useRewardStore = create<RewardStore>()(
  persist(
    (set, get) => ({
      rewards: [],
      loading: false,
      error: null,

      fetchRewards: async (searchField = "", page = 1) => {
        set({ loading: true, error: null });
        try {
          const paginatedRewards = await RewardApi.findMany(searchField, page);
          set({ rewards: paginatedRewards.results });
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            set({ error: extractAxiosError(error) });
          } else {
            set({ error: "An unknown error occurred" });
          }
        } finally {
          set({ loading: false });
        }
      },

      addReward: async (reward: Reward) => {
        set({ loading: true, error: null });
        try {
          await RewardApi.add(reward);
          set((state) => ({ rewards: [...state.rewards, reward] }));
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            set({ error: extractAxiosError(error) });
          } else {
            set({ error: "An unknown error occurred" });
          }
        } finally {
          set({ loading: false });
        }
      },

      updateReward: async (rewardId: string, reward: Reward) => {
        set({ loading: true, error: null });
        try {
          const updatedReward = await RewardApi.update(rewardId, reward);
          set((state) => ({
            rewards: state.rewards.map((r) =>
              r.id === rewardId ? updatedReward : r,
            ),
          }));
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            set({ error: extractAxiosError(error) });
          } else {
            set({ error: "An unknown error occurred" });
          }
        } finally {
          set({ loading: false });
        }
      },

      deleteReward: async (rewardId: string) => {
        set({ loading: true, error: null });
        try {
          await RewardApi.remove(rewardId);
          set((state) => ({
            rewards: state.rewards.filter((reward) => reward.id !== rewardId),
          }));
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            set({ error: extractAxiosError(error) });
          } else {
            set({ error: "An unknown error occurred" });
          }
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "rewardStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useRewardStore;
