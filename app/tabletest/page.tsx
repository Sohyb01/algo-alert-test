import { convertPropertiesToNumbers, fetchApiData } from "../lib/functions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function DemoPage() {
  const baseApiData = await fetchApiData();

  const data = await convertPropertiesToNumbers(baseApiData);

  return (
    <div className="container mx-auto py-[200px] text-white">
      <DataTable columns={columns} data={data !== undefined ? data : []} />
    </div>
  );
}
