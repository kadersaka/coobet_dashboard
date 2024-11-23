"use client";

import { FC, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultipleActionButton from "@/components/widget/Form/EditDeleteButton";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AppButton from "@/components/widget/Form/Button";
import {
  toggleModal,
  transactionMobileReference,
  transactionStatus,
  transactionType,
} from "@/utils/functions.util";
import useTransactionStore from "@/store/useTransaction.store";
import EditDeleteButton from "@/components/widget/Form/EditDeleteButton";
import Image from "next/image";
import DeletionConfirmation from "@/components/widget/Form/DeletionConfirmation";
import ActionResult from "@/components/widget/Form/ActionResultMessage";
import useSearchStore from "@/store/useSearchStore.store";
import Loader from "@/components/common/Loader";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import PageCounter from "@/components/common/PageCounter";
import useTransactionForm from "@/hooks/forms/useTransactionForm";
import TransactionForm from "@/components/widget/Forms/TransactionForm";

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
    deleteTransaction,
    increasePage,
    decreasePage,
  } = useTransactionStore();

  useEffect(() => {
    fetchTransactions(searchValue);
  }, [fetchTransactions, searchValue]);

  return (
    <DefaultLayout>
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

      <TransactionForm id="transaction-form" />

      <ActionResult />

      <div className="overflow-x-auto' max-w-full">
        <div className="min-w-[1170px]' rounded-sm text-black dark:text-white">
          {/* Table Header */}
          <div className="flex   bg-bodydark1 text-left font-bold text-boxdark dark:bg-meta-4 dark:text-white ">
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
                className={`flex-1 px-5 py-4 lg:px-7.5 2xl:px-11 `}
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
                  className={` flex w-full items-center border-t border-[#EEEEEE] dark:border-strokedark  `}
                >
                  {/* Transaction Reference */}
                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    {transaction.reference}
                  </div>

                  {/* Transaction Phone */}
                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    {transaction.phoneNumber}
                  </div>

                  {/* Transaction Mobile Reference */}
                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    {transactionMobileReference(transaction.mobileReference)}
                  </div>

                  {/* Transaction Name */}
                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    {transaction.user.lastname} {transaction.user.firstname}
                  </div>

                  {/* Transaction Amount */}
                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    {transaction.amount}
                  </div>

                  {/* Transaction Type */}
                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    {transactionType(transaction.typeTrans)}
                  </div>

                  {/* Transaction Status */}
                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
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
    </DefaultLayout>
  );
};

export default TransactionsPage;
