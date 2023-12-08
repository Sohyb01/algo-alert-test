"use client";
import { filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol } from "../lib/functions";
import { fakeTopGainersData, randomWidths } from "../lib/displaydata";
import React, { useEffect, useState } from "react";
import TopGainersHeroWidgetRow from "./TopGainersHeroWidgetRow";
import { TopGainersRowProps } from "../lib/types";

const fetchApiData = async () => {
  try {
    const response = await fetch(
      "https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/largest_trades?date=2023-12-01"
    );
    if (!response.ok) {
      return "Error";
      // throw new Error(`Error fetching API Data: ${response.status}`); will fix later
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const TopGainersWidget = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [topPremium, setTopPremium] = useState<any>([]); // The top 8 Options based on premium after sorting

  // Use effect to change the active index every 4 seconds
  useEffect(() => {
    // Define the function you want to run every 4 seconds
    const repeatedFunction = () => {
      if (activeIndex >= 7) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prev) => prev + 1);
      }
    };

    // Set up an interval to run the function every 4 seconds (4000 milliseconds)
    const intervalId = setInterval(repeatedFunction, 4000);

    // Cleanup: Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);

    // Dependencies array is empty to run the effect only once when the component mounts
  }, [activeIndex]);

  fetchApiData().then((resp) => {
    if (resp == "Error") {
      console.log("Error");
    } else {
      const objects = // The top 8 Objects with only the required properties to be displayed
        filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol([...resp]); // Make a copy to avoid mutating original

      objects.sort((a, b) => b.trade_value - a.trade_value); // Sort by trade_value property value

      const top8 = objects.slice(0, 8).map((item) => ({
        symbol: item["a: Symbol"],
        contract: item["c: C/P"],
        premium: item["trade_value"],
      })); // The top 8 which will be displayed

      setTopPremium(top8); // Store them in a UseState
      console.log(top8);
    }
  });

  return (
    <div className="z-10 flex flex-col items-center text-start text-white rounded-[16px] bg-slate-700 px-4 py-6 shadowy-bg min-w-[437px] lg:w-full gap-4 lg:max-w-[544px]">
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
        {topPremium.length >= 1 &&
          topPremium.map((item: any, index: number) => {
            return (
              <TopGainersHeroWidgetRow
                key={index}
                item={item}
                isActive={activeIndex === index}
                width={item.width}
              />
            );
          })}
        {topPremium.length === 0 &&
          fakeTopGainersData.map((item: TopGainersRowProps, index: number) => {
            // These are for the background progress styling for each of the rows, they are based
            // on the "width" property which is statically set in an array

            return (
              <TopGainersHeroWidgetRow
                key={index}
                item={item.item}
                isActive={activeIndex === index}
                width={item.width}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TopGainersWidget;
