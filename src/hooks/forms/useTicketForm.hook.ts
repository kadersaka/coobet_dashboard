import useTicketStore from "@/store/useTicket.store";
import useInterfaceStore from "@/store/useInterface.store";
import { delay, toggleModal } from "@/utils/functions.util";
import { useEffect, useState } from "react";
import {
  TicketFormData,
  TicketFormErrors,
} from "@/interfaces/ticket.interface";
import Ticket from "@/models/ticket.model";
import Event from "@/models/event.model";
import { SelectItemProps } from "../../components/widget/Form/Select";

export const ticketStatus: SelectItemProps[] = [
  {
    name: "Perdu",
    value: "lost",
  },
  {
    name: "En cours",
    value: "pending",
  },
  {
    name: "Gagné",
    value: "win",
  },
];

export const ticketSubscriptions: SelectItemProps[] = [
  {
    name: "Gratuit",
    value: "free",
  },
  {
    name: "VIP",
    value: "vip",
  },
];

const useTicketForm = (modalId: string, initialData?: Ticket) => {
  const { addTicket, updateTicket } = useTicketStore();

  const [formData, setFormData] = useState<TicketFormData>({
    events: initialData?.events ?? [],
    status:
      initialData?.status != null
        ? (ticketStatus.find((status) => status.value == initialData?.status)
            ?.name ?? "")
        : "",
    sample: initialData?.sample ?? "",
    subscription:
      initialData?.subscription != null
        ? (ticketSubscriptions.find(
            (subscription) => subscription.value == initialData?.subscription,
          )?.name ?? "")
        : "",
  });

  const [formErrors, setFormErrors] = useState<TicketFormErrors>({
    events: null,
    status: null,
    sample: null,
    subscription: null,
  });

  const [processing, setProcessing] = useState<boolean>(false);

  const resetFormData = () => {
    setFormData({
      events: [],
      status: "",
      sample: "",
      subscription: "",
    });
  };

  const resetFormErrors = () => {
    setFormErrors({
      events: null,
      status: null,
      sample: null,
      subscription: null,
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

  const onEventChange = (name: string, event: Event) => {
    if (!formData.events.find((evt) => evt.id == event.id))
      setFormData({ ...formData, [name]: [...formData.events, event] });
  };

  const validateForm = () => {
    const errors: TicketFormErrors = {
      events: null,
      status: null,
      sample: null,
      subscription: null,
    };

    if (formData.events.length === 0) {
      errors.events = "Le coupon doit contenir au moins un évènemwnt";
    }

    if (formData.status?.length === 0) {
      errors.status = "Le status doit être défini";
    }

    if (formData.sample?.length === 0) {
      errors.sample = "Le code doit être défini";
    }

    if (formData.subscription?.length === 0) {
      errors.sample = "L'abonnement doit être défini";
    }

    setFormErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setProcessing(true);

      try {
        const ticket = new Ticket(
          formData.events!,
          ticketStatus.find((item) => item.name === formData.status)?.value ??
            "lost",
          formData.sample!,
          new Date(),
          ticketSubscriptions.find(
            (item) => item.name === formData.subscription,
          )?.value ?? "",
          initialData?.id,
        );

        if (ticket?.id) {
          const updatedTicket = await updateTicket(ticket);

          if (updatedTicket) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage("Le coupon a été mise à jour avec succès");
            toggleModal("action-result-message");
            await delay({ milliseconds: 1000 });
            toggleModal("action-result-message");
          } else {
            setActionResultMessage("Une erreur s'est produite");
            toggleModal("action-result-message");
          }
        } else {
          const newTicket = await addTicket(ticket);

          if (newTicket) {
            resetFormData();
            toggleModal(modalId);
            setActionResultMessage("Le coupon a été ajouté avec succès");
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
    onEventChange,
    onFormSubmit,
  };
};

export default useTicketForm;
