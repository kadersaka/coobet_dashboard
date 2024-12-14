"use client";

import { FC, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultipleActionButton from "@/components/widget/Form/EditDeleteButton";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AppButton from "@/components/widget/Form/Button";
import { toggleModal } from "@/utils/functions.util";
import EventForm from "@/components/widget/Forms/EventForm";
import useEventStore from "@/store/useEvent.store";
import EditDeleteButton from "@/components/widget/Form/EditDeleteButton";
import Image from "next/image";
import DeletionConfirmation from "@/components/widget/Form/DeletionConfirmation";
import ActionResult from "@/components/widget/Form/ActionResultMessage";
import { useSearchParams } from "next/navigation";
import useSearchStore from "@/store/useSearchStore.store";
import Loader from "@/components/common/Loader";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import PageCounter from "@/components/common/PageCounter";
import useEventForm from "@/hooks/forms/useEventForm.hook";
import EventCard from "@/components/widget/EventCard";

interface EventsPageProps {}

const EventsPage: FC<EventsPageProps> = () => {
  const { searchValue } = useSearchStore();
  const { resetFormData, resetFormErrors } = useEventForm("Event-form");
  const {
    paginatedEvents,
    page,
    loading,
    fetchEvents,
    deleteEvent,
    increasePage,
    decreasePage,
  } = useEventStore();

  useEffect(() => {
    fetchEvents(searchValue);
  }, [fetchEvents, searchValue]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Events" onClick={() => fetchEvents(searchValue)}>
        <AppButton
          name="Ajouter"
          width="w-[150px]"
          onClick={() => {
            resetFormErrors();
            resetFormData();
            toggleModal("event-form");
          }}
        />
      </Breadcrumb>
      <EventForm id="event-form" />
      <ActionResult />

      <div className="overflow-x-auto' max-w-full">
        <div className="md:grid-cols-2' grid grid-cols-1 gap-4 rounded-sm text-black dark:text-white lg:grid-cols-2">
          {loading ? (
            <div className="min-h-fit">
              <ProcessingLoader />
            </div>
          ) : (
            <div className="w-full  bg-white dark:bg-boxdark">
              {paginatedEvents?.results.map((event, index) => (
                <div
                  key={index}
                  className={` flex w-full items-center border-t border-[#EEEEEE] dark:border-strokedark `}
                >
                  <EventCard key={index} event={event} />

                  {/* Update Form*/}
                  <EventForm
                    key={`event-form-${event.id}`}
                    id={`event-form-${event.id}`}
                    event={event}
                  />

                  {/*Deletion dialog*/}
                  <DeletionConfirmation
                    key={`deletion-confirmation-${event.id}`}
                    id={`delete-dialog-${event.id}`}
                    message="Êtes-vous sûr de vouloir supprimer cet évènement"
                    successMessage="L'évènement a été supprimé avec succès"
                    objectId={event.id!}
                    onDelete={deleteEvent}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="my-5 flex items-center justify-evenly xsm:my-10 md:my-8">
        {paginatedEvents.previous ? (
          <AppButton
            name="Précédent"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              decreasePage();
              fetchEvents(searchValue);
            }}
          />
        ) : (
          <span className="w-1"> </span>
        )}

        <PageCounter totalPage={paginatedEvents.count} currentPage={page} />

        {paginatedEvents.next ? (
          <AppButton
            name="Suivant"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              increasePage();
              fetchEvents(searchValue);
            }}
          />
        ) : (
          <span className="w-1"></span>
        )}
      </div>
    </DefaultLayout>
  );
};

export default EventsPage;
