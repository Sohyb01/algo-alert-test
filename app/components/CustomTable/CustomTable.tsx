import React, { useEffect, useState } from "react";
import Row from "./Row";
import BackgroundTable from "/CustomTableBackground.png";
import FakeRow from "./FakeRow";

const fetchApiData = async () => {
  try {
    const response = await fetch(
      "https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/largest_trades?date=2023-12-01",
    );
    if (!response.ok) {
      throw new Error(`Error fetching API Data: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
const fakeData = [
  { symbol: "SPXW", contract: "CALL", trade_value: 375534680, width: "89%" },
  { symbol: "NVDA", contract: "CALL", trade_value: 10180000, width: "73%" },
  { symbol: "MRNA", contract: "PUT", trade_value: 8583900, width: "66%" },
  { symbol: "SPX", contract: "CALL", trade_value: 7808000, width: "57%" },
  { symbol: "FSLR", contract: "PUT", trade_value: 7017500, width: "50%" },
  { symbol: "IWM", contract: "PUT", trade_value: 6936960, width: "44%" },
  { symbol: "TSLA", contract: "PUT", trade_value: 6019500, width: "40%" },
  { symbol: "QQQ", contract: "CALL", trade_value: 4809999, width: "33%" },
];
const randomWidths = [
  "w-[90%]",
  "w-[82%]",
  "w-[80%]",
  "w-[70%]",
  "w-[60%]",
  "w-[52%]",
  "w-[33%]",
  "w-[27%]",
];

const CustomTable: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [apiData, setApiData] = useState<any>([]);
  const [topPremium, setTopPremium] = useState<any>([]); // The top 8 Options based on premium after sorting

  const filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol = (
    objects: object[],
  ) => {
    const groupedObjects = objects.reduce((groups: any, obj: any) => {
      const symbol = obj["a: Symbol"];
      groups[symbol] = groups[symbol] || [];
      groups[symbol].push(obj);
      return groups;
    }, {});

    const filteredObjects = Object.values(groupedObjects).map((group: any) => {
      const maxTradeValueObj = group.reduce((maxObj: any, obj: any) => {
        return obj["trade_value"] > maxObj["trade_value"] ? obj : maxObj;
      }, group[0]);

      return maxTradeValueObj;
    });

    return filteredObjects;
  };

  // Fetch the data
  fetchApiData().then((realdata) => {
    // Function to generate a random width between 30% and 90%

    setApiData(realdata); // Store it in the UseState

    const objects =
      filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol([
        ...apiData,
      ]); // Make a copy to avoid mutating original

    objects.sort((a, b) => b.trade_value - a.trade_value); // Sort by trade_value property value

    const top8 = objects.slice(0, 8).map((item) => ({
      symbol: item["a: Symbol"],
      contract: item["c: C/P"],
      trade_value: item["trade_value"],
    })); // The top 8 which will be displayed

    // Create an array of random widths

    setTopPremium(top8); // Store them in a UseState
  });

  // Interval for Animations
  useEffect(() => {
    setActiveIndex(0);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 8);
    }, 4000);
    console.log(activeIndex);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`border border-cyan-400/5 md:-translate-y-[50px] scale-90 md:scale-100 md:translate-x-1/4 mx-auto lg:mx-0 lg:w-full h-full xl:mx-auto  2xl:w-[550px] 2xl:py-[3rem] 2xl:px-[3rem] flex flex-col justify-start bg-cover py-[2rem] px-[2.5rem] rounded-3xl gap-[1.2rem]`}
      style={{
        backgroundImage: `url(${BackgroundTable})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Heading  */}
      <h2 className="text-[#FFFFFF80] font-semibold text-[1rem] 2xl:text-[20px] text-left">
        Top Gainers
      </h2>
      {/* Table  */}
      <div className="h-auto flex flex-col items-center justify-start text-center gap-2 ">
        {/* Table Header  */}
        <div className="w-full grid grid-cols-3 bg-transparent bg-opacity-40 py-3 rounded-lg">
          {/* ==> Col 1  */}
          <div className="text-[.8rem] 2xl:col-span-1 2xl:text-[18px] bg-transparent font-normal text-white text-left">
            Symbol
          </div>
          {/* ==> Col 2  */}
          <div className="text-[.8rem] 2xl:col-span-1 2xl:text-[18px] bg-transparent font-normal text-white text-left">
            Contract
          </div>
          {/* ==> Col 3  */}
          <div className="text-[.8rem] 2xl:col-span-1  2xl:text-[18px] bg-transparent font-normal text-white text-left">
            Premium
          </div>
        </div>
        {/* Table Body  */}
        <div
          className={`w-full flex flex-col items-center justify-start gap-1`}
        >
          {/* ==> Table rows (Map the data with this row component )  */}
          {/* ==> Make each row as a separate component to keep it as a separate entity */}
          {/* {mappedData.map((item, index) => (
            <Row item={item} key={item.id} isActive={index === activeIndex} />
          ))} */}
          {topPremium.length === 0 &&
            fakeData.map((option: any, index: number) => {
              console.log(index);
              console.log(activeIndex);
              return (
                <FakeRow
                  item={option}
                  key={index}
                  isActive={index === activeIndex}
                  width={randomWidths[index]}
                />
              );
            })}
          {topPremium.length !== 0 &&
            topPremium.map((option: any, index: number) => (
              <Row
                item={option}
                key={index}
                isActive={index === activeIndex}
                width={randomWidths[index]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
