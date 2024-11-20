"use client";

import { FC, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultipleActionButton from "@/components/widget/Form/EditDeleteButton";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AppButton from "@/components/widget/Form/Button";
import { toggleModal } from "@/utils/functions.util";
import AdditionForm from "@/components/widget/Forms/AdditionForm";
import ClubForm from "@/components/widget/Forms/ClubForm";
import useClubStore from "@/store/useClub.store";
import EditDeleteButton from "@/components/widget/Form/EditDeleteButton";
import Image from "next/image";
import DeletionConfirmation from "@/components/widget/Form/DeletionConfirmation";
import ActionResult from "@/components/widget/Form/ActionResultMessage";
import { useSearchParams } from "next/navigation";
import useSearchStore from "@/store/useSearchStore.store";
import { Club } from "lucide-react";
import useClubForm from "@/hooks/forms/useClubForm.hook";
import Loader from "@/components/common/Loader";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";

interface ClubsPageProps {}

const ClubsPage: FC<ClubsPageProps> = () => {
  const { searchValue } = useSearchStore();
  const { resetFormData } = useClubForm("club-form");
  const {
    paginatedClubs,
    loading,
    fetchClubs,
    deleteClub,
    increasePage,
    decreasePage,
  } = useClubStore();

  useEffect(() => {
    fetchClubs(searchValue);
  }, [fetchClubs, searchValue]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Clubs">
        <AppButton
          name="Ajouter"
          width="w-[150px]"
          onClick={() => {
            resetFormData();
            toggleModal("club-form");
          }}
        />
      </Breadcrumb>
      <ClubForm id="club-form" />
      <ActionResult />

      <div className="overflow-x-auto' max-w-full">
        <div className="min-w-[1170px]' rounded-sm text-black dark:text-white">
          {/* Table Header */}
          <div className="flex  bg-bodydark1 text-left font-bold text-boxdark dark:bg-meta-4 dark:text-white ">
            {["Name", "Logo", ""].map((column, index) => (
              <div
                key={index}
                className={`flex-1 px-5 py-4 lg:px-7.5 2xl:px-11 ${
                  index === 1 ? "text-center" : ""
                } ${"" /*index === 2 ? " text-end" : "" */}`}
              >
                {column}
              </div>
            ))}
          </div>

          {/* Table Body */}
          {loading ? (
            <ProcessingLoader />
          ) : (
            <div className="w-full  bg-white dark:bg-boxdark">
              {paginatedClubs?.results?.map((club, index) => (
                <div
                  key={index}
                  className={` flex w-full items-center border-t border-[#EEEEEE] dark:border-strokedark  `}
                >
                  {/* Club Name */}
                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    {club.name}
                  </div>

                  {/* Club Logo */}
                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    <Image
                      src={club.logo as string}
                      alt={club.name}
                      width={50}
                      height={50}
                      className="mx-auto"
                    />
                  </div>

                  {/* Actions */}
                  <div
                    className={`flex-1 px-5 py-4 text-end lg:px-7.5 2xl:px-11`}
                  >
                    <EditDeleteButton
                      onEdit={() => toggleModal(`club-form-${club.id}`)}
                      onDelete={() => {
                        toggleModal(`delete-dialog-${club.id}`);
                      }}
                    />
                  </div>

                  {/* Update Form*/}
                  <ClubForm
                    key={`club-form-${club.id}`}
                    id={`club-form-${club.id}`}
                    club={club}
                  />

                  {/*Deletion dialog*/}
                  <DeletionConfirmation
                    key={`deletion-confirmation-${club.id}`}
                    id={`delete-dialog-${club.id}`}
                    message="Êtes-vous sûr de vouloir supprimer ce club"
                    successMessage="Le club a été supprimé avec succès"
                    objectId={club.id!}
                    onDelete={deleteClub}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="my-10 flex items-center justify-evenly xsm:my-10 md:my-16">
        {paginatedClubs.previous && (
          <AppButton
            name="Précédent"
            width="w-[150px]"
            color={`bg-bodydark1 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              decreasePage();
              fetchClubs(searchValue);
            }}
          />
        )}
        {paginatedClubs.next && (
          <AppButton
            name="Suivant"
            width="w-[150px]"
            color={`bg-bodydark1 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              increasePage();
              fetchClubs(searchValue);
            }}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default ClubsPage;
