import React from "react";
import { HeroSectionData } from "../lib/displaydata";
import TopGainersHeroWidget from "./TopGainersHeroWidget";

const HeroSection = () => {
  return (
    <section className="section flex flex-col items-start md:flex-row gap-8 py-20 md:min-h-[707px] lg:min-h-[none] md:items-center overflow-hidden">
      {/* Header, Subheader, Buttons */}
      <div className="flex flex-col items-start text-white text-start gap-10 md:max-w-[332px] lg:max-w-[547px] xl:max-w-[743px]">
        {/* Header and Subheader */}
        <div className="flex flex-col gap-4 items-start">
          <h1 className="title font-bold text-3xl lg:text-5xl">
            The most <span className="text-teal-400">affordable</span> options
            platform
          </h1>
          <p className="text-lg lg:text-xl">{HeroSectionData.sub}</p>
        </div>
        {/* Buttons */}
        <div className="flex items-center w-full justify-start gap-8">
          <a href="#" className="btn-1 gradient-bg-1">
            Sign Up
          </a>
          <a href="#" className="btn-1 border-teal-400 border-2">
            Pricing
          </a>
        </div>
      </div>
      {/* Top Gainers Widget */}
      <TopGainersHeroWidget />
    </section>
  );
};

export default HeroSection;
