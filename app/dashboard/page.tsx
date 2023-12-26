import { redirect } from "next/navigation"; // In order to redirect in case of not being authorized
import { getServerSession } from "next-auth";

import DashboardTopGainersWidget from "../components/DashboardTopGainersWidget";
import DashboardHottestOptionsWidget from "../components/DashboardHottestOptionsWidget";
import DashboardContractsWidget from "../components/DashboardContractsWidget";
import {
  analyzeTrades,
  convertPropertiesToNumbers,
  fetchApiData,
  fetchHottestOptionsApiData,
  filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol,
  getHottestOptionsData,
  getOptionsMarketStatusExternalApi,
  getTopGainersWidgetData,
  getTopHottestOptionsByTotalSize,
} from "../lib/functions";
import Image from "next/image";
import Loading from "../components/Loading";
import { DataTable } from "../components/Table/data-table";
import { columns } from "../components/Table/columns";
import { authOptions } from "../api/auth/[...nextauth]/options";
import DataTableContainer from "../components/DataTableContainer";
import { useEffect } from "react";

// Main component
const DashboardPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  // OAuth Authentication:
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user) {
  //   redirect("/api/auth/signin");
  // } else if (!session.user.isActive) {
  //   redirect("/free-option");
  // }

  // Fetch the Main API data (not the hottest options!)

  const searchParamDate = Array.isArray(searchParams.date)
    ? searchParams.date[0]
    : searchParams.date;
  console.log(searchParamDate);

  const baseApiData = await fetchApiData(
    searchParamDate ? searchParamDate : null
  );

  const topPremium = await getTopGainersWidgetData(baseApiData);
  const contractsData = await analyzeTrades(baseApiData);
  const mainTableData = await convertPropertiesToNumbers(baseApiData);

  const secondApiData = await fetchHottestOptionsApiData();
  const hottestOptions = await getHottestOptionsData(secondApiData);
  const lastDate = await getOptionsMarketStatusExternalApi();

  return (
    <main className="min-h-[100vh] py-8 pt-[164px] flex flex-col lg:flex-row items-center lg:items-start overflow-hidden gap-4 px-4 md:px-8 xl:px-20 w-full">
      {baseApiData !== undefined && baseApiData.length > 0 ? (
        <>
          {/* Left Side - Top Gainers, Hottest Options*/}
          <div className="flex flex-col gap-4 w-full lg:max-w-[404px] lg:min-w-[404px]">
            <DashboardTopGainersWidget data={topPremium} />
            <DashboardHottestOptionsWidget data={hottestOptions} />
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
            <DashboardContractsWidget data={contractsData} />
            <DataTableContainer
              lastDate={lastDate}
              data={mainTableData}
              columns={columns}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default DashboardPage;
