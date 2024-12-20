"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import PageCounter from "@/components/common/PageCounter";
import ActionResult from "@/components/widget/Form/ActionResultMessage";
import AppButton from "@/components/widget/Form/Button";
import NotificationCard from "@/components/widget/NotificationCard";
import useNotificationStore from "@/store/useNotification.store";
import useSearchStore from "@/store/useSearchStore.store";
import { FC, useEffect } from "react";

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
    pageSize,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotifications(searchValue);
  }, [fetchNotifications, searchValue]);

  return (
    <>
      <Breadcrumb
        pageName="Notifications"
        onClick={() => fetchNotifications(searchValue)}
      />

      <ActionResult />

      <div className="max-w-full ">
        {loading ? (
          <ProcessingLoader />
        ) : (
          <div className=" grid grid-cols-1 gap-4 rounded-sm text-black dark:text-white md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedNotifications?.results?.map((notification, index) => (
              <NotificationCard
                key={index}
                title={notification.title}
                content={notification.content}
                createdAt={notification.createdAt}
                isReaded={notification.isReaded}
              />
            ))}
          </div>
        )}
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
          pageSize={pageSize}
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
    </>
  );
};

export default NotificationsPage;
