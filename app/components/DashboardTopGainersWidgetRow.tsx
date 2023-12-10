import React from "react";
import { TopGainersRowProps } from "../lib/types";

export const DashboardTopGainersWidgetRow = ({
  item,
  width,
}: TopGainersRowProps) => {
  const opacityString =
    width.number >= 85
      ? "opacity-100"
      : width.number >= 60
      ? "opacity-80"
      : width.number >= 45
      ? "opacity-60"
      : "opacity-25";

  return (
    <div
      className={`p-2 flex items-center text-start w-full text-neutral-200 relative text-base`}
    >
      <div className={`w-full z-[1]`}>{item.symbol}</div>
      <div className={`w-full z-[1]`}>{item.contract}</div>
      <div className={`w-full z-[1]`}>${item.premium}</div>
      {/* Background (Stop at 94% Width) */}
      <div
        className={`absolute h-[39px] bg-teal-500 rounded-[12px] -left-0.5 duration-[400] w-full ${width.string} ${opacityString}`}
      ></div>
    </div>
  );
};
