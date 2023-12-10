import React from "react";

const DashboardMainDataTable = (data: any) => {
  return (
    // <div className="gap-0 overflow-x-scroll overflow-y-clip relative scroll-styling">
    //   <div className="flex absolute z-10 top-0 w-full items-center gap-4 py-4 px-6 glowbg text-neutral-300 text-base">
    //     <div className="min-w-[120px] p-0 text-start">Time</div>
    //     <div className="min-w-[120px] p-0 text-start">Ticker</div>
    //     <div className="min-w-[120px] p-0 text-start">Expiration</div>
    //     <div className="min-w-[120px] p-0 text-start">Strike Price</div>
    //     <div className="min-w-[120px] p-0 text-start">Contract</div>
    //     <div className="min-w-[120px] p-0 text-start">Size @ price</div>
    //     <div className="min-w-[120px] p-0 text-start">Premium</div>
    //     <div className="min-w-[120px] p-0 text-start">Execution</div>
    //     <div className="min-w-[120px] p-0 text-start">DTE</div>
    //   </div>
    //   <div className="w-full lg:max-w-[596px] xl:max-w-[860px] max-h-[800px] rounded-[8px] pt-[55px]">
    //     <table className="overflow-y-scroll">
    //   {/* <thead>
    //   <tr className="flex w-full items-center gap-4 py-4 px-6 glowbg text-neutral-300 text-base">
    //     <td className="w-[120px] p-0 text-start">Time</td>
    //     <td className="w-[120px] p-0 text-start">Ticker</td>
    //     <td className="w-[120px] p-0 text-start">Expiration</td>
    //     <td className="w-[120px] p-0 text-start">Strike Price</td>
    //     <td className="w-[120px] p-0 text-start">Contract</td>
    //     <td className="w-[120px] p-0 text-start">Size @ price</td>
    //     <td className="w-[120px] p-0 text-start">Premium</td>
    //     <td className="w-[120px] p-0 text-start">Execution</td>
    //     <td className="w-[120px] p-0 text-start">DTE</td>
    //   </tr>
    // </thead> */}
    //       <tbody>
    //         {/* row 1 */}
    // {data.data.map((item: any, index: any) => {
    //   const callOrPut = item["c: C/P"] === "CALL" ? "CALL" : "PUT";
    //   return (
    //     <tr
    //       key={index}
    //       className="flex w-full items-center gap-4 py-4 px-6 border-solid border-slate-400 border-t-[1px] text-white"
    //     >
    //       {/* Date and Time */}
    //       <td className="w-[120px] p-0 text-sm text-start">
    //         {item["b: Time"].split(" ")[0]}
    //         <br />
    //         <span className="text-neutral-400">
    //           {item["b: Time"].split(" ")[1]}
    //         </span>
    //       </td>
    //       {/* Symbol */}
    //       <td className="w-[120px] p-0 text-start">
    //         {item["a: Symbol"]}
    //       </td>
    //       {/* Expiration Date */}
    //       <td className="w-[120px] p-0 text-start">
    //         {item["e: Exp Date"]}
    //       </td>
    //       {/* Strike Price */}
    //       <td className="w-[120px] p-0 text-start">
    //         ${item["d: Strike"]}
    //       </td>
    //       {/* Contract (C/P) */}
    //       <td className="w-[120px] p-0 text-start">
    //         <span className={item["c: C/P"]}></span>
    //         {item["c: C/P"]}
    //       </td>
    //       {/* Size @ price */}
    //       <td className="w-[120px] p-0 text-start">
    //         {item["g: Size"]} @ {item["h: Price"]}
    //       </td>
    //       {/* Premium */}
    //       <td
    //         className={`w-[120px] p-0 text-start ${
    //           item["c: C/P"] == "CALL"
    //             ? `text-green-400`
    //             : `text-red-400`
    //         }`}
    //       >
    //         ${item["trade_value"]}
    //       </td>
    //       {/* Execution */}
    //       <td className="w-[120px] p-0 text-start">
    //         <span className={item["f: Side"]}>{item["f: Side"]}</span>
    //       </td>
    //       {/* DTE */}
    //       <td className="w-[120px] p-0 text-start">{item["j: DTE"]}</td>
    //     </tr>
    //   );
    // })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div className="overflow-x-auto w-full lg:max-w-[596px] xl:max-w-[860px] max-h-[80vh] scroll-styling">
      <table className="table table-pin-rows table-pin-cols">
        <thead>
          <tr className="w-full py-4 px-6 glowbg text-neutral-300 text-base">
            <td className="w-[120px] text-start">Time</td>
            <td className="w-[120px] text-start">Ticker</td>
            <td className="w-[120px] text-start">Expiration</td>
            <td className="w-[120px] text-start">Strike Price</td>
            <td className="w-[120px] text-start">Contract</td>
            <td className="w-[120px] text-start">Size @ price</td>
            <td className="w-[120px] text-start">Premium</td>
            <td className="w-[120px] text-start">Execution</td>
            <td className="w-[120px] text-start">DTE</td>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item: any, index: any) => {
            return (
              <tr
                key={index}
                className="py-4 px-6 border-solid border-slate-400 border-t-[1px] text-white"
              >
                {/* Date and Time */}
                <td className="w-[120px] text-sm text-start">
                  {item["b: Time"].split(" ")[0]}
                  <br />
                  <span className="text-neutral-400">
                    {item["b: Time"].split(" ")[1]}
                  </span>
                </td>
                {/* Symbol */}
                <td className="w-[120px] text-start">{item["a: Symbol"]}</td>
                {/* Expiration Date */}
                <td className="w-[120px] text-start">{item["e: Exp Date"]}</td>
                {/* Strike Price */}
                <td className="w-[120px] text-start">${item["d: Strike"]}</td>
                {/* Contract (C/P) */}
                <td className="w-[120px] text-start">
                  <span className={item["c: C/P"]}></span>
                  {item["c: C/P"]}
                </td>
                {/* Size @ price */}
                <td className="w-[120px] text-start">
                  {item["g: Size"]} @ {item["h: Price"]}
                </td>
                {/* Premium */}
                <td
                  className={`w-[120px] text-start ${
                    item["c: C/P"] == "CALL" ? `text-green-400` : `text-red-400`
                  }`}
                >
                  ${item["trade_value"]}
                </td>
                {/* Execution */}
                <td className="w-[120px] text-start">
                  <span className={item["f: Side"]}>{item["f: Side"]}</span>
                </td>
                {/* DTE */}
                <td className="w-[120px] text-start">{item["j: DTE"]}</td>
              </tr>
            );
          })}
          {/* <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Littel, Schaden and Vandervort</td>
            <td>Canada</td>
            <td>12/16/2020</td>
            <td>Blue</td>
            <th>1</th>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardMainDataTable;
