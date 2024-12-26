import {
  SettingFormData,
  SettingFormErrors,
} from "@/interfaces/setting.interface";
import Setting from "@/models/Setting.model";
import useSettingStore from "@/store/useSetting.store";
import useInterfaceStore from "@/store/useInterface.store";
import { delay, toggleModal } from "@/utils/functions.util";
import { useEffect, useState } from "react";

const useSettingForm = (modalId: string, initialData?: Setting) => {
  const { addSetting, updateSetting, fetchSettings } = useSettingStore();

  const [formData, setFormData] = useState<SettingFormData>({
    id: initialData?.id ?? undefined,
    minimumDeposit: initialData?.minimumDeposit ?? "",
    minimumWithdrawal: initialData?.minimumWithdrawal ?? "",
    bonusPercent: initialData?.bonusPercent ?? "",
    moovPassword: initialData?.moovPassword ?? "",
    mtnPassword: initialData?.mtnPassword ?? "",
    sbinPassword: initialData?.sbinPassword ?? "",
    cardPassword: initialData?.cardPassword ?? "",
    mtnUrl: initialData?.mtnUrl ?? "",
    moovUrl: initialData?.moovUrl ?? "",
    cardUrl: initialData?.cardUrl ?? "",
    sbinUrl: initialData?.sbinUrl ?? "",
    hash: initialData?.hash ?? "",
    cashDeskId: initialData?.cashDeskId ?? "",
    cashierPass: initialData?.cashierPass ?? "",
    moovCustomer: initialData?.moovCustomer ?? "",
    mtnCustomer: initialData?.mtnCustomer ?? "",
    cardCustomer: initialData?.cardCustomer ?? "",
    sbinCustomer: initialData?.sbinCustomer ?? "",
    moovDisUrl: initialData?.moovDisUrl ?? "",
    mtnDisUrl: initialData?.mtnDisUrl ?? "",
    rewardMiniWithdrawal: initialData?.rewardMiniWithdrawal ?? "",
    qosicUsername: initialData?.qosicUsername ?? "",
    whatsappPhoneIndi: initialData?.whatsappPhoneIndi ?? "",
    whatsappPhone: initialData?.whatsappPhone ?? "",
    subscriptionPrice: initialData?.subscriptionPrice ?? "",
  });

  const [formErrors, setFormErrors] = useState<SettingFormErrors>({
    minimumDeposit: null,
    minimumWithdrawal: null,
    bonusPercent: null,
    moovPassword: null,
    mtnPassword: null,
    sbinPassword: null,
    cardPassword: null,
    mtnUrl: null,
    moovUrl: null,
    cardUrl: null,
    sbinUrl: null,
    hash: null,
    cashDeskId: null,
    cashierPass: null,
    moovCustomer: null,
    mtnCustomer: null,
    cardCustomer: null,
    sbinCustomer: null,
    moovDisUrl: null,
    mtnDisUrl: null,
    rewardMiniWithdrawal: null,
    qosicUsername: null,
    whatsappPhoneIndi: null,
    whatsappPhone: null,
    subscriptionPrice: null,
  });

  const [processing, setProcessing] = useState<boolean>(false);

  const resetFormData = () => {
    setFormData({
      id: initialData?.id ?? undefined,
      minimumDeposit: initialData?.minimumDeposit ?? "",
      minimumWithdrawal: initialData?.minimumWithdrawal ?? "",
      bonusPercent: initialData?.bonusPercent ?? "",
      moovPassword: initialData?.moovPassword ?? "",
      mtnPassword: initialData?.mtnPassword ?? "",
      sbinPassword: initialData?.sbinPassword ?? "",
      cardPassword: initialData?.cardPassword ?? "",
      mtnUrl: initialData?.mtnUrl ?? "",
      moovUrl: initialData?.moovUrl ?? "",
      cardUrl: initialData?.cardUrl ?? "",
      sbinUrl: initialData?.sbinUrl ?? "",
      hash: initialData?.hash ?? "",
      cashDeskId: initialData?.cashDeskId ?? "",
      cashierPass: initialData?.cashierPass ?? "",
      moovCustomer: initialData?.moovCustomer ?? "",
      mtnCustomer: initialData?.mtnCustomer ?? "",
      cardCustomer: initialData?.cardCustomer ?? "",
      sbinCustomer: initialData?.sbinCustomer ?? "",
      moovDisUrl: initialData?.moovDisUrl ?? "",
      mtnDisUrl: initialData?.mtnDisUrl ?? "",
      rewardMiniWithdrawal: initialData?.rewardMiniWithdrawal ?? "",
      qosicUsername: initialData?.qosicUsername ?? "",
      whatsappPhoneIndi: initialData?.whatsappPhoneIndi ?? "",
      whatsappPhone: initialData?.whatsappPhone ?? "",
      subscriptionPrice: initialData?.subscriptionPrice ?? "",
    });
  };

  const resetFormErrors = () => {
    setFormErrors({
      minimumDeposit: null,
      minimumWithdrawal: null,
      bonusPercent: null,
      moovPassword: null,
      mtnPassword: null,
      sbinPassword: null,
      cardPassword: null,
      mtnUrl: null,
      moovUrl: null,
      cardUrl: null,
      sbinUrl: null,
      hash: null,
      cashDeskId: null,
      cashierPass: null,
      moovCustomer: null,
      mtnCustomer: null,
      cardCustomer: null,
      sbinCustomer: null,
      moovDisUrl: null,
      mtnDisUrl: null,
      rewardMiniWithdrawal: null,
      qosicUsername: null,
      whatsappPhoneIndi: null,
      whatsappPhone: null,
      subscriptionPrice: null,
    });
  };

  const setActionResultMessage = useInterfaceStore(
    (state) => state.setActionResultMessage,
  );

  const onInputDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>,
  ) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: name === "logo" ? files?.[0] : value,
    });
  };

  const validateForm = () => {
    const errors: SettingFormErrors = {
      minimumDeposit: null,
      minimumWithdrawal: null,
      bonusPercent: null,
      moovPassword: null,
      mtnPassword: null,
      sbinPassword: null,
      cardPassword: null,
      mtnUrl: null,
      moovUrl: null,
      cardUrl: null,
      sbinUrl: null,
      hash: null,
      cashDeskId: null,
      cashierPass: null,
      moovCustomer: null,
      mtnCustomer: null,
      cardCustomer: null,
      sbinCustomer: null,
      moovDisUrl: null,
      mtnDisUrl: null,
      rewardMiniWithdrawal: null,
      qosicUsername: null,
      whatsappPhoneIndi: null,
      whatsappPhone: null,
      subscriptionPrice: null,
    };

    setFormErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setProcessing(true);

      try {
        const setting = new Setting(
          formData.minimumDeposit,
          formData.minimumWithdrawal,
          formData.bonusPercent,
          formData.moovPassword,
          formData.mtnPassword,
          formData.sbinPassword,
          formData.cardPassword,
          formData.mtnUrl,
          formData.moovUrl,
          formData.cardUrl,
          formData.sbinUrl,
          formData.hash,
          formData.cashDeskId,
          formData.cashierPass,
          formData.moovCustomer,
          formData.mtnCustomer,
          formData.cardCustomer,
          formData.sbinCustomer,
          formData.moovDisUrl,
          formData.mtnDisUrl,
          formData.rewardMiniWithdrawal,
          formData.qosicUsername,
          formData.whatsappPhoneIndi,
          formData.whatsappPhone,
          formData.subscriptionPrice,
          formData?.id ?? "",
        );

        if (setting?.id) {
          const updatedSetting = await updateSetting(setting);

          if (typeof updatedSetting === "string") {
            setActionResultMessage(updatedSetting);
            toggleModal("action-result-message");
          } else if (updatedSetting) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage("Le paramètre a été mis à jour avec succès");
            toggleModal("action-result-message");
            await delay({ milliseconds: 1000 });
            toggleModal("action-result-message");
          }
        } else {
          const newSetting = await addSetting(setting);
          if (typeof newSetting === "string") {
            setActionResultMessage(newSetting);
            toggleModal("action-result-message");
          } else if (newSetting) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage("Le paramètre a été ajouté avec succès");
            toggleModal("action-result-message");
            await delay({ milliseconds: 1000 });
            toggleModal("action-result-message");
          }
        }

        fetchSettings();
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
    setFormData,

    resetFormData,
    resetFormErrors,
    onInputDataChange,
    onFormSubmit,
  };
};

export default useSettingForm;
