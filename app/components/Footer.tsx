import React from "react";
import {
  FooterData,
  businessName,
  logoImgPath,
  socialMedias,
} from "../lib/displaydata";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="section flex flex-col gap-10 py-[72px] text-lg">
      {/* All Columns Container */}
      <div className="flex flex-wrap gap-16 items-start md:flex-row justify-start w-full gap-y-10 md:justify-between">
        {/* Logo Column */}
        <div className="flex flex-col items-start text-start w-full max-w-[332px] lg:max-w-[515px] gap-4">
          {/* Image */}
          <Link href="/#" className="relative aspect-[332/62] w-[240px]">
            <Image src={logoImgPath} alt={businessName} fill />
          </Link>
          <p className="text-white">{FooterData.paragraph}</p>
        </div>
        {/* Other Columns Container */}
        <div className="flex gap-8 text-white">
          {FooterData.columns.map((column, index) => (
            <div key={index} className="flex flex-col gap-6 w-[142px]">
              {/* Column Title */}
              <div className="text-teal-400 font-bold">
                {column.columnTitle}
              </div>
              {/* Column Links */}
              <div className="flex flex-col gap-4">
                {column.columnLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-neutral-300 hover:text-white duration-200"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Divider */}
      <div className="w-full h-0.5 bg-neutral-500"></div>
      {/* Copyright and Socials Container */}
      <div className="flex flex-col items-start md:flex-row justify-between gap-y-10 md:items-center">
        <p className="text-white text-base">Copyright @ 2024 {businessName}</p>
        {/* Socials Container */}
        <div className="flex gap-4">
          {socialMedias.map((social, index) => (
            <Link key={index} href={social.href}>
              <Image
                src={social.imageUrl}
                alt={social.name}
                height={24}
                width={24}
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
