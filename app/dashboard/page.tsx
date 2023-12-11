"use client";
import React, { useEffect, useState } from "react";
import DashboardTopGainersWidget from "../components/DashboardTopGainersWidget";
import DashboardHottestOptionsWidget from "../components/DashboardHottestOptionsWidget";
import DashboardMainDataTable from "../components/DashboardMainDataTable";
import DashboardContractsWidget from "../components/DashboardContractsWidget";
import {
  analyzeTrades,
  // fetchApiData,
  // fetchHottestOptionsApiData,
  filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol,
  getTopHottestOptionsByTotalSize,
} from "../lib/functions";
import Image from "next/image";
import Loading from "../components/Loading";
import { fetchApiDataOnServer } from "../lib/actions/fetchMainApiData";
import { fetchHottestOptionsApiDataOnServer } from "../lib/actions/fetchHottestOptionsData";

const DashboardPage = () => {
  const [baseApiData, setBaseApiData] = useState<any>([]);
  const [secondApiData, setSecondApiData] = useState<any>([]); // Data for the second API, which includes the hottest options
  const [topPremium, setTopPremium] = useState<any>([]); // Data for Top Gainers Widget, The top 8 Options based on Premium after sorting
  const [hottestOptions, setHottestOptions] = useState<any>([]);
  const [contractsData, setContractsData] = useState<any>({});
  // Get the Top Gainers Widget Data, set it in the topPremium useState
  const getTopGainersWidgetData = () => {
    const objects = // The top 8 Objects with only the required properties to be displayed
      filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol([
        ...baseApiData,
      ]); // Make a copy to avoid mutating original

    objects.sort((a, b) => b.trade_value - a.trade_value); // Sort by trade_value property value

    const top8 = objects.slice(0, 8).map((item) => ({
      symbol: item["a: Symbol"],
      contract: item["c: C/P"],
      premium: item["trade_value"],
    })); // The top 8 which will be displayed

    setTopPremium(top8); // Store them in a UseState which will be displayed in the top gainers widget
  };
  // Get hottest option data
  const getHottestOptionsData = () => {
    const objects = // The top Objects with only the required properties to be displayed
      getTopHottestOptionsByTotalSize([...secondApiData]); // Make a copy to avoid mutating original
    setHottestOptions(objects);
  };

  // Fetch the Main API data (not the hottest options!)
  fetchApiDataOnServer().then((data) => {
    console.log("data received on front end! length:");
    setBaseApiData(data);
    getTopGainersWidgetData(); // Organizes and stores the required Data for the TopGainersWidget in the usestate called "topPremium"
    setContractsData(analyzeTrades(baseApiData));
  });
  fetchHottestOptionsApiDataOnServer().then((data) => {
    setSecondApiData(data);
    getHottestOptionsData();
  });

  return (
    <main className="min-h-[100vh] py-8 pt-[164px] flex flex-col lg:flex-row items-center lg:items-start w-full overflow-hidden section gap-4">
      {baseApiData.length > 0 ? (
        <>
          {/* Left Side - Top Gainers, Hottest Options*/}
          <div className="flex flex-col gap-4 w-full lg:max-w-[404px]">
            <DashboardTopGainersWidget data={topPremium} />
            <DashboardHottestOptionsWidget data={hottestOptions} />
          </div>
          {/* Right Side - Refresh/Filters Widget, Contract (Green/Red) Widgets, Main Data Table */}
          <div className="flex flex-col gap-4 w-full lg:max-w-[596px] xl:max-w-[860px]">
            {/* Filters Widget */}
            <div className="flex items-center justify-between p-6 glowbg rounded-[16px] text-white glow-shadow-white">
              <h2 className="text-lg font-bold">Options Order Flow</h2>
              {/* Buttons (Refresh and Filters) */}
              <div className="flex items-center gap-8 text-base">
                <button className="underline flex items-center gap-1.5">
                  Refresh
                  <Image src="/Refresh.svg" width={16} height={16} alt="" />
                </button>
                <button className="px-6 py-2 rounded-full bg-teal-500 flex items-center gap-1">
                  Filter
                  <Image src="/Filter.svg" width={24} height={24} alt="" />
                </button>
              </div>
            </div>
            <DashboardContractsWidget data={contractsData} />
            <DashboardMainDataTable data={baseApiData} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default DashboardPage;
