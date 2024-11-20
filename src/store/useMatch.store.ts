import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import MatchApi from "@/api/match.api";

interface MatchStore {
  matches: Match[];
  loading: boolean;
  error: string | null;
  fetchMatches: (searchField?: string, page?: number) => Promise<void>;
  addMatch: (match: Match) => Promise<void>;
  updateMatch: (matchId: string, match: Match) => Promise<void>;
  deleteMatch: (matchId: string) => Promise<void>;
}

const useMatchStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      matches: [],
      loading: false,
      error: null,

      fetchMatches: async (searchField = "", page = 1) => {
        set({ loading: true, error: null });
        try {
          const paginatedMatches = await MatchApi.findMany(searchField, page);
          set({ matches: paginatedMatches.results });
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "An unknown error occurred" });
          }
        } finally {
          set({ loading: false });
        }
      },

      addMatch: async (match: Match) => {
        set({ loading: true, error: null });
        try {
          await MatchApi.add(match);
          set((state) => ({ matches: [...state.matches, match] }));
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "An unknown error occurred" });
          }
        } finally {
          set({ loading: false });
        }
      },

      updateMatch: async (matchId: string, match: Match) => {
        set({ loading: true, error: null });
        try {
          const updatedMatch = await MatchApi.update(matchId, match);
          set((state) => ({
            matches: state.matches.map((m) =>
              m.id === matchId ? updatedMatch : m,
            ),
          }));
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "An unknown error occurred" });
          }
        } finally {
          set({ loading: false });
        }
      },

      deleteMatch: async (matchId: string) => {
        set({ loading: true, error: null });
        try {
          await MatchApi.remove(matchId);
          set((state) => ({
            matches: state.matches.filter((match) => match.id !== matchId),
          }));
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "An unknown error occurred" });
          }
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "matchStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useMatchStore;
