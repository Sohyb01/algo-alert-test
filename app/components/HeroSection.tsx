import React from "react";
import { HeroSectionData } from "../lib/displaydata";

const HeroSection = () => {
  console.log(HeroSectionData);
  return (
    <section className="section flex flex-col items-center md:flex-row gap-8 py-20">
      {/* Header, Subheader, Buttons */}
      <div className="flex flex-col items-start text-white text-start gap-10">
        {/* Header and Subheader */}
        <div className="flex flex-col gap-4 items-start">
          <h1 className="title font-bold text-3xl lg:text-5xl">
            The most <span className="text-teal-400">affordable</span> options
            platform
          </h1>
          <p>{HeroSectionData.sub}</p>
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
    </section>
  );
};

export default HeroSection;
