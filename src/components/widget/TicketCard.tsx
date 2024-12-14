import {
  ticketStatus,
  ticketSubscriptions,
} from "@/hooks/forms/useTicketForm.hook";
import Ticket from "@/models/ticket.model";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
  return (
    <div
      className={`w-full rounded-sm border-[#EEEEEE] bg-white p-4 text-black shadow-md transition-all duration-200 dark:border-strokedark dark:bg-boxdark dark:text-white `}
    >
      <div className="mb-5 flex justify-end font-bold">
        <span className="text-xl font-semibold uppercase">{ticket.sample}</span>
        <div className="flex">
          <Edit
            size={15}
            className="mr-4 text-green-500 hover:cursor-pointer"
          />
          <Trash size={15} className="text-red-500 hover:cursor-pointer" />
        </div>
      </div>
      <div className="mb-12 flex items-center justify-center">
        <p className="">
          {ticket.events.length}
          <span className="ml-3"> évènements</span>
        </p>
      </div>

      <div className="flex items-center justify-between">
        {/* Subscription */}
        <p className="flex items-center">
          <span className="mr-1 font-medium">Abonnement:</span>
          {ticketSubscriptions.find(
            (item) => item.value === ticket.subscription,
          )?.name ?? "Inconnu"}
        </p>

        {/* Status */}
        <p className="flex items-center">
          <span className="mr-1 font-medium">Statut:</span>
          {ticketStatus.find((item) => item.value === ticket.status)?.name ??
            "Inconnu"}
        </p>
      </div>
    </div>
  );
};

export default TicketCard;
