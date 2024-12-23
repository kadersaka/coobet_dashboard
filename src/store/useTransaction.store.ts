import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import TransactionApi from "@/api/transaction.api";
import PaginatedTransaction from "@/models/paginated_transaction.model";
import Transaction from "@/models/transaction.model";
import App from "@/models/app.model";
import AppApi from "@/api/app.api";
import { TransactionFiterFormData } from "../interfaces/transaction.interface";
import { AxiosError } from "axios";
import { delay, extractAxiosError } from "@/utils/functions.util";

interface TransactionStore {
  paginatedTransactions: PaginatedTransaction;
  loading: boolean;
  error: string | null;
  filter: TransactionFiterFormData;
  page: number;
  pageSize: number;
  transactionsApps: App[];
  setFilter: (newFilter: TransactionFiterFormData) => void;

  setPage: (newPage: number) => void;
  increasePage: () => void;
  decreasePage: () => void;
  setPageSize: (newPageSize: number) => void;
  fetchApps: () => void;
  fetchTransactions: (
    searchField?: string,
    reference?: string,
    status?: string,
    phoneNumber?: string,
    userAppId?: string,
    mobileReference?: string,
    withdriwalCode?: string,
    userEmail?: string,
    app?: string,
    page?: number,
    pageSize?: number,
  ) => Promise<void>;
  addTransaction: (
    transaction: Transaction,
  ) => Promise<Transaction | string | undefined>;
  updateTransaction: (
    transaction: Transaction,
  ) => Promise<Transaction | string | undefined>;
  deleteTransaction: (transactionId: string) => Promise<boolean | undefined>;
}

const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      paginatedTransactions: new PaginatedTransaction(0, null, null, []),
      loading: false,
      error: null,
      page: 1,

      filter: {
        reference: "",
        status: "",
        type: "",
        countryCodeCode: "",
        phoneNumber: "",
        userAppId: "",
        mobileReference: "",
        withdriwalCode: "",
        userEmail: "",
        app: "",
      },

      pageSize: 10,
      transactionsApps: [],

      setPage: (newPage: number) => {
        set({ page: newPage });
      },

      setPageSize: (newPageSize: number) => {
        set({ pageSize: newPageSize });
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

      setFilter: (newFilter: TransactionFiterFormData) => {
        set({ filter: newFilter });
      },

      fetchTransactions: async (
        searchField = "",
        reference,
        status,
        phoneNumber,
        userAppId,
        mobileReference,
        withdriwalCode,
        userEmail,
        app,
        page,
        pageSize,
      ) => {
        set({ loading: true, error: null });
        try {
          const paginatedTransactions = await TransactionApi.findMany(
            searchField,
            reference ?? get().filter.reference,
            status ?? get().filter.status,
            phoneNumber ?? get().filter.phoneNumber,
            userAppId ?? get().filter.userAppId,
            mobileReference ?? get().filter.mobileReference,
            withdriwalCode ?? get().filter.withdriwalCode,
            userEmail ?? get().filter.userEmail,
            app ?? get().filter.app,
            page ?? get().page,
            pageSize ?? get().pageSize,
          );

          set({
            paginatedTransactions,
          });
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

      fetchApps: async () => {
        try {
          const apps = await AppApi.findMany();

          set({
            transactionsApps: apps,
          });
        } catch (error) {
          set({ error: "An unknown error occurred" });
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
          if (error instanceof AxiosError) {
            set({ error: extractAxiosError(error) });
            return extractAxiosError(error);
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
          if (error instanceof AxiosError) {
            set({ error: extractAxiosError(error) });
            return extractAxiosError(error);
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
          if (error instanceof AxiosError) {
            set({ error: extractAxiosError(error) });
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
