"use client";

import { FC } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultipleActionButton from "@/components/widget/Form/EditDeleteButton";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AppButton from "@/components/widget/Form/Button";
import { toggleModal } from "@/utils/functions.util";
import AdditionForm from "@/components/widget/Forms/AdditionForm";

interface UsersPageProps {}

const UsersPage: FC<UsersPageProps> = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Utilisateurs">
        <AppButton
          name="Ajouter"
          width="w-[150px]"
          onClick={() => {
            toggleModal("addition-form");
          }}
        />{" "}
      </Breadcrumb>
      <AdditionForm id="addition-form" />

      <div className="overflow-hidden rounded-sm text-black dark:text-white">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[1170px] border-collapse">
            {/* Table Header */}
            <thead className="bg-bodydark1 text-left dark:bg-meta-4">
              <tr>
                <th className="px-5 py-4 font-bold lg:px-7.5 2xl:px-11">
                  Name
                </th>
                <th className="px-5 py-4 font-bold lg:px-7.5 2xl:px-11">
                  Title
                </th>
                <th className="px-5 py-4 font-bold lg:px-7.5 2xl:px-11">
                  Email
                </th>
                <th className="px-5 py-4 font-bold lg:px-7.5 2xl:px-11">
                  Role
                </th>
                <th className="px-5 py-4 font-bold lg:px-7.5 2xl:px-11"></th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white dark:bg-boxdark">
              {Array.from({ length: 5 }).map((_, index) => (
                <tr
                  key={index}
                  className="border-t border-[#EEEEEE] dark:border-strokedark"
                >
                  <td className="px-5 py-4 lg:px-7.5 2xl:px-11">
                    Musharof Chowdhury
                  </td>
                  <td className="px-5 py-4 lg:px-7.5 2xl:px-11">
                    Multidisciplinary Web Entrepreneur
                  </td>
                  <td className="px-5 py-4 lg:px-7.5 2xl:px-11">
                    musharof@example.com
                  </td>
                  <td className="px-5 py-4 lg:px-7.5 2xl:px-11">Owner</td>
                  <td className="px-5 py-4 lg:px-7.5 2xl:px-11">
                    <MultipleActionButton />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;

{
  /* <div className="flex flex-col gap-10">
        <div className="overflow-hidden rounded-sm text-black dark:text-white">
          <div className="max-w-full overflow-x-auto">
            <div className="min-w-[1170px]">
              <div className="grid grid-cols-12 bg-bodydark1 px-5 py-4 dark:bg-meta-4 lg:px-7.5 2xl:px-11">
                <div className="col-span-3">
                  <h5 className="font-bold">Name</h5>
                </div>

                <div className="col-span-3">
                  <h5 className="font-bold">Title</h5>
                </div>

                <div className="col-span-3">
                  <h5 className="font-bold">Email</h5>
                </div>

                <div className="col-span-2">
                  <h5 className="font-bold">Role</h5>
                </div>
                <div className="col-span-2">
                  <h5 className="font-bold"></h5>
                </div>
              </div>
              

              
              <div className="bg-white dark:bg-boxdark">
                

                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 items-center border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11"
                  >
                    <div className="col-span-3">
                      <p className="">Musharof Chowdhury</p>
                    </div>

                    <div className="col-span-3">
                      <p className="">Multidisciplinary Web Entrepreneur</p>
                    </div>

                    <div className="col-span-3">
                      <p className="">musharof@example.com</p>
                    </div>

                    <div className="col-span-2">
                      <p className="">Owner</p>
                    </div>

                    <div className="col-span-1">
                      <MultipleActionButton />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */
}
