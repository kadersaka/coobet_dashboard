"use client";

import { FC, useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultipleActionButton from "@/components/widget/Form/EditDeleteButton";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AppButton from "@/components/widget/Form/Button";
import {
  delay,
  toggleModal,
  transactionMobileReference,
  transactionStatus,
  transactionType,
} from "@/utils/functions.util";
import useTransactionStore from "@/store/useTransaction.store";
import ActionResult from "@/components/widget/Form/ActionResultMessage";
import useSearchStore from "@/store/useSearchStore.store";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import PageCounter from "@/components/common/PageCounter";
import useTransactionForm, {
  transactionsData,
} from "@/hooks/forms/useTransactionForm";
import TransactionForm from "@/components/widget/Forms/TransactionForm";
import { Filter } from "lucide-react";
import TransactionFilterForm from "@/components/widget/Forms/TransactionFilterForm";
import useTransactionFilterForm from "@/hooks/forms/useTransactionFilter.hook";

interface TransactionsPageProps {}

const TransactionsPage: FC<TransactionsPageProps> = () => {
  const { searchValue } = useSearchStore();
  const { resetFormData, resetFormErrors } =
    useTransactionForm("transaction-form");

  const {
    paginatedTransactions,
    page,
    loading,
    fetchTransactions,
    transactionsApps,
    fetchApps,
    filter,
    increasePage,
    decreasePage,
  } = useTransactionStore();

  useEffect(() => {
    fetchTransactions(searchValue);
  }, [fetchTransactions, searchValue]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  return (
    <>
      <Breadcrumb
        pageName="Transactions"
        onClick={() => fetchTransactions(searchValue)}
      >
        <AppButton
          name="Ajouter"
          width="w-[150px]"
          onClick={() => {
            resetFormErrors();
            resetFormData();

            toggleModal("transaction-form");
          }}
        />
      </Breadcrumb>

      <TransactionFilterForm id="transaction-filter-form" filter={filter} />

      <TransactionForm id="transaction-form" />

      <div
        className="my-10 hidden w-full  justify-end hover:cursor-pointer md:flex"
        onClick={() => {
          toggleModal("transaction-filter-form");
        }}
      >
        <span className="mr-4 font-medium text-black dark:text-white">
          Filtre
        </span>
        <Filter className="fill-primary dark:fill-boxdark" />
      </div>

      <ActionResult />

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[500px] rounded-sm text-black dark:text-white">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-bodydark1 text-left  font-bold text-boxdark dark:bg-meta-4 dark:text-white lg:grid-cols-5 xl:grid-cols-7 ">
            {[
              "Référence",
              "Numéro",
              "Réseau",
              "Utilisateur",
              "Montant",
              "Type",
              "Statut",
            ].map((column, index) => (
              <div
                key={index}
                className={`flex-1 px-5 py-4 lg:px-7.5 2xl:px-11 ${index === 2 || index === 5 ? "hidden xl:table-cell" : ""} ${index === 1 ? "hidden lg:table-cell" : ""} `}
              >
                {column}
              </div>
            ))}
          </div>

          {/* Table Body */}
          {loading ? (
            <div className="min-h-fit">
              <ProcessingLoader />
            </div>
          ) : (
            <div className="w-full  bg-white dark:bg-boxdark">
              {paginatedTransactions?.results?.map((transaction, index) => (
                <div
                  key={index}
                  className={`  grid w-full grid-cols-4 items-center border-t border-[#EEEEEE] dark:border-strokedark lg:grid-cols-5 xl:grid-cols-7 `}
                >
                  {/* Transaction Reference */}
                  <div className="flex overflow-hidden px-5 py-4 lg:px-7.5 2xl:px-11">
                    {transaction.reference}
                  </div>

                  {/* Transaction Phone */}
                  <div className=" hidden px-5 py-4 lg:table-cell lg:px-7.5 2xl:px-11">
                    {transaction.phoneNumber}
                  </div>

                  {/* Transaction Mobile Reference */}
                  <div className="hidden px-5 py-4 lg:px-7.5 xl:table-cell 2xl:px-11">
                    {transactionMobileReference(transaction.mobileReference)}
                  </div>

                  {/* Transaction Name */}
                  <div className=" px-5 py-4 lg:px-7.5 2xl:px-11">
                    {transaction.user?.lastname ?? "Lastname"}{" "}
                    {transaction.user?.firstname ?? "Firstname"}
                  </div>

                  {/* Transaction Amount */}
                  <div className=" px-5 py-4 lg:px-7.5 2xl:px-11">
                    {transaction.amount}
                  </div>

                  {/* Transaction Type */}
                  <div className="hidden px-5 py-4 lg:px-7.5 xl:table-cell 2xl:px-11">
                    {transactionType(transaction.typeTrans)}
                  </div>

                  {/* Transaction Status */}
                  <div className=" px-5 py-4 lg:px-7.5 2xl:px-11">
                    {transactionStatus(transaction.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="my-5 flex items-center justify-evenly xsm:my-10 md:my-8">
        {paginatedTransactions.previous ? (
          <AppButton
            name="Précédent"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              decreasePage();
              fetchTransactions(searchValue);
            }}
          />
        ) : (
          <span className="w-1"></span>
        )}

        <PageCounter
          totalPage={paginatedTransactions.count}
          currentPage={page}
        />

        {paginatedTransactions.next ? (
          <AppButton
            name="Suivant"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              increasePage();
              fetchTransactions(searchValue);
            }}
          />
        ) : (
          <span className="w-1"></span>
        )}
      </div>
    </>
  );
};

export default TransactionsPage;
