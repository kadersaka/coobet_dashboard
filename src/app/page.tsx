import Dashboard from "@/components/Dashboard/Dashboard";
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
        <Dashboard />
      </DefaultLayout>
    </div>
  );
}
