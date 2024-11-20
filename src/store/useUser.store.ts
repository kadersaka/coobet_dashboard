import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import User from "@/models/user.model";
import UserApi from "@/api/user.api";

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: (searchField?: string, page?: number) => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (userId: string, user: User) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

const useUsersStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      loading: false,
      error: null,

      // Fetch users with optional search and pagination
      fetchUsers: async (searchField = "", page = 1) => {
        set({ loading: true, error: null });
        try {
          const paginatedUsers = await UserApi.findMany(searchField, page);
          set({ users: paginatedUsers.results });
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

      // Add a user
      addUser: async (user: User) => {
        set({ loading: true, error: null });
        try {
          await UserApi.add(user);
          set((state) => ({ users: [...state.users, user] }));
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

      // Update a user
      updateUser: async (userId: string, user: User) => {
        set({ loading: true, error: null });
        try {
          const updatedUser = await UserApi.update(userId, user);
          set((state) => ({
            users: state.users.map((u) => (u.id === userId ? updatedUser : u)),
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

      // Delete a user
      deleteUser: async (userId: string) => {
        set({ loading: true, error: null });
        try {
          await UserApi.remove(userId);
          set((state) => ({
            users: state.users.filter((user) => user.id !== userId),
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
      name: "usersStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUsersStore;
