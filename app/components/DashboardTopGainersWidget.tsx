"use client";
import { randomWidths } from "../lib/displaydata";
import React, { useState } from "react";
import { DashboardTopGainersWidgetRow } from "./DashboardTopGainersWidgetRow";
import LoadingSmall from "./LoadingSmall";
import { fetchApiData, getTopGainersWidgetData } from "../lib/functions";

const DashboardTopGainersWidget = () => {
  const [topPremium, setTopPremium] = useState<any>([]);

  const getTopPremiumData = async () => {
    if (topPremium.length === 0) {
      const baseApiData = await fetchApiData();
      const topPremium = await getTopGainersWidgetData(baseApiData);
      setTopPremium(topPremium);
    }
  };
  getTopPremiumData();

  return (
    <div className="flex flex-col items-center text-start text-white rounded-[16px] bg-slate-700 px-4 py-6 glowbg gap-4 glow-shadow">
      <h5 className="text-lg font-bold w-full">Top Gainers</h5>
      {/* Title row */}
      <div className="flex items-center text-start w-full text-neutral-200">
        <div className="w-full text-base">Name</div>
        <div className="w-full text-base">Call / Put</div>
        <div className="w-full text-base">Premium</div>
      </div>
      {/* Table */}
      {topPremium.length > 0 ? (
        <div className="flex flex-col gap-2 w-full font-bold">
          {/* Row */}
          {topPremium.map((item: any, index: number) => {
            return (
              <DashboardTopGainersWidgetRow
                key={index}
                item={item}
                width={randomWidths[index]}
              />
            );
          })}
        </div>
      ) : (
        <LoadingSmall />
      )}
    </div>
  );
};

export default DashboardTopGainersWidget;
