import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavbarLinks, logoImgPath } from "../lib/displaydata";

const Navbar = () => {
  return (
    <div className="flex justify-center fixed top-0 w-full z-[1000] blur-bg border-b-[1px] border-slate-700">
      <nav className="py-4 w-full section flex justify-between items-center text-white">
        {/* Logo */}
        <a href="/#">
          <Image src={logoImgPath} alt="Alert Algo" width={180} height={32} />
        </a>
        {/* Big Screen Links */}
        <div className="hidden lg:flex gap-8 text-white">
          {NavbarLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.link_text}
            </Link>
          ))}
        </div>

        {/* Mobile navigation */}
        <div className="lg:hidden grid place-items-center">
          <div className="drawer drawer-end z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="drawer-button grid items-center p-3 fill-neutral-800 hover:bg-neutral-400 duration-100 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="18"
                  viewBox="0 0 26 18"
                  fill="none"
                >
                  <path
                    d="M1 1H25"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M1 9H25"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M1 17H25"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
            </div>
            {/* Actual Drawer */}
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-6 flex flex-col gap-4 w-60 min-h-full text-white blur-bg border-l-[1px] border-slate-700">
                <a className="py-10" href="/#">
                  <Image
                    src={logoImgPath}
                    alt="Alert Algo"
                    width={180}
                    height={32}
                  />
                </a>
                {/* Sidebar content here */}
                {NavbarLinks.map((link, index) => (
                  <li key={index}>
                    <Link className="text-lg" href={link.href}>
                      {link.link_text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
