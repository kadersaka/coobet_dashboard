import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import MatchApi from "@/api/match.api";
import PaginatedMatch from "@/models/paginated_match.model";
import Match from "@/models/match.model";

interface MatchStore {
  paginatedMatches: PaginatedMatch;
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  setPage: (newPage: number) => void;
  increasePage: () => void;
  decreasePage: () => void;
  setPageSize: (newPageSize: number) => void;
  fetchMatches: (
    searchField?: string,
    page?: number,
    pageSize?: number,
  ) => Promise<void>;
  addMatch: (match: Match) => Promise<Match | undefined>;
  updateMatch: (match: Match) => Promise<Match | undefined>;
  deleteMatch: (matchId: string) => Promise<boolean | undefined>;
}

const useMatchStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      paginatedMatches: new PaginatedMatch(0, null, null, []),
      loading: false,
      error: null,
      page: 1,
      pageSize: 10,

      setPage: (newPage: number) => {
        set({ page: newPage });
      },

      increasePage: () => {
        set((state) => ({
          page: state.page + 1,
        }));
      },

      decreasePage: () => {
        set((state) => ({
          page: state.page - 1,
        }));
      },

      setPageSize: (newPageSize: number) => {
        set({ pageSize: newPageSize });
      },

      fetchMatches: async (searchField = "", page, pageSize) => {
        set({ loading: true, error: null });
        try {
          const paginatedMatches = await MatchApi.findMany(
            searchField,
            page ?? get().page,
            pageSize ?? get().pageSize,
          );

          set((state) => ({
            paginatedMatches: paginatedMatches,
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

      addMatch: async (match: Match) => {
        set({ error: null });
        try {
          const addedMatch = await MatchApi.add(match);
          set((state) => {
            return {
              paginatedMatches: new PaginatedMatch(
                state.paginatedMatches.count,
                state.paginatedMatches.next,
                state.paginatedMatches.previous,
                [...state.paginatedMatches.results, addedMatch],
              ),
            };
          });
          return addedMatch;
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "An unknown error occurred" });
          }
        }
      },

      updateMatch: async (match: Match) => {
        set({ error: null });
        try {
          const updatedMatch = await MatchApi.update(match);

          set((state) => {
            return {
              paginatedMatches: new PaginatedMatch(
                state.paginatedMatches.count,
                state.paginatedMatches.next,
                state.paginatedMatches.previous,
                state.paginatedMatches.results.map((match) =>
                  match.id === updatedMatch.id ? updatedMatch : match,
                ),
              ),
            };
          });

          return updatedMatch;
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "An unknown error occurred" });
          }
        }
      },

      deleteMatch: async (matchId: string) => {
        set({ error: null });
        try {
          await MatchApi.remove(matchId);
          set((state) => ({
            paginatedMatches: new PaginatedMatch(
              state.paginatedMatches.count - 1,
              state.paginatedMatches.next,
              state.paginatedMatches.previous,
              state.paginatedMatches.results.filter(
                (match) => match.id !== matchId,
              ),
            ),
          }));
          return true;
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "An unknown error occurred" });
          }
          return false;
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
