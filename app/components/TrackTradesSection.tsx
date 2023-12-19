import React from "react";
import Image from "next/image";
import { TrackTradesSectionData } from "../lib/displaydata";

const TrackTradesSection = () => {
  return (
    <section className="section flex flex-col lg:flex-row-reverse lg:justify-center items-center gap-8 xl:gap-20 py-20 text-white">
      {/* Header, Subheader */}
      <div className="flex flex-col text-start items-start gap-4 w-full lg:max-w-[579px]">
        <h2 className="font-bold text-3xl lg:text-4xl title capitalize">
          Track Trades with our <span className="text-teal-400">flow</span>{" "}
        </h2>
        <p className="text-neutral-200 text-lg">{TrackTradesSectionData.sub}</p>
      </div>
      {/* Image */}
      <div className="relative w-full lg:max-w-[400px] aspect-[406/495]">
        <Image
          src={TrackTradesSectionData.imageUrl}
          alt="Image of Backend"
          fill
        />
      </div>
    </section>
  );
};

export default TrackTradesSection;
