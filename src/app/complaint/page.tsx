"use client";

import { FC, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultipleActionButton from "@/components/widget/Form/EditDeleteButton";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AppButton from "@/components/widget/Form/Button";
import { toggleModal } from "@/utils/functions.util";
//import ComplaintForm from "@/components/widget/Forms/ComplaintForm";
import useComplaintstore from "@/store/useComplaint.store";
import EditDeleteButton from "@/components/widget/Form/EditDeleteButton";
import Image from "next/image";
import DeletionConfirmation from "@/components/widget/Form/DeletionConfirmation";
import ActionResult from "@/components/widget/Form/ActionResultMessage";
import { useSearchParams } from "next/navigation";
import useSearchStore from "@/store/useSearchStore.store";
//import useComplaintForm from "@/hooks/forms/useComplaintForm.hook";
import Loader from "@/components/common/Loader";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import PageCounter from "@/components/common/PageCounter";

interface ComplaintsPageProps {}

const ComplaintsPage: FC<ComplaintsPageProps> = () => {
  const { searchValue } = useSearchStore();
  // const { resetFormData, resetFormErrors } =
  //   useComplaintForm("complaint-form");
  const {
    paginatedComplaints,
    page,
    loading,
    fetchComplaints,
    deleteComplaint,
    increasePage,
    decreasePage,
  } = useComplaintstore();

  useEffect(() => {
    fetchComplaints(searchValue);
  }, [fetchComplaints, searchValue]);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Championnats"
        onClick={() => fetchComplaints(searchValue)}
      >
        {/* <AppButton
          name="Ajouter"
          width="w-[150px]"
          onClick={() => {
            // resetFormErrors();
            // resetFormData();
            toggleModal("complaint-form");
          }}
        /> */}
      </Breadcrumb>
      {/* <ComplaintForm id="complaint-form" /> */}
      <ActionResult />

      <div className="overflow-x-auto' max-w-full">
        <div className="min-w-[1170px]' rounded-sm text-black dark:text-white">
          <div className="flex   bg-bodydark1 text-left font-bold text-boxdark dark:bg-meta-4 dark:text-white ">
            {["Utilisateur", "Email", "Message", "Réponse", ""].map(
              (column, index) => (
                <div
                  key={index}
                  className={`flex-1 px-5 py-4 lg:px-7.5 2xl:px-11 `}
                >
                  {column}
                </div>
              ),
            )}
          </div>

          {loading ? (
            <div className="min-h-fit">
              <ProcessingLoader />
            </div>
          ) : (
            <div className="w-full  bg-white dark:bg-boxdark">
              {paginatedComplaints?.results?.map((complaint, index) => (
                <div
                  key={index}
                  className={` flex w-full items-center border-t border-[#EEEEEE] dark:border-strokedark  `}
                >
                  <div className="flex-1  px-5 py-4 lg:px-7.5 2xl:px-11">
                    {complaint.user.lastname} {complaint.user.firstname}
                  </div>

                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    {complaint.email}
                  </div>

                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    {complaint.message}
                  </div>

                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    Réponse
                  </div>

                  <div
                    className={`flex-1 px-5 py-4 text-end lg:px-7.5 2xl:px-11`}
                  >
                    <EditDeleteButton
                      editText="Répondre"
                      onEdit={() =>
                        toggleModal(`complaint-form-${complaint.id}`)
                      }
                      onDelete={() => {
                        toggleModal(`delete-dialog-${complaint.id}`);
                      }}
                    />
                  </div>

                  {/*              
                  <ComplaintForm
                    key={`complaint-form-${complaint.id}`}
                    id={`complaint-form-${complaint.id}`}
                    complaint={complaint}
                  /> */}

                  <DeletionConfirmation
                    key={`deletion-confirmation-${complaint.id}`}
                    id={`delete-dialog-${complaint.id}`}
                    message="Êtes-vous sûr de vouloir supprimer cette plainte"
                    successMessage="La plainte a été supprimé avec succès"
                    objectId={complaint.id!}
                    onDelete={deleteComplaint}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="my-5 flex items-center justify-evenly xsm:my-10 md:my-8">
        {paginatedComplaints.previous ? (
          <AppButton
            name="Précédent"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              decreasePage();
              fetchComplaints(searchValue);
            }}
          />
        ) : (
          <span className="w-1"></span>
        )}

        <PageCounter totalPage={paginatedComplaints.count} currentPage={page} />

        {paginatedComplaints.next ? (
          <AppButton
            name="Suivant"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              increasePage();
              fetchComplaints(searchValue);
            }}
          />
        ) : (
          <span className="w-1"></span>
        )}
      </div>
    </DefaultLayout>
  );
};
export default ComplaintsPage;
