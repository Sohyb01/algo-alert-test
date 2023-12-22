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
    onGlobalFilterChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  React.useEffect(() => {
    table.setSorting([
      {
        id: "b: Time",
        desc: false,
      },
    ]);
    table.setPageSize(1000);
  }, [table]);

  return (
    <div className="w-full max-w-[100%] scroll-styling rounded-[16px] text-white">
      <div className="flex gap-4 py-4 w-full justify-between items-center">
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
      </div>
      <div className="h-[800px] relative overflow-auto scroll-styling">
        <Table className="overflow-x-auto scroll-styling glow-shadow-white rounded-[8px]">
          <TableHeader className="sticky top-0">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination controls and pages label? */}
      <div className="flex gap-4 py-4 w-full justify-end items-center">
        <p>
          Page {table.getState().pagination.pageIndex + 1} out of{" "}
          {table.getPageCount()}
        </p>
        <button
          disabled={!table.getCanPreviousPage()}
          className="tablebutton"
          onClick={() => {
            table.previousPage();
          }}
        >
          Previous
        </button>
        <button
          disabled={!table.getCanNextPage()}
          className="tablebutton"
          onClick={() => {
            table.nextPage();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
