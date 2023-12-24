import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Link from "next/link";
import { monthlySubscriptionPriceId } from "../lib/displaydata";
import CancelSubscriptionButton from "./CancelSubscriptionButton";
import UpgradeToYearlyButton from "./UpgradeToYearlyButton";
import Stripe from "stripe";
import {
  getStripeSubscriptionName,
  getStripePlanEndDate,
  checkIfUserHasAlreadyCanceled,
  getUserPlanPriceId,
} from "../lib/functions";

export async function NavbarDialog() {
  const session = await getServerSession(authOptions);

  // // Add a check to see if the user has already canceled
  // const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, {
  //   apiVersion: "2023-10-16",
  // });

  // const stripeSubscriptionId =
  //   session?.user?.subscriptionID !== null || undefined
  //     ? session?.user?.subscriptionID
  //     : null;

  const subscriptionName = session?.user?.isActive
    ? await getStripeSubscriptionName()
    : null;
  const subscriptionEndDate = session?.user?.isActive
    ? await getStripePlanEndDate()
    : null;

  const userHasCanceled = session?.user?.isActive
    ? await checkIfUserHasAlreadyCanceled()
    : null;
  // console.log(`User has canceled: ${userHasCanceled}`);
  const currentPlanPriceId = session?.user?.isActive
    ? await getUserPlanPriceId()
    : null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-8 h-8 rounded-full relative overflow-hidden">
          <Image fill src={session?.user?.image!} alt="Your Profile Image" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-white">
            <span className="text-neutral-300">
              Signed in as <br />
            </span>{" "}
            {session?.user?.email!}
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-4 py-2">
            <Link href="/api/auth/signout" className="underline text-red-300">
              Sign Out
            </Link>
            {!session?.user?.isActive && (
              <div className="flex flex-col text-start items-start gap-4">
                <p className="text-neutral-300 text-base">
                  You are not currently subscribed to any plan.
                </p>
              </div>
            )}
            {!userHasCanceled && subscriptionEndDate && (
              <div className="flex flex-col text-start items-start gap-4">
                <p className="text-neutral-300 text-base">
                  You are currently subscribed to the {subscriptionName} plan,
                  which will end & be renewed on{" "}
                  <span className="text-white">
                    {subscriptionEndDate!.split(",")[0]}
                  </span>
                </p>
                {currentPlanPriceId === monthlySubscriptionPriceId && (
                  <UpgradeToYearlyButton />
                )}
                <CancelSubscriptionButton />
              </div>
            )}
            {userHasCanceled && subscriptionEndDate && (
              <p className="text-neutral-300 text-base">
                You have canceled your {subscriptionName} plan. Your access to
                the previous subscription will end on {}
                <span className="text-white">
                  {subscriptionEndDate!.split(",")[0]}
                </span>
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

/* Old Dropdown */

//   session?.user?.image && (
//     <div className="dropdown dropdown-left">
//       <div
//         tabIndex={0}
//         role="button"
//         className="w-8 h-8 rounded-full relative overflow-hidden"
//       >
// <Image
//   fill
//   src={session?.user.image}
//   alt="Your Profile Image"
// />
//       </div>
//       {/* Dropdown */}
//   <div
//     tabIndex={0}
//     className="dropdown-content z-[1] menu flex flex-col text-start gap-8 p-8 bg-slate-950 glow-shadow rounded-[32px] text-sm w-[299px]"
//   >
//     {/* Signed in as and Sign Out */}
//     <div className="flex flex-col text-start gap-2">
//       <p>
//         <span className="text-neutral-300">Signed in as</span>{" "}
//         {session.user.email}
//       </p>
//   <Link
//     href="/api/auth/signout"
//     className="underline text-red-300"
//   >
//     Sign Out
//   </Link>
//     </div>
// {!userHasCanceled && subscriptionEndDate && (
//   <div className="flex flex-col text-start items-start gap-4">
//     <p className="text-neutral-300">
//       You are currently subscribed to the {subscriptionName}{" "}
//       plan, which will end & be renewed on{" "}
//       <span className="text-white">
//         {subscriptionEndDate!.split(",")[0]}
//       </span>
//     </p>
//     {currentPlanPriceId === monthlySubscriptionPriceId && (
//       <UpgradeToYearlyButton />
//     )}
//     <CancelSubscriptionButton />
//   </div>
// )}
// {userHasCanceled && subscriptionEndDate && (
//   <p className="text-neutral-300">
//     You have canceled your {subscriptionName} plan. Your
//     access to the previous subscription will end on {}
//     <span className="text-white">
//       {subscriptionEndDate!.split(",")[0]}
//     </span>
//   </p>
// )}
//   </div>
//     </div>
//   );
