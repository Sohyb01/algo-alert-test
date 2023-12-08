"use client";
import React from "react";
import { motion } from "framer-motion";
import { TopGainersRowProps } from "../lib/types";

const TopGainersHeroWidgetRow = ({
  item,
  isActive,
  width,
}: TopGainersRowProps) => {
  const variants = {
    unactive: {
      width: "100%",
    },
    active: {
      width: "120%",
    },
  };

  const widthString = "w-[" + width + "%]";
  const opacityString =
    width >= 85
      ? "opacity-100"
      : width >= 60
      ? "opacity-80"
      : width >= 45
      ? "opacity-60"
      : "opacity-25";

  const beforeClassnames =
    "before:content-[''] before:absolute before:inset-0 before:-z-[1] before:shadow-[0px_0px_23px_0px_rgba(44,219,190,0.6)] before:blur-sm before:transition before:-translate-x-[5%]";

  return (
    <motion.div
      initial={false}
      variants={variants}
      animate={isActive ? "active" : "unactive"}
      transition={{
        type: "spring",
      }}
      className={`p-2 flex items-center text-start w-full text-neutral-200 relative text-lg ${
        isActive && `${beforeClassnames}`
      }`}
    >
      <div className={`w-full z-[1] ${isActive && `font-bold`}`}>
        {item.symbol}
      </div>
      <div className={`w-full z-[1] ${isActive && `font-bold`}`}>
        {item.contract}
      </div>
      <div className={`w-full z-[1] ${isActive && `font-bold`}`}>
        ${item.premium}
      </div>
      {/* Background (Stop at 94% Width) */}
      <div
        className={`absolute h-[39px] bg-teal-500 rounded-[12px] -left-0.5 duration-[400] ${
          isActive ? `w-full -translate-x-[5%] h-[50px]` : widthString
        } ${isActive ? `` : opacityString}`}
      ></div>
    </motion.div>
  );
};

export default TopGainersHeroWidgetRow;
