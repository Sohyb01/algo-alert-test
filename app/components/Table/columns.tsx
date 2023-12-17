"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DatatableRowProps } from "../../lib/types";
import { formatNumberWithCommas } from "../../lib/functions";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<DatatableRowProps>[] = [
  {
    accessorKey: "b: Time",
    header: ({ column }) => {
      return (
        <button
          className="tableheader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm text-start">
          {`${row.getValue("b: Time")}`.split(" ")[0]} <br />
          <span className="text-neutral-400">
            {`${row.getValue("b: Time")}`.split(" ")[1]}
          </span>
        </span>
      );
    },
  },
  { accessorKey: "a: Symbol", header: "Ticker" },
  {
    accessorKey: "e: Exp Date",
    header: ({ column }) => {
      return (
        <button
          className="tableheader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expiration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "d: Strike",
    header: ({ column }) => {
      return (
        <button
          className="tableheader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Strike
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "c: C/P",
    header: ({ column }) => {
      return (
        <button
          className="tableheader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contract
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className={`${row.getValue("c: C/P")}`}>
          {`${row.getValue("c: C/P")}`}
        </span>
      );
    },
  },
  {
    accessorKey: "g: Size",
    header: ({ column }) => {
      return (
        <button
          className="tableheader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "h: Price",
    header: ({ column }) => {
      return (
        <button
          className="tableheader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "trade_value",
    header: ({ column }) => {
      return (
        <button
          className="tableheader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Premium
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <span
          className={`${
            row.getValue("c: C/P") === "CALL"
              ? `text-green-400`
              : `text-red-400`
          }`}
        >
          ${formatNumberWithCommas(`${row.getValue("trade_value")}`)}
        </span>
      );
    },
  },
  {
    accessorKey: "f: Side",
    header: "Execution",
    cell: ({ row }) => {
      return (
        <span className={`${row.getValue("f: Side")}`}>
          {`${row.getValue("f: Side")}`}
        </span>
      );
    },
  },
  { accessorKey: "j: DTE", header: "DTE" },
  {
    accessorKey: "l: Volume",
    header: ({ column }) => {
      return (
        <button
          className="tableheader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Volume
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "m: Open Interest",
    header: ({ column }) => {
      return (
        <button
          className="tableheader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Open Interest
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "k: Spot Price",
    header: ({ column }) => {
      return (
        <button
          className="tableheader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Spot Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "n: Trade",
    header: ({ column }) => {
      return (
        <button
          className="tableheader"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
];
