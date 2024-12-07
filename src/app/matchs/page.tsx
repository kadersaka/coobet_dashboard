"use client";

import { FC, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultipleActionButton from "@/components/widget/Form/EditDeleteButton";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AppButton from "@/components/widget/Form/Button";
import { toggleModal } from "@/utils/functions.util";
import MatchForm from "@/components/widget/Forms/MatchForm";
import useMatchStore from "@/store/useMatch.store";
import EditDeleteButton from "@/components/widget/Form/EditDeleteButton";
import Image from "next/image";
import DeletionConfirmation from "@/components/widget/Form/DeletionConfirmation";
import ActionResult from "@/components/widget/Form/ActionResultMessage";
import { useSearchParams } from "next/navigation";
import useSearchStore from "@/store/useSearchStore.store";
import Loader from "@/components/common/Loader";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import PageCounter from "@/components/common/PageCounter";
import useMatchForm from "@/hooks/forms/useMatchForm.hook";

interface MatchsPageProps {}

const MatchsPage: FC<MatchsPageProps> = () => {
  const { searchValue } = useSearchStore();
  const { resetFormData, resetFormErrors } = useMatchForm("match-form");
  const {
    paginatedMatches,
    page,
    loading,
    fetchMatches,
    deleteMatch,
    increasePage,
    decreasePage,
  } = useMatchStore();

  useEffect(() => {
    fetchMatches(searchValue);
  }, [fetchMatches, searchValue]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Matchs" onClick={() => fetchMatches(searchValue)}>
        <AppButton
          name="Ajouter"
          width="w-[150px]"
          onClick={() => {
            resetFormErrors();
            resetFormData();
            toggleModal("match-form");
          }}
        />
      </Breadcrumb>
      <MatchForm id="match-form" />
      <ActionResult />

      <div className="overflow-x-auto' max-w-full">
        <div className="min-w-[1170px]' rounded-sm text-black dark:text-white">
          {/* Table Header */}
          <div className="flex   bg-bodydark1 text-left font-bold text-boxdark dark:bg-meta-4 dark:text-white ">
            {["Logo", "Club", "Score", "Score", "Club", "Logo", ""].map(
              (column, index) => (
                <div
                  key={index}
                  className={`flex-1 px-5 py-4 lg:px-7.5 2xl:px-11 ${
                    index === 0 || index === 2 || index === 3 || index === 5
                      ? "text-center"
                      : ""
                  }`}
                >
                  {column}
                </div>
              ),
            )}
          </div>

          {/* Table Body */}
          {loading ? (
            <div className="min-h-fit">
              <ProcessingLoader />
            </div>
          ) : (
            <div className="w-full  bg-white dark:bg-boxdark">
              {paginatedMatches?.results.map((match, index) => (
                <div
                  key={index}
                  className={` flex w-full items-center border-t border-[#EEEEEE] dark:border-strokedark  `}
                >
                  {/* Match Logo 1 */}
                  <div className="flex-1 px-5 py-4 text-center lg:px-7.5 2xl:px-11">
                    <Image
                      src={match.clubHome.logo as string}
                      alt={match.clubHome.name}
                      width={50}
                      height={50}
                      className="mx-auto"
                    />
                  </div>
                  {/* Match Club 1 */}
                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    {match.clubHome.name}
                  </div>

                  {/* Match Score 1 */}
                  <div className="flex-1 px-5 py-4 text-center lg:px-7.5 2xl:px-11">
                    {match.clubHomeGoal}
                  </div>

                  {/* Match Score 2 */}
                  <div className="flex-1 px-5 py-4 text-center lg:px-7.5 2xl:px-11">
                    {match.clubHomeGoal}
                  </div>

                  {/* Match Club 2 */}
                  <div className="flex-1 px-5 py-4 lg:px-7.5 2xl:px-11">
                    {match.clubHome.name}
                  </div>

                  {/* Match Logo 2 */}
                  <div className="flex-1 px-5 py-4 text-center lg:px-7.5 2xl:px-11">
                    <Image
                      src={match.clubHome.logo as string}
                      alt={match.clubHome.name}
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
                      onEdit={() => toggleModal(`match-form-${match.id}`)}
                      onDelete={() => {
                        toggleModal(`delete-dialog-${match.id}`);
                      }}
                    />
                  </div>

                  {/* Update Form*/}
                  <MatchForm
                    key={`match-form-${match.id}`}
                    id={`match-form-${match.id}`}
                    Match={match}
                  />

                  {/*Deletion dialog*/}
                  <DeletionConfirmation
                    key={`deletion-confirmation-${match.id}`}
                    id={`delete-dialog-${match.id}`}
                    message="Êtes-vous sûr de vouloir supprimer ce match"
                    successMessage="Le match a été supprimé avec succès"
                    objectId={match.id!}
                    onDelete={deleteMatch}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="my-5 flex items-center justify-evenly xsm:my-10 md:my-8">
        {paginatedMatches.previous ? (
          <AppButton
            name="Précédent"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              decreasePage();
              fetchMatches(searchValue);
            }}
          />
        ) : (
          <span className="w-1"> </span>
        )}

        <PageCounter totalPage={paginatedMatches.count} currentPage={page} />

        {paginatedMatches.next ? (
          <AppButton
            name="Suivant"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              increasePage();
              fetchMatches(searchValue);
            }}
          />
        ) : (
          <span className="w-1"></span>
        )}
      </div>
    </DefaultLayout>
  );
};

export default MatchsPage;
