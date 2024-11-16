/* eslint-disable @typescript-eslint/no-unused-vars */
import User from "@/models/user.model";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthenticatedUserStore {
  authenticatedUser: User | undefined;
  setAuthenticatedUser: (user: User) => void;
}

const useAuthenticatedUserStore = create<AuthenticatedUserStore>()(
  persist(
    (set, get) => ({
      authenticatedUser: undefined,
      setAuthenticatedUser: (User) => {
        set(() => ({ authenticatedUser: User }));
      },
    }),
    {
      name: "AuthenticatedUserStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthenticatedUserStore;
