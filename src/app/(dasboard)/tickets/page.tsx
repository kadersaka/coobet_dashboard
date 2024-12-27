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
import TicketForm from "@/components/widget/Forms/TicketForm";

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
    fetchTickets(searchValue, 1);
  }, [fetchTickets, searchValue]);

  return (
    <>
      <Breadcrumb
        pageName="Coupons"
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
            toggleModal("ticket-form");
          }}
        />
      </Breadcrumb>
      <TicketForm id="ticket-form" />
      <ActionResult />

      <div className="overflow-x-auto' max-w-full">
        {loading ? (
          <ProcessingLoader />
        ) : (
          <div className="grid grid-cols-1 gap-4 rounded-sm text-black dark:text-white md:grid-cols-2 lg:grid-cols-3">
            {paginatedTickets?.results.map((ticket, index) => (
              <div
                key={index}
                className={` flex w-full items-center border-t border-[#EEEEEE] dark:border-strokedark `}
              >
                <TicketCard
                  key={index}
                  ticket={ticket}
                  showOptions={true}
                  onEdit={() => {
                    resetFormData();
                    resetFormErrors();
                    toggleModal(`ticket-form-${ticket.id}`);
                  }}
                  onDelete={() => toggleModal(`delete-dialog-${ticket.id}`)}
                />

                <TicketForm
                  key={`ticket-form-${ticket.id}`}
                  id={`ticket-form-${ticket.id}`}
                  ticket={ticket}
                />

                <DeletionConfirmation
                  key={`deletion-confirmation-${ticket.id}`}
                  id={`delete-dialog-${ticket.id}`}
                  message="Êtes-vous sûr de vouloir supprimer ce coupon"
                  successMessage="Le coupon a été supprimé avec succès"
                  objectId={ticket.id!}
                  onDelete={deleteTicket}
                />
              </div>
            ))}
          </div>
        )}
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

        <PageCounter
          totalPage={paginatedTickets.count}
          currentPage={page}
          fetchPage={(page) => fetchTickets(searchValue, page)}
        />

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
    </>
  );
};

export default TicketsPage;
