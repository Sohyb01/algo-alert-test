import { fakeTopGainersData, randomWidths } from "../lib/displaydata";
import React from "react";
import { TopGainersRowProps } from "../lib/types";
import { DashboardTopGainersWidgetRow } from "./DashboardTopGainersWidgetRow";
import LoadingSmall from "./LoadingSmall";

const DashboardTopGainersWidget = (data: any) => {
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
      {data.data.length > 0 ? (
        <div className="flex flex-col gap-2 w-full font-bold">
          {/* Row */}
          {data.data.map((item: any, index: number) => {
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
