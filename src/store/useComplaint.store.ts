import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Complaint from "@/models/complaint.model";
import ComplaintApi from "@/api/complaint.api";

interface ComplaintStore {
  complaints: Complaint[];
  loading: boolean;
  error: string | null;
  fetchComplaints: (searchField?: string, page?: number) => Promise<void>;
  addComplaint: (complaint: Complaint) => Promise<void>;
  updateComplaint: (complaintId: string, complaint: Complaint) => Promise<void>;
  deleteComplaint: (complaintId: string) => Promise<void>;
}

const useComplaintStore = create<ComplaintStore>()(
  persist(
    (set, get) => ({
      complaints: [],
      loading: false,
      error: null,

      // Fetch complaints with optional search and pagination
      fetchComplaints: async (searchField = "", page = 1) => {
        set({ loading: true, error: null });
        try {
          const paginatedComplaints = await ComplaintApi.findMany(
            searchField,
            page,
          );
          set({ complaints: paginatedComplaints.results });
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

      // Add a complaint
      addComplaint: async (complaint: Complaint) => {
        set({ loading: true, error: null });
        try {
          await ComplaintApi.add(complaint);
          set((state) => ({ complaints: [...state.complaints, complaint] }));
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

      // Update a complaint
      updateComplaint: async (complaintId: string, complaint: Complaint) => {
        set({ loading: true, error: null });
        try {
          const updatedComplaint = await ComplaintApi.update(
            complaintId,
            complaint,
          );
          set((state) => ({
            complaints: state.complaints.map((c) =>
              c.id === complaintId ? updatedComplaint : c,
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

      // Delete a complaint
      deleteComplaint: async (complaintId: string) => {
        set({ loading: true, error: null });
        try {
          await ComplaintApi.remove(complaintId);
          set((state) => ({
            complaints: state.complaints.filter(
              (complaint) => complaint.id !== complaintId,
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
      name: "complaintStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useComplaintStore;
