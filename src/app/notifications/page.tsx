"use client";

import { FC, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AppButton from "@/components/widget/Form/Button";
import { toggleModal } from "@/utils/functions.util";
import useNotificationStore from "@/store/useNotification.store";
import EditDeleteButton from "@/components/widget/Form/EditDeleteButton";
import Image from "next/image";
import DeletionConfirmation from "@/components/widget/Form/DeletionConfirmation";
import ActionResult from "@/components/widget/Form/ActionResultMessage";
import { useSearchParams } from "next/navigation";
import useSearchStore from "@/store/useSearchStore.store";
import Loader from "@/components/common/Loader";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import PageCounter from "@/components/common/PageCounter";
import NotificationCard from "@/components/widget/NotificationCard";

interface NotificationsPageProps {}

const NotificationsPage: FC<NotificationsPageProps> = () => {
  const { searchValue } = useSearchStore();

  const {
    paginatedNotifications,
    page,
    loading,
    fetchNotifications,
    deleteNotification,
    increasePage,
    decreasePage,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotifications(searchValue);
  }, [fetchNotifications, searchValue]);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Notifications"
        onClick={() => fetchNotifications(searchValue)}
      />

      <ActionResult />

      <div className="max-w-full ">
        <div className=" grid grid-cols-1 gap-4 rounded-sm text-black dark:text-white md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="min-h-fit">
              <ProcessingLoader />
            </div>
          ) : (
            paginatedNotifications?.results?.map((notification, index) => (
              <NotificationCard key={notification.id} {...notification} />
            ))
          )}
        </div>
      </div>

      <div className="my-5 flex items-center justify-evenly xsm:my-10 md:my-8">
        {paginatedNotifications.previous ? (
          <AppButton
            name="Précédent"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              decreasePage();
              fetchNotifications(searchValue);
            }}
          />
        ) : (
          <span className="w-1"></span>
        )}

        <PageCounter
          totalPage={paginatedNotifications.count}
          currentPage={page}
        />

        {paginatedNotifications.next ? (
          <AppButton
            name="Suivant"
            width="w-[150px]"
            color={`bg-bodydark2 text-boxdark dark:bg-meta-4 dark:text-white`}
            onClick={() => {
              increasePage();
              fetchNotifications(searchValue);
            }}
          />
        ) : (
          <span className="w-1"></span>
        )}
      </div>
    </DefaultLayout>
  );
};

export default NotificationsPage;
