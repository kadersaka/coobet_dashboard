import {
  ComplaintResponseFormData,
  ComplaintResponseFormError,
} from "@/interfaces/complaint_response.interface";
import Complaint from "@/models/complaint.model";
import ComplaintResponse from "@/models/complaint_response.model";
import useComplaintResponseStore from "@/store/useComplaintResponse.store";
import useInterfaceStore from "@/store/useInterface.store";
import { delay, toggleModal } from "@/utils/functions.util";
import { useEffect, useState } from "react";

const useComplaintResponseForm = (
  modalId: string,
  initialData?: ComplaintResponse,
) => {
  const { addComplaintResponse, updateComplaintResponse } =
    useComplaintResponseStore();

  const [formData, setFormData] = useState<ComplaintResponseFormData>({
    response: initialData?.response ?? "",
  });

  const [formErrors, setFormErrors] = useState<ComplaintResponseFormError>({
    response: null,
  });

  const [processing, setProcessing] = useState<boolean>(false);

  const resetFormData = () => {
    setFormData({
      response: "",
    });
  };

  const resetFormErrors = () => {
    setFormErrors({
      response: null,
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
    const errors: ComplaintResponseFormError = {
      response: null,
    };

    if (formData.response.trim().length === 0) {
      errors.response = "La réponse doit être défini";
    }

    setFormErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setProcessing(true);

      try {
        const complaintResponse = new ComplaintResponse(
          initialData?.reclamation!,
          formData.response,
          new Date(),
        );

        if (complaintResponse?.id) {
          const updatedComplaintResponse =
            await updateComplaintResponse(complaintResponse);

          if (updatedComplaintResponse) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage("La réponse a été mise à jour avec succès");
            toggleModal("action-result-message");
            await delay({ milliseconds: 1000 });
            toggleModal("action-result-message");
          } else {
            setActionResultMessage("Une erreur s'est produite");
            toggleModal("action-result-message");
          }
        } else {
          const newComplaintResponse =
            await addComplaintResponse(complaintResponse);

          if (newComplaintResponse) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage("Le réponse a été ajoutée avec succès");
            toggleModal("action-result-message");
            await delay({ milliseconds: 1000 });
            toggleModal("action-result-message");
          } else {
            setActionResultMessage("Une erreur s'est produite");
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
    onFormSubmit,
  };
};

export default useComplaintResponseForm;
