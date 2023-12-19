import { redirect } from "next/navigation"; // In order to redirect in case of not being authorized
import { getServerSession } from "next-auth";

import DashboardTopGainersWidget from "../components/DashboardTopGainersWidget";
import DashboardHottestOptionsWidget from "../components/DashboardHottestOptionsWidget";
import DashboardContractsWidget from "../components/DashboardContractsWidget";
import {
  convertPropertiesToNumbers,
  fetchApiData,
  fetchHottestOptionsApiData,
  filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol,
  getOptionsMarketStatus,
  getTopHottestOptionsByTotalSize,
} from "../lib/functions";
import Image from "next/image";
import Loading from "../components/Loading";
import { DataTable } from "../components/Table/data-table";
import { columns } from "../components/Table/columns";
import { authOptions } from "../api/auth/[...nextauth]/options";

const getTopGainersWidgetData = async (data: any) => {
  const objects = // The top 8 Objects with only the required properties to be displayed
    filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol([...data]); // Make a copy to avoid mutating original

  objects.sort((a, b) => b.trade_value - a.trade_value); // Sort by trade_value property value

  const top8 = objects.slice(0, 8).map((item) => ({
    symbol: item["a: Symbol"],
    contract: item["c: C/P"],
    premium: item["trade_value"],
  })); // The top 8 which will be displayed

  return top8; // Store them in a UseState which will be displayed in the top gainers widget
};
const getHottestOptionsData = async (data: any) => {
  const objects = // The top Objects with only the required properties to be displayed
    getTopHottestOptionsByTotalSize([...data]); // Make a copy to avoid mutating original
  return objects;
};
const analyzeTrades = async (trades: any) => {
  // Initialize counters and sums
  let callCount = 0;
  let putCount = 0;
  let callTradeSum = 0;
  let putTradeSum = 0;

  // Iterate through the array of objects
  for (const trade of trades) {
    // Check the value of the "c: C/P" property
    if (trade["c: C/P"] === "CALL") {
      callCount++;
      callTradeSum += parseInt(trade["g: Size"]);
    } else if (trade["c: C/P"] === "PUT") {
      putCount++;
      putTradeSum += parseInt(trade["g: Size"]);
    }
  }

  let totalFlows = callCount + putCount;
  const callFlowPercentage = Math.round(1000 * (callCount / totalFlows)) / 10;
  const putFlowPercentage = Math.round(1000 * (putCount / totalFlows)) / 10;

  let totalPremiums = callTradeSum + putTradeSum;
  const callPremiumPercentage =
    Math.round(1000 * (callTradeSum / totalPremiums)) / 10;
  const putPremiumPercentage =
    Math.round(1000 * (putTradeSum / totalPremiums)) / 10;

  // Create and return the result object
  const result = {
    callFlows: callCount,
    callFlowsPercentage: callFlowPercentage,
    callPremiumSum: callTradeSum,
    callPremiumPercentage: callPremiumPercentage,
    putFlows: putCount,
    putFlowsPercentage: putFlowPercentage,
    putPremiumSum: putTradeSum,
    putPremiumPercentage: putPremiumPercentage,
  };

  return result;
};

// Main component
const DashboardPage = async () => {
  // OAuth Authentication:
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  } else if (!session.user.isActive) {
    redirect("/free-option");
  }

  // Fetch the Main API data (not the hottest options!)
  const baseApiData = await fetchApiData();

  const secondApiData = await fetchHottestOptionsApiData();

  const topPremium = await getTopGainersWidgetData(baseApiData);

  const hottestOptions = await getHottestOptionsData(secondApiData);

  const contractsData = await analyzeTrades(baseApiData);

  const mainTableData = await convertPropertiesToNumbers(baseApiData);

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
          <div className="flex flex-col gap-4 lg:widtheq">
            {/* Filters Widget */}
            <div className="flex items-center justify-between p-6 glowbg rounded-[16px] text-white glow-shadow-white">
              <h2 className="flex items-center text-lg font-bold gap-4">
                Options Order Flow{" "}
                <span className="text-neutral-300 text-sm">
                  {getOptionsMarketStatus()}
                </span>
              </h2>
              <button className="underline flex items-center gap-1.5">
                Refresh
                <Image src="/Refresh.svg" width={16} height={16} alt="" />
              </button>
            </div>
            <DashboardContractsWidget data={contractsData} />
            <DataTable data={mainTableData} columns={columns} />
            {/* <DashboardMainDataTable data={baseApiData} /> */}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default DashboardPage;
