"use client";
//import "jsvectormap/dist/jsvectormap.css";
//import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Removed fetchData from the dependency array

  return (
    <html lang="fr" className="bg-body dark:bg-boxdark-2 dark:text-bodydark ">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
      </body>
    </html>
  );
}
