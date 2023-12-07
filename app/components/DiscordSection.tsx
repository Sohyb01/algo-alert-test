import React from "react";
import Image from "next/image";
import { DiscordSectionData, discordUrl } from "../lib/displaydata";

const DiscordSection = () => {
  return (
    <section className="section flex flex-col lg:flex-row items-center justify-center gap-16 xl:gap-20 py-20 text-white">
      {/* Header, Subheader, Button */}
      <div className="flex flex-col items-start gap-8 max-w-[624px]">
        {/* Header, Subheader */}
        <div className="flex flex-col text-start items-start gap-4 w-full lg:max-w-[579px]">
          <h2 className="font-bold text-3xl lg:text-4xl title capitalize">
            Join us on <span className="text-indigo-500">Discord</span>
          </h2>
          <p className="text-neutral-200 text-lg">{DiscordSectionData.sub}</p>
        </div>
        <a
          href={discordUrl}
          className="btn-1 gradient-bg-1 glow-shadow text-lg"
        >
          Join Now
        </a>
      </div>
      {/* Image */}
      <div className="relative w-full max-w-[300px] rotate-[11deg] aspect-[300/220]">
        <Image src={DiscordSectionData.imageUrl} alt="Image of Backend" fill />
      </div>
    </section>
  );
};

export default DiscordSection;
