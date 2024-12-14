"use client";

import { FC, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultipleActionButton from "@/components/widget/Form/EditDeleteButton";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AppButton from "@/components/widget/Form/Button";
import { toggleModal } from "@/utils/functions.util";
import DeletionConfirmation from "@/components/widget/Form/DeletionConfirmation";
import ActionResult from "@/components/widget/Form/ActionResultMessage";
import useSearchStore from "@/store/useSearchStore.store";
import Loader from "@/components/common/Loader";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import PageCounter from "@/components/common/PageCounter";
import useTicketForm from "@/hooks/forms/useTicketForm.hook";
import useTicketStore from "@/store/useTicket.store";
import TicketCard from "@/components/widget/TicketCard";

interface TicketsPageProps {}

const TicketsPage: FC<TicketsPageProps> = () => {
  const { searchValue } = useSearchStore();
  const { resetFormData, resetFormErrors } = useTicketForm("ticket-form");
  const {
    paginatedTickets,
    page,
    loading,
    fetchTickets,
    deleteTicket,
    increasePage,
    decreasePage,
  } = useTicketStore();

  useEffect(() => {
    fetchTickets(searchValue);
  }, [fetchTickets, searchValue]);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Tickets"
        onClick={() => {
          fetchTickets(searchValue);
        }}
      >
        <AppButton
          name="Ajouter"
          width="w-[150px]"
          onClick={() => {
            resetFormErrors();
            resetFormData();
            toggleModal("Ticket-form");
          }}
        />
      </Breadcrumb>
      {/* <TicketForm id="Ticket-form" /> */}
      <ActionResult />

      <div className="overflow-x-auto' max-w-full">
        <div className="md:grid-cols-2' grid grid-cols-1 gap-4 rounded-sm text-black dark:text-white lg:grid-cols-2">
          {loading ? (
            <div className="min-h-fit">
              <ProcessingLoader />
            </div>
          ) : (
            <div className="w-full  bg-white dark:bg-boxdark">
              {paginatedTickets?.results.map((ticket, index) => (
                <div
                  key={index}
                  className={` flex w-full items-center border-t border-[#EEEEEE] dark:border-strokedark `}
                >
                  <TicketCard key={index} ticket={ticket} />

                  {/* <TicketForm
                    key={`Ticket-form-${Ticket.id}`}
                    id={`Ticket-form-${Ticket.id}`}
                    Ticket={Ticket}
                  /> */}

                  <DeletionConfirmation
                    key={`deletion-confirmation-${ticket.id}`}
                    id={`delete-dialog-${ticket.id}`}
                    message="Êtes-vous sûr de vouloir supprimer cet coupon"
                    successMessage="Le coupon a été supprimé avec succès"
                    objectId={ticket.id!}
                    onDelete={deleteTicket}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="my-5 flex items-center justify-evenly xsm:my-10 md:my-8">
        {paginatedTickets.previous ? (
          <AppButton
            name="Précédent"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              decreasePage();
              fetchTickets(searchValue);
            }}
          />
        ) : (
          <span className="w-1"> </span>
        )}

        <PageCounter totalPage={paginatedTickets.count} currentPage={page} />

        {paginatedTickets.next ? (
          <AppButton
            name="Suivant"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              increasePage();
              fetchTickets(searchValue);
            }}
          />
        ) : (
          <span className="w-1"></span>
        )}
      </div>
    </DefaultLayout>
  );
};

export default TicketsPage;
