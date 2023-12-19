import React from "react";
import { freeSymbol } from "../lib/displaydata";
import Image from "next/image";
import Link from "next/link";

const FreeSubscriptionInfoWidget = () => {
  return (
    <div className="w-full bg-yellow-500 text-neutral-800 text-lg rounded-[16px] p-4 flex items-center gap-4">
      <Image height={32} width={32} src="/warning.svg" alt="Warning!" />
      <p>
        You are on the free plan, which only allows you to view & stream{" "}
        {freeSymbol} Options. For full streaming features, please{" "}
        <Link href="/#pricing" className="underline font-bold">
          purchase a plan
        </Link>
        .
      </p>
    </div>
  );
};

export default FreeSubscriptionInfoWidget;
