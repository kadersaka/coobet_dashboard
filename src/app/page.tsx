import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Coobet Dashboard",
  description: "",
};

export default function Home() {
  return (
    <div className="dark:bg-meta-4">
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </div>
  );
}
