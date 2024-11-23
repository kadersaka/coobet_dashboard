import { useEffect, useState } from "react";

import Transaction from "@/models/transaction.model";
import useTransactionStore from "@/store/useTransaction.store";
import useInterfaceStore from "@/store/useInterface.store";
import { delay, toggleModal } from "@/utils/functions.util";
import {
  TransactionFormData,
  TransactionFormErrors,
} from "@/interfaces/transaction.interface";
import User from "@/models/user.model";
import { SelectItemProps } from "@/components/widget/Form/Select";

export const transactionsData = {
  types: [
    {
      name: "Dépôt",
      value: "deposit",
    },
    {
      name: "Remboursement Momo",
      value: "disbursements",
    },
  ] as SelectItemProps[],
  mobileReferences: [
    {
      name: "Carte",
      value: "card",
    },
    {
      name: "MTN",
      value: "mtn",
    },
    {
      name: "Moov",
      value: "moov",
    },
  ] as SelectItemProps[],
  apps: [
    {
      name: "1Xbet",
      value: "xbet",
    },
    {
      name: "1Win",
      value: "win",
    },
  ] as SelectItemProps[],
};

const useTransactionForm = (modalId: string, initialData?: Transaction) => {
  const { addTransaction, updateTransaction } = useTransactionStore();

  const [formData, setFormData] = useState<TransactionFormData>({
    amount: initialData?.amount ?? 1000,
    typeTrans:
      initialData?.typeTrans != null
        ? (transactionsData.types.find(
            (type) => type.value == initialData?.typeTrans,
          )?.name ?? "Remboursement Momo")
        : "Remboursement Momo",
    phoneNumber: initialData?.phoneNumber ?? "",
    mobileReference:
      initialData?.mobileReference != null
        ? (transactionsData.mobileReferences.find(
            (mobRef) => mobRef.value == initialData?.mobileReference,
          )?.name ?? "Moov")
        : "Moov",
    app:
      initialData?.app != null
        ? (transactionsData.apps.find(
            (mobRef) => mobRef.value == initialData?.app,
          )?.name ?? "1Win")
        : "1Win",
    userAppId: initialData?.userAppId ?? "",
  });

  const [formErrors, setFormErrors] = useState<TransactionFormErrors>({
    amount: null,
    typeTrans: null,
    mobileReference: null,
    phoneNumber: null,
    app: null,
    userAppId: null,
  });

  const [processing, setProcessing] = useState<boolean>(false);

  const resetFormData = () => {
    setFormData({
      amount: 1000,
      typeTrans: "Remboursement Momo",
      mobileReference: "Moov",
      phoneNumber: "",
      app: "1Win",
    });
  };

  const resetFormErrors = () => {
    setFormErrors({
      amount: null,
      typeTrans: null,
      mobileReference: null,
      phoneNumber: null,
      app: null,
      userAppId: null,
    });
  };

  const setActionResultMessage = useInterfaceStore(
    (state) => state.setActionResultMessage,
  );

  const onInputDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onPhoneNumberChange = (value: string) => {
    setFormData({
      ...formData,
      phoneNumber: value,
    });
  };

  const validateForm = () => {
    const errors: TransactionFormErrors = {
      amount: null,
      typeTrans: null,
      mobileReference: null,
      phoneNumber: null,
      app: null,
      userAppId: null,
    };

    if (formData.amount < 1000) {
      errors.amount = "Le montant est doit être supérieur ou égal à 1000";
    }

    if (formData.typeTrans == "Dépôt" && !formData.userAppId?.trim()) {
      errors.typeTrans = "L'ID de l'application est requis";
    }

    setFormErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setProcessing(true);

      try {
        const transaction = new Transaction(
          Number(formData.amount),
          new User("user", "user"),
          initialData?.reference ?? "",
          transactionsData.types.find(
            (item) => item.name === formData.typeTrans,
          )?.value ?? "disbursements",
          initialData?.status ?? "pending",
          formData.phoneNumber,
          initialData?.country ?? "Bénin",
          transactionsData.mobileReferences.find(
            (item) => item.name === formData.mobileReference,
          )?.value ?? "moov",
          initialData?.createdAt ?? new Date(),
          transactionsData.apps.find((item) => item.name === formData.app)
            ?.value ?? "win",
          formData.userAppId,
          initialData?.withdrawalCode,
          initialData?.id,
        );

        if (transaction.id) {
          const updatedTransaction = await updateTransaction(transaction);

          if (updatedTransaction) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage(
              "La transaction a été mise à jour avec succès.",
            );
            toggleModal("action-result-message");
            await delay({ milliseconds: 1000 });
            toggleModal("action-result-message");
          } else {
            setActionResultMessage("Une erreur s'est produite.");
            toggleModal("action-result-message");
          }
        } else {
          const newTransaction = await addTransaction(transaction);

          if (newTransaction) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage("La transaction a été ajoutée avec succès.");
            toggleModal("action-result-message");
            await delay({ milliseconds: 1000 });
            toggleModal("action-result-message");
          } else {
            setActionResultMessage("Une erreur s'est produite.");
            toggleModal("action-result-message");
          }
        }
      } catch (error) {
        console.error("Error handling form submission:", error);
      }

      setProcessing(false);
    }
  };

  return {
    processing,
    formData,
    formErrors,
    resetFormData,
    resetFormErrors,
    onInputDataChange,
    onPhoneNumberChange,
    onFormSubmit,
  };
};

export default useTransactionForm;
