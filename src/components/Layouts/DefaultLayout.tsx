"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Loader from "../common/Loader";
import axios from "axios";
import api from "@/utils/api.util";
import PaginatedUsers from "@/models/paginated_user.model";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  /*
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("access");

    try {
      const response = await api.get<PaginatedUsers>(
        "https://api.coobet.app/auth/users?search_fields=oiuyrtaesy;'okjihugoytiyrtezxruoiouiyvuity",
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      window.location.href = "/auth/signin";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  */
  return (
    <>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <>
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex ">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}
          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col lg:ml-59">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}
            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="min-h-screen  max-w-screen-2xl  bg-whiter p-4 dark:bg-boxdark-2 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </>
      {/* )} */}
    </>
  );
}
