"use client";
import React, { useState } from "react";
import { DataTable } from "./Table/data-table";

const DataTableContainer = (props: any) => {
  const [dayData, setDayData] = useState(props.data);
  return <DataTable data={dayData} columns={props.columns} />;
};

export default DataTableContainer;
