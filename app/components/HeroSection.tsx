import React from "react";
import { HeroSectionData } from "../lib/displaydata";
import TopGainersHeroWidget from "./TopGainersHeroWidget";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

const HeroSection = async () => {
  const session = await getServerSession(authOptions);
  // Add a check to see if the user is already subscribed
  const isSubscribed = session?.user?.isActive;

  // console.log(session.user)
  return (
    <section
      id="home"
      className="section flex flex-col items-start md:flex-row gap-8 py-20 pt-36 md:min-h-[707px] lg:min-h-[none] md:items-center z-10"
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
        {/* case 1: User is not signed in */}
        {session === null && (
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
        )}
        {/* case 2: User is signed in but is not subscribed */}
        {session?.user && !session?.user?.isActive && (
          <div className="flex items-center w-full justify-start gap-8">
            <Link href="#pricing" className="btn-1 gradient-bg-1 glow-shadow">
              View Plans
            </Link>
          </div>
        )}
        {/* case 3: User is signed in and already subscribed */}
        {session?.user?.isActive && (
          <div className="flex items-center w-full justify-start gap-8">
            <p>You are already subscribed!</p>
            <a href="/dashboard" className="btn-1 gradient-bg-1 glow-shadow">
              View Options
            </a>
          </div>
        )}
      </div>
      {/* Top Gainers Widget */}
      <TopGainersHeroWidget />
    </section>
  );
};

export default HeroSection;
