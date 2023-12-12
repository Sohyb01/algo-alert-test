import React from "react";
import { HeroSectionData } from "../lib/displaydata";
import TopGainersHeroWidget from "./TopGainersHeroWidget";
import ParticleEffect from "./ParticlesBackground/ParticlesBackground";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="section flex flex-col items-start md:flex-row gap-8 py-20 pt-36 md:min-h-[707px] lg:min-h-[none] md:items-center"
    >
      {/* Header, Subheader, Buttons */}
      <div className="flex flex-col items-start text-white text-start gap-10 md:min-w-[332px] lg:max-w-[547px] xl:max-w-[743px]">
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
          <Link
            href="/api/auth/signin"
            className="btn-1 gradient-bg-1 glow-shadow"
          >
            Sign Up
          </Link>
          <Link href="#pricing" className="btn-1 border-teal-400 border-2">
            Pricing
          </Link>
        </div>
      </div>
      {/* Top Gainers Widget */}
      <TopGainersHeroWidget />
    </section>
  );
};

export default HeroSection;
