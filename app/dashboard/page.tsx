import DashboardTopGainersWidget from "../components/DashboardTopGainersWidget";
import DashboardHottestOptionsWidget from "../components/DashboardHottestOptionsWidget";
import DashboardContractsWidget from "../components/DashboardContractsWidget";

import Image from "next/image";
import { columns } from "../components/Table/columns";
import DataTableContainer from "../components/DataTableContainer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
import {
  fetchApiData,
  fetchApiDataByDate,
  getOptionsMarketStatusAsync,
} from "../lib/functions";

// Main component
const DashboardPage = async () => {
  // OAuth Authentication:
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user) {
  //   redirect("/api/auth/signin");
  // } else if (!session.user.isActive) {
  //   redirect("/free-option");
  // }

  return (
    <main className="min-h-[100vh] py-8 pt-[164px] flex flex-col lg:flex-row items-center lg:items-start overflow-hidden gap-4 px-4 md:px-8 xl:px-20 w-full">
      {/* Left Side - Top Gainers, Hottest Options*/}
      <div className="flex flex-col gap-4 w-full lg:max-w-[404px] lg:min-w-[404px]">
        <DashboardTopGainersWidget />
        <DashboardHottestOptionsWidget />
      </div>
      {/* Right Side - Refresh/Filters Widget, Contract (Green/Red) Widgets, Main Data Table */}
      <div className="flex flex-col gap-4 widtheq">
        {/* Filters Widget */}
        <div className="flex items-center justify-between p-6 glowbg rounded-[16px] text-white glow-shadow-white">
          <h2 className="flex items-center text-lg font-bold gap-4">
            Options Order Flow{" "}
          </h2>
          <button className="underline flex items-center gap-1.5">
            Refresh
            <Image src="/Refresh.svg" width={16} height={16} alt="" />
          </button>
        </div>
        <DashboardContractsWidget />
        <DataTableContainer columns={columns} />
      </div>
    </main>
  );
};

export default DashboardPage;
