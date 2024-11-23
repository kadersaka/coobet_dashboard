import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import TransactionApi from "@/api/transaction.api";
import PaginatedTransaction from "@/models/paginated_transaction.model";
import Transaction from "@/models/transaction.model";

interface TransactionStore {
  paginatedTransactions: PaginatedTransaction;
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  setPage: (newPage: number) => void;
  increasePage: () => void;
  decreasePage: () => void;
  setPageSize: (newPageSize: number) => void;
  fetchTransactions: (
    searchField?: string,
    page?: number,
    pageSize?: number,
  ) => Promise<void>;
  addTransaction: (
    transaction: Transaction,
  ) => Promise<Transaction | undefined>;
  updateTransaction: (
    transaction: Transaction,
  ) => Promise<Transaction | undefined>;
  deleteTransaction: (transactionId: string) => Promise<boolean | undefined>;
}

const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      paginatedTransactions: new PaginatedTransaction(0, null, null, []),
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

      fetchTransactions: async (searchField = "", page, pageSize) => {
        set({ loading: true, error: null });
        try {
          const paginatedTransactions = await TransactionApi.findMany(
            searchField,
            page ?? get().page,
            pageSize ?? get().pageSize,
          );

          set({
            paginatedTransactions,
          });
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
        set({ error: null });
        try {
          const addedTransaction = await TransactionApi.add(transaction);
          set((state) => {
            const transactionsList = state.paginatedTransactions.results;

            transactionsList.push(addedTransaction);

            return {
              paginatedTransactions: new PaginatedTransaction(
                state.paginatedTransactions.count,
                state.paginatedTransactions.next,
                state.paginatedTransactions.previous,
                transactionsList,
              ),
            };
          });
          return addedTransaction;
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "An unknown error occurred" });
          }
        }
      },

      updateTransaction: async (transaction: Transaction) => {
        set({ error: null });
        try {
          const updatedTransaction = await TransactionApi.update(transaction);

          set((state) => {
            const transactionsList = state.paginatedTransactions.results;

            const unUpdatedTransactionIndex = transactionsList.findIndex(
              (t) => t.id === transaction.id,
            );

            if (unUpdatedTransactionIndex !== -1) {
              transactionsList[unUpdatedTransactionIndex] = updatedTransaction;
            }

            return {
              paginatedTransactions: new PaginatedTransaction(
                state.paginatedTransactions.count,
                state.paginatedTransactions.next,
                state.paginatedTransactions.previous,
                transactionsList,
              ),
            };
          });

          return updatedTransaction;
        } catch (error: unknown) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: "An unknown error occurred" });
          }
        }
      },

      deleteTransaction: async (transactionId: string) => {
        set({ error: null });
        try {
          await TransactionApi.remove(transactionId);
          set((state) => ({
            paginatedTransactions: new PaginatedTransaction(
              state.paginatedTransactions.count,
              state.paginatedTransactions.next,
              state.paginatedTransactions.previous,
              state.paginatedTransactions.results.filter(
                (transaction) => transaction.id !== transactionId,
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
      name: "transactionStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useTransactionStore;
