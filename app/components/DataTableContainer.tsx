"use client";
import React, { useState } from "react";
import { DataTable } from "./Table/data-table";
import {
  fetchApiDataByDate,
  getOptionsMarketStatus,
  getOptionsMarketStatusExternalApi,
  getPastMonthsWeekDays,
} from "../lib/functions";
import Loading from "../loading";

const DataTableContainer = (props: any) => {
  const datesArray = getPastMonthsWeekDays();

  const [dayData, setDayData] = useState(props.data);
  const [loading, setLoading] = useState(false);

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
      <div className="flex gap-2 items-center text-start text-white text-base">
        <p>Current date:</p>
        <select
          className="scroll-styling bg-slate-950 p-1"
          onChange={handleSelectChange}
        >
          <option
            className="bg-slate-900 hover:bg-slate-700"
            defaultValue={props.lastDate}
          >
            {props.lastDate}
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
      {loading ? (
        <Loading />
      ) : (
        <DataTable data={dayData} columns={props.columns} />
      )}
    </div>
  );
};

export default DataTableContainer;
