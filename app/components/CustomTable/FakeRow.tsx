import { cx } from "@/utils/cx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface ApiRowProps {
  item: {
    symbol: string;
    contract: string;
    trade_value: string;
  };
  isActive?: boolean;
  width: string;
}

const variants = {
  unactive: {
    width: "100%",
  },
  active: {
    width: "120%",
  },
};

const Row: React.FC<ApiRowProps> = ({ item, isActive, width }) => {
  const beforeClassnames =
    "before:content-[''] before:absolute before:inset-0 before:-z-[1] before:shadow-[0px_0px_23px_0px_rgba(44,219,190,0.6)] before:blur-sm before:transition";
  return (
    <>
      <motion.div
        initial={false}
        variants={variants}
        animate={isActive ? "active" : "unactive"}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 90,
        }}
        className={twMerge(
          cx(
            "text-xs group w-full grid grid-cols-3 relative z-10 pt-3 pb-4 rounded-lg transition ease-in",
            {
              "bg-[#40B5AD] text-lg": isActive,
              [beforeClassnames]: isActive,
            },
          ),
        )}
      >
        {/* ==> Entry 1  */}
        <p
          className={twMerge(
            cx("pl-6 text-left blur-[1px] 2xl:blur-[2px] transition ease", {
              "blur-none font-extrabold": isActive,
            }),
          )}
        >
          {item.symbol}
        </p>
        {/* ==> Entry 2  */}
        <p
          className={twMerge(
            cx("text-left blur-[1px] 2xl:blur-[2px] transition ease", {
              "blur-none font-extrabold translate-x-4": isActive,
            }),
          )}
        >
          {item.contract}
        </p>
        {/* ==> Entry 3  */}
        <p
          className={cx("text-left blur-[1px] 2xl:blur-[2px] transition ease", {
            "blur-none font-extrabold -translate-x-5": isActive,
          })}
        >
          ${Number(item.trade_value).toLocaleString()}
        </p>
        {/* ==> Background  */}
        <p
          className={`${width} h-full absolute top-0 left-0 bg-[#40B5AD] bg-opacity-20 z-0 rounded-lg`}
        ></p>
      </motion.div>
    </>
  );
};

export default Row;
