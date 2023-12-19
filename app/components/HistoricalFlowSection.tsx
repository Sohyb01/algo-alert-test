import React from "react";
import Image from "next/image";
import { HistoricalFlowSectionData } from "../lib/displaydata";

const HistoricalFlowSection = () => {
  return (
    <section className="section flex flex-col lg:flex-row items-center lg:justify-center gap-8 xl:gap-20 py-20 text-white">
      {/* Header, Subheader */}
      <div className="flex flex-col text-start items-start gap-4 w-full lg:max-w-[579px]">
        <h2 className="font-bold text-3xl lg:text-4xl title capitalize">
          Regular Updates and{" "}
          <span className="text-teal-400">Enhancements</span>
        </h2>
        <p className="text-neutral-200 text-lg">
          {HistoricalFlowSectionData.sub}
        </p>
      </div>
      {/* Image */}
      <div className="relative w-full lg:max-w-[400px] aspect-[708/911]">
        <Image
          src={HistoricalFlowSectionData.imageUrl}
          alt="Image of Backend"
          fill
        />
      </div>
    </section>
  );
};

export default HistoricalFlowSection;
