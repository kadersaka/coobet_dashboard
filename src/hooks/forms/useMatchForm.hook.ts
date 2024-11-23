import useMatchStore from "@/store/useMatch.store";
import useInterfaceStore from "@/store/useInterface.store";
import { delay, toggleModal } from "@/utils/functions.util";
import { useEffect, useState } from "react";
import { MatchFormData, MatchFormErrors } from "@/interfaces/match.interface";
import Match from "@/models/match.model";
import Club from "@/models/club.model";

const useMatchForm = (modalId: string, initialData?: Match) => {
  const { addMatch, updateMatch } = useMatchStore();

  const [formData, setFormData] = useState<MatchFormData>({
    clubHome: initialData?.clubHome ?? new Club("home", "", new Date()),
    clubForeign:
      initialData?.clubForeign ?? new Club("foreign", "", new Date()),
    startDate: new Date(),
    clubHomeGoal: initialData?.clubHomeGoal ?? null,
    clubForeignGoal: initialData?.clubForeignGoal ?? null,
  });

  const [formErrors, setFormErrors] = useState<MatchFormErrors>({
    clubHome: null,
    clubForeign: null,
    startDate: null,
    clubHomeGoal: null,
    clubForeignGoal: null,
  });

  const [processing, setProcessing] = useState<boolean>(false);

  const resetFormData = () => {
    setFormData({
      clubHome: new Club("home", "", new Date()),
      clubForeign: new Club("foreign", "", new Date()),
      startDate: new Date(),
      clubHomeGoal: null,
      clubForeignGoal: null,
    });
  };

  const resetFormErrors = () => {
    setFormErrors({
      clubHome: null,
      clubForeign: null,
      startDate: null,
      clubHomeGoal: null,
      clubForeignGoal: null,
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
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors: MatchFormErrors = {
      clubHome: null,
      clubForeign: null,
      startDate: null,
      clubHomeGoal: null,
      clubForeignGoal: null,
    };

    if (!formData.clubHomeGoal && formData.clubForeignGoal) {
      errors.clubHomeGoal = "Le nombre de but ne peut être null";
    } else if (formData.clubHomeGoal && !formData.clubForeignGoal) {
      errors.clubForeignGoal = "Le nombre de but ne peut être null";
    }

    setFormErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setProcessing(true);

      try {
        const match = new Match(
          formData.clubHome,
          formData.clubForeign,
          formData.startDate,
          formData.clubHomeGoal,
          formData.clubForeignGoal,
          initialData?.id,
        );

        if (match?.id) {
          const updatedMatch = await updateMatch(match);

          if (updatedMatch) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage("Le match a été mise à jour avec succès");
            toggleModal("action-result-message");
            await delay({ milliseconds: 1000 });
            toggleModal("action-result-message");
          } else {
            setActionResultMessage("Une erreur s'est produite");
            toggleModal("action-result-message");
          }
        } else {
          const newMatch = await addMatch(match);

          if (newMatch) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage("Le match a été ajouté avec succès");
            toggleModal("action-result-message");
            delay({ milliseconds: 1000 });
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

export default useMatchForm;
