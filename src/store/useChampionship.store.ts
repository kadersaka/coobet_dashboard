import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import ChampionshipApi from "@/api/championship.api";

interface ChampionshipStore {
  championships: Championship[];
  loading: boolean;
  error: string | null;
  fetchChampionships: (searchField?: string, page?: number) => Promise<void>;
  addChampionship: (championship: Championship) => Promise<void>;
  updateChampionship: (
    championshipId: string,
    championship: Championship,
  ) => Promise<void>;
  deleteChampionship: (championshipId: string) => Promise<void>;
}

const useChampionshipStore = create<ChampionshipStore>()(
  persist(
    (set, get) => ({
      championships: [],
      loading: false,
      error: null,

      fetchChampionships: async (searchField: string = "", page = 1) => {
        set({ loading: true, error: null });
        try {
          const paginatedChampionships = await ChampionshipApi.findMany(
            searchField,
            page,
          );
          set({ championships: paginatedChampionships.results });
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

      addChampionship: async (championship: Championship) => {
        set({ loading: true, error: null });
        try {
          await ChampionshipApi.add(championship);
          set((state) => ({
            championships: [...state.championships, championship],
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

      updateChampionship: async (
        championshipId: string,
        championship: Championship,
      ) => {
        set({ loading: true, error: null });
        try {
          const updatedChampionship = await ChampionshipApi.update(
            championshipId,
            championship,
          );
          set((state) => ({
            championships: state.championships.map((c) =>
              c.id === championshipId ? updatedChampionship : c,
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

      deleteChampionship: async (championshipId: string) => {
        set({ loading: true, error: null });
        try {
          await ChampionshipApi.remove(championshipId);
          set((state) => ({
            championships: state.championships.filter(
              (championship) => championship.id !== championshipId,
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
    }),
    {
      name: "championshipStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useChampionshipStore;
