import React from "react";

const DashboardMainDataTable = (data: any) => {
  return (
    <div className="overflow-x-auto w-full lg:max-w-[596px] xl:max-w-[860px] scroll-styling max-h-[800px] rounded-[8px]">
      <table className="table table-pin-rows">
        <thead>
          <tr className="flex w-full items-center gap-4 py-4 px-6 glowbg text-neutral-300 text-base">
            <td className="w-[120px] p-0 text-start">Time</td>
            <td className="w-[120px] p-0 text-start">Ticker</td>
            <td className="w-[120px] p-0 text-start">Expiration</td>
            <td className="w-[120px] p-0 text-start">Strike Price</td>
            <td className="w-[120px] p-0 text-start">Contract</td>
            <td className="w-[120px] p-0 text-start">Size @ price</td>
            <td className="w-[120px] p-0 text-start">Premium</td>
            <td className="w-[120px] p-0 text-start">Execution</td>
            <td className="w-[120px] p-0 text-start">DTE</td>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.data.map((item: any, index: any) => {
            const callOrPut = item["c: C/P"] === "CALL" ? "CALL" : "PUT";
            return (
              <tr
                key={index}
                className="flex w-full items-center gap-4 py-4 px-6 border-solid border-slate-400 border-t-[1px] text-white"
              >
                {/* Date and Time */}
                <td className="w-[120px] p-0 text-sm text-start">
                  {item["b: Time"].split(" ")[0]}
                  <br />
                  <span className="text-neutral-400">
                    {item["b: Time"].split(" ")[1]}
                  </span>
                </td>
                {/* Symbol */}
                <td className="w-[120px] p-0 text-start">
                  {item["a: Symbol"]}
                </td>
                {/* Expiration Date */}
                <td className="w-[120px] p-0 text-start">
                  {item["e: Exp Date"]}
                </td>
                {/* Strike Price */}
                <td className="w-[120px] p-0 text-start">
                  ${item["d: Strike"]}
                </td>
                {/* Contract (C/P) */}
                <td className="w-[120px] p-0 text-start">
                  <span className={item["c: C/P"]}></span>
                  {item["c: C/P"]}
                </td>
                {/* Size @ price */}
                <td className="w-[120px] p-0 text-start">
                  {item["g: Size"]} @ {item["h: Price"]}
                </td>
                {/* Premium */}
                <td
                  className={`w-[120px] p-0 text-start ${
                    item["c: C/P"] == "CALL" ? `text-green-400` : `text-red-400`
                  }`}
                >
                  ${item["trade_value"]}
                </td>
                {/* Execution */}
                <td className="w-[120px] p-0 text-start">
                  <span className={item["f: Side"]}>{item["f: Side"]}</span>
                </td>
                {/* DTE */}
                <td className="w-[120px] p-0 text-start">{item["j: DTE"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardMainDataTable;
