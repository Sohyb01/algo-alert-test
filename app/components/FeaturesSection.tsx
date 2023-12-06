import React from "react";
import Image from "next/image";
import { FeaturesSectionData } from "../lib/displaydata";

const FeaturesSection = () => {
  return (
    <section className="section flex flex-col lg:flex-row-reverse items-center gap-8 xl:gap-20 py-20 text-white">
      {/* Header, Subheader */}
      <div className="flex flex-col text-start items-start gap-4 w-full lg:max-w-[579px]">
        <h2 className="font-bold text-3xl lg:text-4xl title capitalize">
          Features that make it <span className="text-teal-400">Easy</span> for
          you
        </h2>
        <p className="text-neutral-200 text-lg">{FeaturesSectionData.sub}</p>
      </div>
      {/* Image */}
      <div className="relative w-full aspect-[328/125]">
        <Image src={FeaturesSectionData.imageUrl} alt="Image of Backend" fill />
      </div>
    </section>
  );
};

export default FeaturesSection;
