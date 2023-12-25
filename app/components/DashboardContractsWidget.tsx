// This is the Green / Red Widget on the dashboard
import React from "react";
import LoadingSmall from "./LoadingSmall";
import {
  analyzeTrades,
  fetchApiData,
  formatNumberWithCommas,
} from "../lib/functions";

const DashboardContractsWidget = async () => {
  const baseApiData = await fetchApiData();

  const contractsData = await analyzeTrades(baseApiData);

  {
    return Object.values(contractsData).some((value) => Number.isNaN(value)) ? (
      <LoadingSmall />
    ) : (
      <div className="flex gap-4 overflow-x-scroll scroll-styling py-2">
        {/* CALLS FLOW - GREEN */}
        <div className="flex items-center justify-between min-w-[240px] w-full gap-4 p-4 bg-slate-700 rounded-[8px] text-white">
          <div className="flex flex-col text-center gap-2">
            <p className="text-sm font-bold text-neutral-200">CALLS FLOW</p>
            <p className="text-lg">
              {formatNumberWithCommas(contractsData.callFlows)}
            </p>
          </div>
          <div
            className="radial-progress text-green-400"
            style={{
              // @ts-ignore
              "--value": `${contractsData.callFlowsPercentage}`,
              "--size": "80px",
            }}
            role="progressbar"
          >
            <span className="text-white">
              {contractsData.callFlowsPercentage}%
            </span>
          </div>
        </div>
        {/* PUTS FLOW - RED */}
        <div className="flex items-center justify-between min-w-[240px] w-full gap-4 p-4 bg-slate-700 rounded-[8px] text-white">
          <div className="flex flex-col text-center gap-2">
            <p className="text-sm font-bold text-neutral-200">PUTS FLOW</p>
            <p className="text-lg">
              {formatNumberWithCommas(contractsData.putFlows)}
            </p>
          </div>
          <div
            className="radial-progress text-red-400"
            style={{
              // @ts-ignore
              "--value": `${contractsData.putFlowsPercentage}`,
              "--size": "80px",
            }}
            role="progressbar"
          >
            <span className="text-white">
              {contractsData.putFlowsPercentage}%
            </span>
          </div>
        </div>
        {/* CALLS PREMIUM - GREEN */}
        <div className="flex items-center justify-between min-w-[240px] w-full gap-4 p-4 bg-slate-700 rounded-[8px] text-white">
          <div className="flex flex-col text-center gap-2">
            <p className="text-sm font-bold text-neutral-200">CALLS PREMIUM</p>
            <p className="text-lg">
              {formatNumberWithCommas(contractsData.callPremiumSum)}
            </p>
          </div>
          <div
            className="radial-progress text-green-400"
            style={{
              // @ts-ignore
              "--value": `${contractsData.callPremiumPercentage}`,
              "--size": "80px",
            }}
            role="progressbar"
          >
            <span className="text-white">
              {contractsData.callPremiumPercentage}%
            </span>
          </div>
        </div>
        {/* PUTS PREMIUM - RED */}
        <div className="flex items-center justify-between min-w-[240px] w-full gap-4 p-4 bg-slate-700 rounded-[8px] text-white">
          <div className="flex flex-col text-center gap-2">
            <p className="text-sm font-bold text-neutral-200">PUTS PREMIUM</p>
            <p className="text-lg">
              {formatNumberWithCommas(contractsData.putPremiumSum)}
            </p>
          </div>
          <div
            className="radial-progress text-red-400"
            style={{
              // @ts-ignore
              "--value": `${contractsData.putPremiumPercentage}`,
              "--size": "80px",
            }}
            role="progressbar"
          >
            <span className="text-white">
              {contractsData.putPremiumPercentage}%
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default DashboardContractsWidget;
