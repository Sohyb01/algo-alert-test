import React from "react";
import {
  convertPropertiesToNumbers,
  fetchApiData,
  filterObjectsBySymbol,
} from "../lib/functions";
import { DataTable } from "../components/Table/data-table-free";
import { columns } from "../components/Table/columns";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { freeSymbol } from "../lib/displaydata";

const FreeOptionPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const freeApiData = await fetchApiData();

  const freeTableData = await convertPropertiesToNumbers(freeApiData);

  const displayTableData = await filterObjectsBySymbol(
    freeTableData,
    freeSymbol
  );

  return (
    <main className="min-h-[100vh] py-8 pt-[164px] flex flex-col lg:flex-row items-center w-full overflow-hidden section gap-4">
      <DataTable data={displayTableData} columns={columns} />
    </main>
  );
};

export default FreeOptionPage;
