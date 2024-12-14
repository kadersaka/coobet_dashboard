import { FC, useEffect, useState } from "react";
import Modal from "../Form/Modal";
import AppInput from "../Form/Input";
import AppButton from "../Form/Button";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import Ticket from "@/models/ticket.model";
import useTicketForm, {
  ticketStatus,
  ticketSubscriptions,
} from "@/hooks/forms/useTicketForm.hook";
import ItemSelector from "../Form/ItemSelector";
import useClubStore from "@/store/useClub.store";
import Club from "@/models/club.model";
import AppDateTimePicker from "../Form/DateTimePicker";
import Championship from "@/models/championship.model";
import Sport from "@/models/sport.model";
import useChampionshipStore from "@/store/useChampionship.store";
import Match from "@/models/match.model";
import useMatchForm from "@/hooks/forms/useMatchForm.hook";
import useMatchStore from "@/store/useMatch.store";
import AppSelect from "../Form/Select";
import { ArrowRightLeft } from "lucide-react";
import Event from "@/models/event.model";
import useEventStore from "@/store/useEvent.store";
import EventCard from "../EventCard";

interface TicketFormProps {
  id: string;
  ticket?: Ticket;
}

const TicketForm: FC<TicketFormProps> = ({ id, ticket }) => {
  const {
    processing,
    formData,
    formErrors,
    resetFormData,
    resetFormErrors,
    onInputDataChange,
    onEventChange,

    onFormSubmit,
  } = useTicketForm(id, ticket);

  const { researchAddEvent, researchEvents } = useEventStore();

  const [dynamicKey, setDynamicKey] = useState(new Date().toISOString());

  return (
    <Modal
      id={id}
      onClose={() => {
        resetFormData();
        resetFormErrors();
        setDynamicKey(`${new Date().getMilliseconds()}`);
      }}
    >
      <div className=" dark:border-strokedark">
        <form onSubmit={onFormSubmit}>
          <div className="mb-4">
            <ItemSelector
              key={`${dynamicKey}-event`}
              modalId="event"
              onItemSelected={onEventChange}
              defautItem={
                new Event(
                  new Match(
                    new Championship("", new Sport("")),
                    new Club("", "", new Date()),
                    new Club("", "", new Date()),
                    new Date(),
                    null,
                    null,
                  ),
                  "",
                  "",
                  "",
                  new Date(),
                )
              }
              addItemfn={researchAddEvent}
              getItemsfn={researchEvents}
              itemName={"Évènements"}
              placeholder="Ajouter un évènement"
              item={formData.events}
            />
            {formErrors.events && (
              <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                {formErrors.events}
              </p>
            )}
          </div>

          <div className="mb-4">
            {ticket?.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mb-4">
            <AppInput
              label="Code"
              id="sample"
              name="sample"
              type="text"
              placeholder="Code"
              value={formData.sample}
              onChange={onInputDataChange}
            />
            {formErrors.sample && (
              <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                {formErrors.sample}
              </p>
            )}
          </div>

          <div className="mb-4">
            <AppSelect
              id="subscription"
              name="subscription"
              label="Abonnement"
              items={ticketSubscriptions}
              value={formData.subscription ?? "Free"}
              onChange={onInputDataChange}
              icon={
                <ArrowRightLeft
                  className="text-black dark:text-white"
                  size={25}
                />
              }
            />
            {formErrors.subscription && (
              <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                {formErrors.subscription}
              </p>
            )}
          </div>

          <div className="mb-4">
            <AppSelect
              id="status"
              name="status"
              label="Statut"
              items={ticketStatus}
              value={formData.status ?? "En attente"}
              onChange={onInputDataChange}
              icon={
                <ArrowRightLeft
                  className="text-black dark:text-white"
                  size={25}
                />
              }
            />
            {formErrors.status && (
              <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                {formErrors.status}
              </p>
            )}
          </div>

          <div className="mb-5">
            {processing ? (
              <ProcessingLoader />
            ) : (
              <AppButton
                name={`${ticket?.id ? "Mettre à jour" : "Ajouter"}`}
                onClick={() => {}}
              />
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TicketForm;
