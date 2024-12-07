import { FC, useEffect, useState } from "react";
import Modal from "../Form/Modal";
import AppInput from "../Form/Input";
import useLoginForm from "@/hooks/forms/useLoginForm.hook";
import AppButton from "../Form/Button";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import Match from "@/models/match.model";
import useMatchForm from "@/hooks/forms/useMatchForm.hook";
import ItemSelector from "../Form/ItemSelector";
import ClubApi from "@/api/club.api";
import useClubStore from "@/store/useClub.store";
import Club from "@/models/club.model";
import { downloadFile } from "@/utils/functions.util";

interface MatchFormProps {
  id: string;
  Match?: Match;
}

const MatchForm: FC<MatchFormProps> = ({ id, Match }) => {
  const {
    processing,
    formData,
    formErrors,
    resetFormData,
    resetFormErrors,
    onInputDataChange,
    onFormSubmit,
  } = useMatchForm(id, Match);

  const { researchAddClub, researchClubs } = useClubStore();

  return (
    <Modal
      id={id}
      onClose={() => {
        resetFormData();
        resetFormErrors();
      }}
    >
      <div className=" dark:border-strokedark">
        <form onSubmit={onFormSubmit}>
          <div className="mb-4">
            {/* =====> ITEM SELECTOR <===== */}
            <ItemSelector
              modalId="Club1"
              onModalClose={() => {}}
              onItemSelected={() => {}}
              defautItem={new Club("", "", new Date())}
              addItemfn={researchAddClub}
              getItemsfn={researchClubs}
              itemName={"Club"}
              placeholder="Sélectionner un club"
              item={null}
            />
          </div>
          <div className="mb-4">
            <AppInput
              label="But 1"
              id="clubHomeGoal"
              name="clubHomeGoal"
              type="number"
              placeholder="Nombre de but"
              value={formData.clubHomeGoal}
              onChange={onInputDataChange}
            />
            {formErrors.clubHomeGoal && (
              <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                {formErrors.clubHomeGoal}
              </p>
            )}
          </div>
          <div className="mb-4">
            <AppInput
              label="But 2"
              id="clubForeignGoal"
              name="clubForeignGoal"
              type="number"
              placeholder="Nombre de but"
              value={formData.clubForeignGoal}
              onChange={onInputDataChange}
            />
            {formErrors.clubForeignGoal && (
              <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                {formErrors.clubForeignGoal}
              </p>
            )}
          </div>

          <div className="mb-5">
            {processing ? (
              <ProcessingLoader />
            ) : (
              <AppButton
                name={`${Match?.id ? "Mettre à jour" : "Ajouter"}`}
                onClick={() => {}}
              />
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default MatchForm;
