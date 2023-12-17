"use client";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full scroll-styling rounded-[16px] text-white">
      {/* Filters Container */}
      <div className="flex gap-4 items-center">
        {/* Ticker Filter */}
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter ticker..."
            value={
              (table.getColumn("a: Symbol")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("a: Symbol")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        {/* Execution Filter */}
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter execution..."
            value={
              (table.getColumn("f: Side")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("f: Side")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="lightglowbg" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination controls and pages label? */}
      <div className="flex gap-4 py-4 w-full justify-end">
        <button className="tablebutton" onClick={() => table.previousPage()}>
          Previous
        </button>
        <button className="tablebutton" onClick={() => table.nextPage()}>
          Next
        </button>
      </div>
    </div>
  );
}
