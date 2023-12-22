import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavbarLinks,
  logoImgPath,
  yearlySubscriptionPriceId,
} from "../lib/displaydata";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import CancelSubscriptionButton from "./CancelSubscriptionButton";
import Stripe from "stripe";
import UserButton from "./UserButton";
import {
  checkIfUserHasAlreadyCanceled,
  getStripePlanEndDate,
  getStripeSubscriptionName,
  getUserPlanPriceId,
} from "../lib/functions";
import UpgradeToYearlyButton from "./UpgradeToYearlyButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  // Add a check to see if the user has already canceled
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, {
    apiVersion: "2023-10-16",
  });

  const stripeSubscriptionId =
    session?.user?.subscriptionID !== null || undefined
      ? session?.user?.subscriptionID
      : null;

  const subscriptionName = await getStripeSubscriptionName();
  const subscriptionEndDate = await getStripePlanEndDate();

  const userHasCanceled = await checkIfUserHasAlreadyCanceled();
  // console.log(`User has canceled: ${userHasCanceled}`);
  const currentPlanPriceId = await getUserPlanPriceId();

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
        <div className="grid place-items-center">
          <div className="drawer drawer-end z-50 flex items-center gap-4">
            {session?.user?.image && (
              <div className="dropdown dropdown-left">
                <div
                  tabIndex={0}
                  role="button"
                  className="w-8 h-8 rounded-full relative overflow-hidden"
                >
                  <Image
                    fill
                    src={session?.user.image}
                    alt="Your Profile Image"
                  />
                </div>
                {/* Dropdown */}
                <div
                  tabIndex={0}
                  className="dropdown-content z-[1] menu flex flex-col text-start gap-8 p-8 bg-slate-950 glow-shadow rounded-[32px] text-sm w-[299px]"
                >
                  {/* Signed in as and Sign Out */}
                  <div className="flex flex-col text-start gap-2">
                    <p>
                      <span className="text-neutral-300">Signed in as</span>{" "}
                      {session.user.email}
                    </p>
                    <Link
                      href="/api/auth/signout"
                      className="underline text-red-300"
                    >
                      Sign Out
                    </Link>
                  </div>
                  {!userHasCanceled && subscriptionEndDate && (
                    <div className="flex flex-col text-start items-start gap-4">
                      <p className="text-neutral-300">
                        You are currently subscribed to the {subscriptionName}{" "}
                        plan, which will end & be renewed on{" "}
                        <span className="text-white">
                          {subscriptionEndDate!.split(",")[0]}
                        </span>
                      </p>
                      {currentPlanPriceId !== yearlySubscriptionPriceId && (
                        <UpgradeToYearlyButton />
                      )}
                      <CancelSubscriptionButton />
                    </div>
                  )}
                  {userHasCanceled && subscriptionEndDate && (
                    <p className="text-neutral-300">
                      You have canceled your {subscriptionName} plan. Your
                      access to the previous subscription will end on {}
                      <span className="text-white">
                        {subscriptionEndDate!.split(",")[0]}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}
            {!session?.user && (
              <Link
                href="/api/auth/signin"
                className="px-4 py-2 rounded-full gradient-bg-1 glow-shadow text-sm"
              >
                Sign Up
              </Link>
            )}
            <input
              id="my-drawer"
              type="checkbox"
              className="drawer-toggle lg:hidden "
            />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="drawer-button grid items-center p-3 fill-neutral-800 hover:bg-neutral-400 duration-100 rounded-md lg:hidden"
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
                {!session?.user && (
                  <Link
                    href="/api/auth/signin"
                    className="px-4 py-2 rounded-full gradient-bg-1 glow-shadow"
                  >
                    Sign Up
                  </Link>
                )}
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
