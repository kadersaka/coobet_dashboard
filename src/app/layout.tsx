"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import ClubApi from "@/api/club.api";
import Club from "@/models/club.model";
import axios from "axios";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Removed fetchData from the dependency array

  return (
    <html lang="fr" className="bg-body dark:bg-boxdark-2 dark:text-bodydark ">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {children}
          {/* {loading ? <Loader /> : children} */}
        </div>
      </body>
    </html>
  );
}
