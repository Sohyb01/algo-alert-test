"use client";
import React, { useEffect, useState } from "react";
import DashboardTopGainersWidget from "../components/DashboardTopGainersWidget";
import DashboardHottestOptionsWidget from "../components/DashboardHottestOptionsWidget";
import DashboardMainDataTable from "../components/DashboardMainDataTable";
import DashboardContractsWidget from "../components/DashboardContractsWidget";
import {
  fetchApiData,
  filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol,
} from "../lib/functions";
import Image from "next/image";

const DashboardPage = () => {
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

  const [baseApiData, setBaseApiData] = useState<any>([]);
  const [topPremium, setTopPremium] = useState<any>([]); // Data for Top Gainers Widget, The top 8 Options based on Premium after sorting

  fetchApiData().then((realdata) => {
    setBaseApiData(realdata);
    getTopGainersWidgetData(); // Organizes and stores the required Data for the TopGainersWidget in the usestate called "topPremium"
    return;
  });

  return (
    <main className="min-h-[100vh] py-8 pt-[164px] flex flex-col lg:flex-row items-center lg:items-start w-full overflow-hidden section gap-x-4">
      {/* Left Side - Top Gainers, Hottest Options*/}
      <div className="flex flex-col gap-4 w-full lg:max-w-[404px]">
        <DashboardTopGainersWidget data={topPremium} />
        <DashboardHottestOptionsWidget />
      </div>
      {/* Right Side - Refresh/Filters Widget, Contract (Green/Red) Widgets, Main Data Table */}
      <div className="flex flex-col gap-4 w-full">
        {/* Filters Widget */}
        <div className="flex items-center justify-between p-6 glowbg rounded-[8px] text-white">
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
        <DashboardContractsWidget />
        <DashboardMainDataTable />
      </div>
    </main>
  );
};

export default DashboardPage;
