import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Transaction from "@/models/transaction.model";
import TransactionApi from "@/api/transaction.api";

interface TransactionStore {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactions: (searchField?: string, page?: number) => Promise<void>;
  addTransaction: (transaction: Transaction) => Promise<void>;
  updateTransaction: (
    transactionId: string,
    transaction: Transaction,
  ) => Promise<void>;
  deleteTransaction: (transactionId: string) => Promise<void>;
}

const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      loading: false,
      error: null,

      fetchTransactions: async (searchField = "", page = 1) => {
        set({ loading: true, error: null });
        try {
          const paginatedTransactions = await TransactionApi.findMany(
            searchField,
            page,
          );
          set({ transactions: paginatedTransactions.results });
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

      addTransaction: async (transaction: Transaction) => {
        set({ loading: true, error: null });
        try {
          await TransactionApi.add(transaction);
          set((state) => ({
            transactions: [...state.transactions, transaction],
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

      updateTransaction: async (
        transactionId: string,
        transaction: Transaction,
      ) => {
        set({ loading: true, error: null });
        try {
          const updatedTransaction = await TransactionApi.update(
            transactionId,
            transaction,
          );
          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.id === transactionId ? updatedTransaction : t,
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

      deleteTransaction: async (transactionId: string) => {
        set({ loading: true, error: null });
        try {
          await TransactionApi.remove(transactionId);
          set((state) => ({
            transactions: state.transactions.filter(
              (transaction) => transaction.id !== transactionId,
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
      name: "transactionStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useTransactionStore;
