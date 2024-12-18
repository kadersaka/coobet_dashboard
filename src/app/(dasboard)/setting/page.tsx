"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSettingForm from "@/hooks/forms/useSettingFormHook";
import Setting from "@/models/Setting.model";
import AppInput from "@/components/widget/Form/Input";
import AppButton from "@/components/widget/Form/Button";
import { useEffect, useLayoutEffect, useState } from "react";
import useSettingStore from "@/store/useSetting.store";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import Datetime from "react-datetime";
import ActionResult from "@/components/widget/Form/ActionResultMessage";

const Settings = () => {
  const { fetchSettings, settings, loading } = useSettingStore();

  const {
    processing,
    formData,
    formErrors,
    setFormData,
    onInputDataChange,
    onFormSubmit,
  } = useSettingForm(
    "",
    new Setting(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ),
  );

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (!loading && settings.length > 0) {
      setFormData({
        id: settings[0].id ?? undefined,
        minimumDeposit: settings[0].minimumDeposit ?? "",
        minimumWithdrawal: settings[0].minimumWithdrawal ?? "",
        bonusPercent: settings[0].bonusPercent ?? "",
        moovPassword: settings[0].moovPassword ?? "",
        mtnPassword: settings[0].mtnPassword ?? "",
        sbinPassword: settings[0].sbinPassword ?? "",
        cardPassword: settings[0].cardPassword ?? "",
        mtnUrl: settings[0].mtnUrl ?? "",
        moovUrl: settings[0].moovUrl ?? "",
        cardUrl: settings[0].cardUrl ?? "",
        sbinUrl: settings[0].sbinUrl ?? "",
        hash: settings[0].hash ?? "",
        cashDeskId: settings[0].cashDeskId ?? "",
        cashierPass: settings[0].cashierPass ?? "",
        moovCustomer: settings[0].moovCustomer ?? "",
        mtnCustomer: settings[0].mtnCustomer ?? "",
        cardCustomer: settings[0].cardCustomer ?? "",
        sbinCustomer: settings[0].sbinCustomer ?? "",
        moovDisUrl: settings[0]?.moovDisUrl ?? "",
        mtnDisUrl: settings[0]?.mtnDisUrl ?? "",
        rewardMiniWithdrawal: settings[0]?.rewardMiniWithdrawal ?? "",
        qosicUsername: settings[0]?.qosicUsername ?? "",
        whatsappPhoneIndi: settings[0]?.whatsappPhoneIndi ?? "",
        whatsappPhone: settings[0]?.whatsappPhone ?? "",
        subscriptionPrice: settings[0]?.subscriptionPrice ?? "",
      });
    }
  }, [settings, setFormData, loading]);

  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Paramètre">
          {(!editMode || processing) && (
            <AppButton
              name={` ${settings.length != 0 ? "Mettre à jour" : "Ajouter"}`}
              width="w-[150px]"
              onClick={() => {
                setEditMode(true);
              }}
            />
          )}
        </Breadcrumb>
        <ActionResult />

        <div className="flex items-center justify-center">
          {loading ? (
            <ProcessingLoader />
          ) : (
            <div className="sm:min-w-90 lg:min-w-150">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Données
                  </h3>
                </div>
                <div className="p-7">
                  <form onSubmit={onFormSubmit}>
                    <div className="mb-4">
                      <AppInput
                        label="Dépôt minimum"
                        id="minimumDeposit"
                        name="minimumDeposit"
                        type="number"
                        disabled={!editMode}
                        placeholder="Dépôt minimum"
                        value={formData.minimumDeposit}
                        onChange={onInputDataChange}
                      />
                      {formErrors.minimumDeposit && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.minimumDeposit}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Retrait minimum"
                        id="minimumWithdrawal"
                        name="minimumWithdrawal"
                        type="number"
                        disabled={!editMode}
                        placeholder="Retrait minimum"
                        value={formData.minimumWithdrawal}
                        onChange={onInputDataChange}
                      />
                      {formErrors.minimumWithdrawal && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.minimumWithdrawal}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Pourcentage de bonus"
                        id="bonusPercent"
                        name="bonusPercent"
                        type="number"
                        disabled={!editMode}
                        placeholder="Pourcentage de bonus"
                        value={formData.bonusPercent}
                        onChange={onInputDataChange}
                      />
                      {formErrors.bonusPercent && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.bonusPercent}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Mot de passe Moov"
                        id="moovPassword"
                        name="moovPassword"
                        type="password"
                        disabled={!editMode}
                        placeholder="Mot de passe Moov"
                        value={formData.moovPassword}
                        onChange={onInputDataChange}
                      />
                      {formErrors.moovPassword && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.moovPassword}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Mot de passe MTN"
                        id="mtnPassword"
                        name="mtnPassword"
                        type="password"
                        disabled={!editMode}
                        placeholder="Mot de passe MTN"
                        value={formData.mtnPassword}
                        onChange={onInputDataChange}
                      />
                      {formErrors.mtnPassword && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.mtnPassword}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Mot de passe SBIN"
                        id="sbinPassword"
                        name="sbinPassword"
                        type="password"
                        disabled={!editMode}
                        placeholder="Mot de passe SBIN"
                        value={formData.sbinPassword}
                        onChange={onInputDataChange}
                      />
                      {formErrors.sbinPassword && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.sbinPassword}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Mot de passe Carte"
                        id="cardPassword"
                        name="cardPassword"
                        type="password"
                        disabled={!editMode}
                        placeholder="Mot de passe Carte"
                        value={formData.cardPassword}
                        onChange={onInputDataChange}
                      />
                      {formErrors.cardPassword && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.cardPassword}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Lien MTN"
                        id="mtnUrl"
                        name="mtnUrl"
                        type="text"
                        disabled={!editMode}
                        placeholder="Lien MTN"
                        value={formData.mtnUrl}
                        onChange={onInputDataChange}
                      />
                      {formErrors.mtnUrl && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.mtnUrl}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Lien MOOV"
                        id="moovUrl"
                        name="moovUrl"
                        type="text"
                        disabled={!editMode}
                        placeholder="Lien MOOV"
                        value={formData.moovUrl}
                        onChange={onInputDataChange}
                      />
                      {formErrors.moovUrl && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.moovUrl}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Lien SBIN"
                        id="sbinUrl"
                        name="sbinUrl"
                        type="text"
                        disabled={!editMode}
                        placeholder="Lien SBIN"
                        value={formData.sbinUrl}
                        onChange={onInputDataChange}
                      />
                      {formErrors.sbinUrl && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.sbinUrl}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Lien Carte"
                        id="cardUrl"
                        name="cardUrl"
                        type="text"
                        disabled={!editMode}
                        placeholder="Lien Carte"
                        value={formData.cardUrl}
                        onChange={onInputDataChange}
                      />
                      {formErrors.cardUrl && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.cardUrl}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Hash"
                        id="hash"
                        name="hash"
                        type="text"
                        disabled={!editMode}
                        placeholder="Hash"
                        value={formData.hash}
                        onChange={onInputDataChange}
                      />
                      {formErrors.hash && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.hash}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="ID Cash Desk"
                        id="cashDeskId"
                        name="cashDeskId"
                        type="text"
                        disabled={!editMode}
                        placeholder="ID Cash Desk"
                        value={formData.cashDeskId}
                        onChange={onInputDataChange}
                      />
                      {formErrors.cashDeskId && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.cashDeskId}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Cashier Pass"
                        id="cashierPass"
                        name="cashierPass"
                        type="text"
                        disabled={!editMode}
                        placeholder="Cashier Pass"
                        value={formData.cashierPass}
                        onChange={onInputDataChange}
                      />
                      {formErrors.cashierPass && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.cashierPass}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Client MOOV"
                        id="moovCustomer"
                        name="moovCustomer"
                        type="text"
                        disabled={!editMode}
                        placeholder="Client MOOV"
                        value={formData.moovCustomer}
                        onChange={onInputDataChange}
                      />
                      {formErrors.moovCustomer && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.moovCustomer}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Client MTN"
                        id="mtnCustomer"
                        name="mtnCustomer"
                        type="text"
                        disabled={!editMode}
                        placeholder="Client MTN"
                        value={formData.mtnCustomer}
                        onChange={onInputDataChange}
                      />
                      {formErrors.mtnCustomer && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.mtnCustomer}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Client SBIN"
                        id="sbinCustomer"
                        name="sbinCustomer"
                        type="text"
                        disabled={!editMode}
                        placeholder="Client SBIN"
                        value={formData.sbinCustomer}
                        onChange={onInputDataChange}
                      />
                      {formErrors.sbinCustomer && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.sbinCustomer}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Client Card"
                        id="cardCustomer"
                        name="cardCustomer"
                        type="text"
                        disabled={!editMode}
                        placeholder="Client Card"
                        value={formData.cardCustomer}
                        onChange={onInputDataChange}
                      />
                      {formErrors.cardCustomer && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.cardCustomer}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="MOOV Distribution Url"
                        id="moovDisUrl"
                        name="moovDisUrl"
                        type="text"
                        disabled={!editMode}
                        placeholder="MOOV Distribution Url"
                        value={formData.moovDisUrl}
                        onChange={onInputDataChange}
                      />
                      {formErrors.moovDisUrl && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.moovDisUrl}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="MTN Distribution Url"
                        id="mtnDisUrl"
                        name="mtnDisUrl"
                        type="text"
                        disabled={!editMode}
                        placeholder="MTN Distribution Url"
                        value={formData.mtnDisUrl}
                        onChange={onInputDataChange}
                      />
                      {formErrors.mtnDisUrl && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.mtnDisUrl}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Minimum Retrait Récompense"
                        id="rewardMiniWithdrawal"
                        name="rewardMiniWithdrawal"
                        type="text"
                        disabled={!editMode}
                        placeholder="Minimum Retrait Récompense"
                        value={formData.rewardMiniWithdrawal}
                        onChange={onInputDataChange}
                      />
                      {formErrors.rewardMiniWithdrawal && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.rewardMiniWithdrawal}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Nom d'utilisateur Qosic"
                        id="qosicUsername"
                        name="qosicUsername"
                        type="text"
                        disabled={!editMode}
                        placeholder="Nom d'utilisateur Qosic"
                        value={formData.qosicUsername}
                        onChange={onInputDataChange}
                      />
                      {formErrors.qosicUsername && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.qosicUsername}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Indicatif Numéro Whatsapp"
                        id="whatsappPhoneIndi"
                        name="whatsappPhoneIndi"
                        type="text"
                        disabled={!editMode}
                        placeholder="Indicatif Numéro Whatsapp"
                        value={formData.whatsappPhoneIndi}
                        onChange={onInputDataChange}
                      />
                      {formErrors.whatsappPhoneIndi && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.whatsappPhoneIndi}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Numéro Whatsapp"
                        id="whatsappPhone"
                        name="whatsappPhone"
                        type="text"
                        disabled={!editMode}
                        placeholder="Numéro Whatsapp"
                        value={formData.whatsappPhone}
                        onChange={onInputDataChange}
                      />
                      {formErrors.whatsappPhone && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.whatsappPhone}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <AppInput
                        label="Prix Abonnement"
                        id="subscriptionPrice"
                        name="subscriptionPrice"
                        type="text"
                        disabled={!editMode}
                        placeholder="Prix Abonnement"
                        value={formData.subscriptionPrice}
                        onChange={onInputDataChange}
                      />
                      {formErrors.subscriptionPrice && (
                        <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                          {formErrors.subscriptionPrice}
                        </p>
                      )}
                    </div>

                    <div className="mt-8">
                      {editMode && (
                        <>
                          {!processing ? (
                            <AppButton
                              name={` ${settings.length != 0 ? "Mettre à jour" : "Ajouter"}`}
                              onClick={() => {}}
                            />
                          ) : (
                            <ProcessingLoader />
                          )}
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
