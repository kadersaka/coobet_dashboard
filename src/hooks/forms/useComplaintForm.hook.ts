/*


import {
  ComplaintResponseFormData,
  ComplaintResponseFormError,
} from "@/interfaces/complaint.interface";
import Complaint from "@/models/complaint.model";
import ComplaintResponse from "@/models/complaintResponse.model";
import useComplaintResponseStore from "@/store/useComplaintResponse.store";
import useInterfaceStore from "@/store/useInterface.store";
import { delay, toggleModal } from "@/utils/functions.util";
import { useEffect, useState } from "react";

const useComplaintResponseForm = (modalId: string, initialData?: Complaint) => {
  const { addComplaintResponse, updateComplaintResponse } = useComplaintResponseStore();

  const [formData, setFormData] = useState<ComplaintResponseFormData>({
    response: ,
  });

  const [formErrors, setFormErrors] = useState<ComplaintResponseFormErrors>({
    name: null,
    sport: null,
  });

  const [processing, setProcessing] = useState<boolean>(false);

  const resetFormData = () => {
    setFormData({
      name: "",
      sport: "",
    });
  };

  const resetFormErrors = () => {
    setFormErrors({
      name: null,
      sport: null,
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
    const errors: ComplaintResponseFormErrors = {
      name: null,
      sport: null,
    };

    if (!formData.name.trim()) {
      errors.name = "Le nom du championnat est requis";
    } else if (formData.name.length < 3) {
      errors.name = "Le nom doit contenir au moins trois caractères";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name =
        "Le nom doit contenir uniquement des lettres et des espaces";
    }

    if (!formData.sport.trim()) {
      errors.sport = "Le sport du championnat est requis";
    } else if (formData.sport.length < 3) {
      errors.name = "Le sport doit contenir au moins trois caractères";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name =
        "Le sport doit contenir uniquement des lettres et des espaces";
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
          formData.name,
          formData.sport,
          initialData?.id,
        );

        if (complaintResponse?.id) {
          const updatedComplaintResponse = await updateComplaintResponse(complaintResponse);

          if (updatedComplaintResponse) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage(
              "Le championnat a été mis à jour avec succès",
            );
            toggleModal("action-result-message");
            await delay({ milliseconds: 1000 });
            toggleModal("action-result-message");
          } else {
            setActionResultMessage("Une erreur s'est produite");
            toggleModal("action-result-message");
          }
        } else {
          const newComplaintResponse = await addComplaintResponse(complaintResponse);

          if (newComplaintResponse) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage("Le championnat a été ajouté avec succès");
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


*/
