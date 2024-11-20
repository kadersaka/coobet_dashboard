import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import ClubApi from "@/api/club.api";
import { ClubFormData, ClubFormErrors } from "@/interfaces/club.interface";
import Club from "@/models/club.model";
import PaginatedClub from "@/models/paginated_club.model";

interface SearchStore {
  searchValue: string;
  setSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      searchValue: "",

      setSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => {
        set({ searchValue: e.target.value });
      },
    }),
    {
      name: "SearchStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useSearchStore;
