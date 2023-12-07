"use client";
import React from "react";
import { fakeTopGainersData } from "../lib/displaydata";

const TopGainersWidget = () => {
  return (
    <div className="flex flex-col items-center text-start text-white rounded-[16px] bg-slate-700 px-4 py-6 md:absolute md:left-[53%] md:top-20 lg:left-0 lg:bottom-0 lg:top-0 lg:relative shadowy-bg w-[437px] lg:w-full gap-4 max-w-[544px]">
      <h5 className="text-lg font-bold w-full">Top Gainers</h5>
      {/* Title row */}
      <div className="flex items-center text-start w-full text-neutral-200">
        <div className="w-full">Name</div>
        <div className="w-full">Call</div>
        <div className="w-full">Premium</div>
      </div>
      {/* Table */}
      <div className="flex flex-col gap-2 w-full font-bold">
        {/* Row */}
        {fakeTopGainersData.map((row, index) => {
          // These are for the background progress styling for each of the rows, they are based
          // on the "width" property which is statically set in an array
          const widthString = "w-[" + row.width + "%]";
          const opacityString =
            parseInt(row.width) >= 85
              ? "opacity-100"
              : parseInt(row.width) >= 60
              ? "opacity-80"
              : parseInt(row.width) >= 45
              ? "opacity-60"
              : "opacity-25";

          return (
            <div
              key={index}
              className="p-2 flex items-center text-start w-full text-neutral-200 relative"
            >
              <div className="w-full z-[1]">{row.symbol}</div>
              <div className="w-full z-[1]">{row.contract}</div>
              <div className="w-full z-[1]">${row.trade_value}</div>
              {/* Background (Stop at 94% Width) */}
              <div
                className={`absolute h-[39px] bg-teal-500 rounded-[12px] -left-0.5 ${widthString} ${opacityString} max-w-full`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopGainersWidget;
