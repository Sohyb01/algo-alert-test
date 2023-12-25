"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./Table/data-table";
import {
  fetchApiData,
  fetchApiDataByDate,
  getOptionsMarketStatus,
  getPastMonthsWeekDays,
} from "../lib/functions";
import LoadingSmall from "./LoadingSmall";

const DataTableContainer = (props: any) => {
  const [dayData, setDayData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const datesArray = getPastMonthsWeekDays();

  const getTodaysData = async () => {
    if (dayData.length === 0) {
      const todaysData = await fetchApiData();
      setDayData(todaysData);
      setLoading(false);
    }
  };
  getTodaysData();

  const handleSelectChange = async (event: { target: { value: any } }) => {
    setLoading(true);
    await fetchApiDataByDate(event.target.value).then((data) =>
      setDayData(data)
    );
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-start">
      {/* Date Input and label */}
      {!loading && (
        <div className="flex gap-2 items-center text-start text-white text-base">
          <p>Current date:</p>
          <select
            className="scroll-styling bg-slate-950 p-1"
            onChange={handleSelectChange}
          >
            <option
              className="bg-slate-900 hover:bg-slate-700"
              defaultValue={getOptionsMarketStatus()}
            >
              {getOptionsMarketStatus()}
            </option>
            {datesArray.map((date, index) => (
              <option
                className="bg-slate-900 hover:bg-slate-700"
                key={index}
                value={date}
              >
                {date}
              </option>
            ))}
          </select>
        </div>
      )}
      {loading || dayData.length === 0 ? (
        <LoadingSmall />
      ) : (
        <DataTable data={dayData} columns={props.columns} />
      )}
    </div>
  );
};

export default DataTableContainer;
