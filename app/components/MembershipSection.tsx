import React from "react";
import { MembershipSectionData, subscriptions } from "../lib/displaydata";
import MembershipCard from "./MembershipCard";

const MembershipSection = () => {
  return (
    <section
      id="pricing"
      className="section flex flex-col items-center gap-12 py-20 text-white"
    >
      {/* Header */}
      <h2 className="font-bold title text-3xl lg:text-4xl max-w-[20ch] text-center">
        Choose your plan with our{" "}
        <span className="text-teal-400"> All-Inclusive</span> Membership
      </h2>
      {/* Memberships Container */}
      <div className="flex flex-row flex-wrap lg:flex-nowrap gap-4 lg:gap-8 gap-y-10 items-center justify-center w-full">
        {subscriptions.map((membership: any, index: number) => (
          // Membership

          <MembershipCard membership={membership} key={index} />
        ))}
      </div>
    </section>
  );
};

export default MembershipSection;
