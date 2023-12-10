// Hottest Options / Top Purchases
import React from "react";

const DashboardHottestOptionsWidget = (data: any) => {
  return (
    <div className="z-10 flex flex-col items-center text-start text-white rounded-[16px] bg-slate-700 px-4 py-6 glowbg gap-4 glow-shadow-white">
      <h5 className="text-lg font-bold w-full">Hottest Options</h5>
      {/* Title row */}
      <div className="flex items-center text-start w-full gap-4 text-neutral-200">
        <div className="w-full text-base">Contract</div>
        <div className="w-full text-base">Total Size</div>
        <div className="w-full text-base">CALLS % / PUTS %</div>
      </div>
      {/* Actual Table */}
      <div className="overflow-x-scroll w-full scroll-styling">
        <table className="table-pin-cols w-full">
          <tbody>
            {/* row 1 */}
            {data.data.map((item: any, index: any) => {
              const callsRatio =
                Math.round((1000 * item.calls) / (item.calls + item.puts)) / 10;
              const putsRatio =
                Math.round((1000 * item.puts) / (item.calls + item.puts)) / 10;
              return (
                <tr
                  key={index}
                  className="flex w-full items-center gap-4 py-2 border-solid border-slate-400 border-t-[1px]"
                >
                  {/* Format: 
              TSLA $250
              Aug 11, 2023
              420, Put
              */}
                  <td className="p-0 w-full text-sm">
                    <span className="font-bold">{item.symbol}</span> $
                    {item.strike}
                    <br />
                    <span className="text-neutral-300">
                      {item.expiration_date}
                    </span>
                    <br />
                    {item.calls > item.puts
                      ? `${item.calls}, Call`
                      : `${item.puts}, Put`}
                  </td>
                  <td className="p-0 w-full">{item.total_size}</td>
                  <td className="p-0 w-full">
                    {callsRatio}% / {putsRatio}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHottestOptionsWidget;
