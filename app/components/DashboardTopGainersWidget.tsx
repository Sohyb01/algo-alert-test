import { fakeTopGainersData, randomWidths } from "../lib/displaydata";
import React from "react";
import { TopGainersRowProps } from "../lib/types";
import { DashboardTopGainersWidgetRow } from "./DashboardTopGainersWidgetRow";

const DashboardTopGainersWidget = (data: any) => {
  return (
    <div className="z-10 flex flex-col items-center text-start text-white rounded-[16px] bg-slate-700 px-4 py-6 shadowy-bg gap-4">
      <h5 className="text-lg font-bold w-full">Top Gainers</h5>
      {/* Title row */}
      <div className="flex items-center text-start w-full text-neutral-200">
        <div className="w-full text-base">Name</div>
        <div className="w-full text-base">Call</div>
        <div className="w-full text-base">Premium</div>
      </div>
      {/* Table */}
      <div className="flex flex-col gap-2 w-full font-bold">
        {/* Row */}
        {data.data.length >= 1 &&
          data.data.map((item: any, index: number) => {
            return (
              <DashboardTopGainersWidgetRow
                key={index}
                item={item}
                width={randomWidths[index]}
              />
            );
          })}
        {data.data.length === 0 &&
          fakeTopGainersData.map((item: TopGainersRowProps, index: number) => {
            // These are for the background progress styling for each of the rows, they are based
            // on the "width" property which is statically set in an array

            return (
              <DashboardTopGainersWidgetRow
                key={index}
                item={item.item}
                width={randomWidths[index]}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DashboardTopGainersWidget;
