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
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { redirectManually } from "../actions/redirectAction";

const DataTableContainer = (props: any) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const datesArray = getPastMonthsWeekDays();

  const [dayData, setDayData] = useState(props.data);
  // const [loading, setLoading] = useState(false);

  // const handleSelectChange = async (event: { target: { value: any } }) => {

  //   setLoading(true);
  //   await fetchApiDataByDate(event.target.value).then((data) =>
  //     setDayData(data)
  //   );
  //   setLoading(false);
  // };

  console.log("aaaaa");
  console.log(searchParams.get("date"));
  return (
    <div className="flex flex-col items-start">
      {/* Date Input and label */}
      <div className="flex gap-4 items-center text-start text-white text-base">
        <p>
          Showing data for{" "}
          {searchParams.get("date") ? searchParams.get("date") : props.lastDate}
        </p>
        <select
          className="scroll-styling bg-slate-950 p-1"
          onChange={(e) => redirectManually(`?date=${e.target.value}`)}
          defaultValue="Select a date"
        >
          <option selected disabled className="bg-slate-900 hover:bg-slate-700">
            Select a date
          </option>
          <option className="bg-slate-900 hover:bg-slate-700">
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
      <DataTable data={dayData} columns={props.columns} />
    </div>
  );
};

export default DataTableContainer;
