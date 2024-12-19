import AuthAPI from "@/api/auth.api";
import useInterfaceStore from "@/store/useInterface.store";
import { toggleModal } from "@/utils/functions.util";
import { useState } from "react";
import AuthSetting from "../../models/auth_setting.model";
import {
  AuthSettingFormData,
  AuthSettingFormErrors,
} from "@/interfaces/auth_setting.interface";

const useAuthSettingForm = () => {
  const [authSettingFormData, setAuthSettingFormData] =
    useState<AuthSettingFormData>({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

  const [authSettingFormErrors, setAuthSettingFormErrors] =
    useState<AuthSettingFormErrors>({
      oldPassword: null,
      newPassword: null,
      confirmNewPassword: null,
    });

  const [authSettingProcessing, setAuthSettingProcessing] =
    useState<boolean>(false);

  const setActionResultMessage = useInterfaceStore(
    (state) => state.setActionResultMessage,
  );

  const authSettingOnInputDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setAuthSettingFormData({
      ...authSettingFormData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors: AuthSettingFormErrors = {
      oldPassword: null,
      newPassword: null,
      confirmNewPassword: null,
    };

    if (!authSettingFormData.oldPassword?.trim()) {
      errors.oldPassword = "L'ancien mot de passe est requis";
    }

    if (!authSettingFormData.newPassword?.trim()) {
      errors.newPassword = "Le nouveau mot de passe est requis";
    }

    if (!authSettingFormData.confirmNewPassword?.trim()) {
      errors.confirmNewPassword = "Le confirmation de mot de passe est requis";
    }

    if (
      authSettingFormData.newPassword?.trim() !=
      authSettingFormData.confirmNewPassword?.trim()
    ) {
      errors.newPassword = "Mot de passe non identique";
      errors.confirmNewPassword = "Mot de passe non identique";
    }

    setAuthSettingFormErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  const authSettingOnFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setAuthSettingProcessing(true);
      const authSetting = new AuthSetting(
        authSettingFormData.oldPassword,
        authSettingFormData.newPassword,
        authSettingFormData.confirmNewPassword,
      );
      try {
        const response = await AuthAPI.setting(authSetting);

        if (response?.message) {
          setAuthSettingFormErrors({
            oldPassword: response.message,
            newPassword: response.message,
            confirmNewPassword: response.message,
          });
        } else if (response?.data) {
          setActionResultMessage(
            `Votre mot de passe a été modifié avec succès`,
          );

          toggleModal("action-result-message");
        } else {
          setActionResultMessage("Une erreur s'est produite");
          toggleModal("action-result-message");
        }
      } catch (error: unknown) {
        console.error("Error handling form submission:", error);
      }

      setAuthSettingProcessing(false);
    }
  };

  return {
    authSettingFormData,
    authSettingFormErrors,
    authSettingProcessing,
    authSettingOnInputDataChange,
    authSettingOnFormSubmit,
  };
};

export default useAuthSettingForm;
