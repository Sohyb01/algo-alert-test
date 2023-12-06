import React from "react";
import { OptionsFlowSectionData } from "../lib/displaydata";
import Image from "next/image";

const OptionsFlowSection = () => {
  return (
    <section className="section flex flex-col items-center md:flex-row gap-8 py-20 text-white">
      {/* Header, Subheader, Feature Bubbles */}
      <div className="flex flex-col gap-8 items-start w-full lg:max-w-[492px] xl:max-w-[733px]">
        {/* Header and Subheader */}
        <div className="flex flex-col text-start gap-4 items-start">
          <h2 className="title font-bold text-3xl lg:text-4xl">
            Options <span className="text-teal-400">Flow</span>
          </h2>
          <p className="text-neutral-200 text-lg">
            {OptionsFlowSectionData.sub}
          </p>
        </div>
        {/* Bubbles */}
        <div className="flex flex-col w-full gap-4">
          {/* Individual Bubble */}
          <div className="flex items-center text-start gap-4 bg-opacity-10 bg-white px-4 py-4 rounded-[16px] md:rounded-[32px] w-full">
            {/* SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M20 0C8.95161 0 0 8.95161 0 20C0 31.0484 8.95161 40 20 40C31.0484 40 40 31.0484 40 20C40 8.95161 31.0484 0 20 0ZM20 36.129C11.0887 36.129 3.87097 28.9113 3.87097 20C3.87097 11.0887 11.0887 3.87097 20 3.87097C28.9113 3.87097 36.129 11.0887 36.129 20C36.129 28.9113 28.9113 36.129 20 36.129ZM24.9839 27.7097L18.1371 22.7339C17.8871 22.5484 17.7419 22.2581 17.7419 21.9516V8.70968C17.7419 8.17742 18.1774 7.74194 18.7097 7.74194H21.2903C21.8226 7.74194 22.2581 8.17742 22.2581 8.70968V20.1371L27.6452 24.0564C28.0806 24.371 28.1694 24.9758 27.8548 25.4113L26.3387 27.5C26.0242 27.9274 25.4194 28.0242 24.9839 27.7097Z"
                fill="#2DD4BF"
              />
            </svg>
            <div>
              <h5 className="text-lg font-bold">
                {OptionsFlowSectionData.bubble1_title}
              </h5>
              <p className="text-neutral-200">
                {OptionsFlowSectionData.bubble1_text}
              </p>
            </div>
          </div>
          {/* Individual Bubble */}
          <div className="flex items-center text-start gap-4 bg-opacity-10 bg-white px-4 py-4 rounded-[16px] md:rounded-[32px] w-full">
            {/* SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M19.5714 36.7143C29.0392 36.7143 36.7143 29.0392 36.7143 19.5714C36.7143 10.1037 29.0392 2.42857 19.5714 2.42857C10.1037 2.42857 2.42859 10.1037 2.42859 19.5714C2.42859 29.0392 10.1037 36.7143 19.5714 36.7143Z"
                stroke="#2DD4BF"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M31.6858 31.6857L39.5715 39.5714M19.5715 12.4286V8.14285M19.5715 12.4286C17.2001 12.4286 15.2858 12.4286 15.2858 15.2857C15.2858 19.5714 23.8572 19.5714 23.8572 23.8571C23.8572 26.7143 21.9429 26.7143 19.5715 26.7143M19.5715 12.4286C21.9429 12.4286 23.8572 13.5143 23.8572 15.2857M15.2858 23.8571C15.2858 26 17.2001 26.7143 19.5715 26.7143M19.5715 26.7143V31"
                stroke="#2DD4BF"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>
              <h5 className="text-lg font-bold">
                {OptionsFlowSectionData.bubble2_title}
              </h5>
              <p className="text-neutral-200">
                {OptionsFlowSectionData.bubble2_text}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Image */}
      <div className="relative w-full aspect-video">
        <Image
          src={OptionsFlowSectionData.imageUrl}
          alt="Image of Backend"
          fill
        />
      </div>
    </section>
  );
};

export default OptionsFlowSection;
