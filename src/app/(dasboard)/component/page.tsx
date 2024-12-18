"use client";

import TableFour from "@/components/Tables/TableFour";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import { FC } from "react";

interface ComponentPageProps {}

const ComponentPage: FC<ComponentPageProps> = () => {
  return (
    <div className="h-full w-full items-center justify-center">
      <div className="my-10">
        <TableOne />
      </div>

      <div className="my-10">
        <TableTwo />
      </div>

      <div className="my-10">
        <TableThree />
      </div>

      <div className="my-10">
        <TableFour />
      </div>
    </div>
  );
};

export default ComponentPage;
