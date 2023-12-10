// This is the Green / Red Widget on the dashboard
import React from "react";

const DashboardContractsWidget = (data: any) => {
  return (
    <div className="flex gap-4 overflow-x-scroll scroll-styling py-2">
      {/* CALLS FLOW - GREEN */}
      <div className="flex items-center justify-between min-w-[240px] max-w-[240px] gap-4 p-4 greenbg rounded-[8px] text-white">
        <div className="flex flex-col text-center gap-2">
          <p className="text-sm font-bold text-neutral-200">CALLS FLOW</p>
          <p>{data.data.callFlows}</p>
        </div>
        <div
          className="radial-progress text-green-400"
          style={{
            "--value": `${data.data.callFlowsPercentage}`,
            "--size": "80px",
          }}
          role="progressbar"
        >
          <span className="text-white">{data.data.callFlowsPercentage}%</span>
        </div>
      </div>
      {/* PUTS FLOW - RED */}
      <div className="flex items-center justify-between min-w-[240px] max-w-[240px] gap-4 p-4 redbg rounded-[8px] text-white">
        <div className="flex flex-col text-center gap-2">
          <p className="text-sm font-bold text-neutral-200">PUTS FLOW</p>
          <p>{data.data.putFlows}</p>
        </div>
        <div
          className="radial-progress text-red-400"
          style={{
            "--value": `${data.data.putFlowsPercentage}`,
            "--size": "80px",
          }}
          role="progressbar"
        >
          <span className="text-white">{data.data.putFlowsPercentage}%</span>
        </div>
      </div>
      {/* CALLS PREMIUM - GREEN */}
      <div className="flex items-center justify-between min-w-[240px] max-w-[240px] gap-4 p-4 greenbg rounded-[8px] text-white">
        <div className="flex flex-col text-center gap-2">
          <p className="text-sm font-bold text-neutral-200">CALLS PREMIUM</p>
          <p>{data.data.callPremiumSum}</p>
        </div>
        <div
          className="radial-progress text-green-400"
          style={{
            "--value": `${data.data.callPremiumPercentage}`,
            "--size": "80px",
          }}
          role="progressbar"
        >
          <span className="text-white">{data.data.callPremiumPercentage}%</span>
        </div>
      </div>
      {/* PUTS PREMIUM - RED */}
      <div className="flex items-center justify-between min-w-[240px] max-w-[240px] gap-4 p-4 redbg rounded-[8px] text-white">
        <div className="flex flex-col text-center gap-2">
          <p className="text-sm font-bold text-neutral-200">PUTS PREMIUM</p>
          <p>{data.data.putPremiumSum}</p>
        </div>
        <div
          className="radial-progress text-red-400"
          style={{
            "--value": `${data.data.putPremiumPercentage}`,
            "--size": "80px",
          }}
          role="progressbar"
        >
          <span className="text-white">{data.data.putPremiumPercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardContractsWidget;