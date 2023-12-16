"use client";
import { revalidatePath } from "next/cache";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { revalidatePathManually } from "../actions/revalidatePath";
import { checkIfSubscribed } from "../actions/checkIfSubscribed";

const CancelSubscriptionButton = () => {
  const cancelSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/subscription-cancel");
      const { subscription } = await res.json();
      console.log(
        `Testing, cancel at period end or nah: ${subscription.cancel_at_period_end}`
      );
      if (subscription.cancel_at_period_end) {
        revalidatePathManually("/");
        toast("Subscription canceled successfully!");
      }
    } catch (error) {
      toast("An error as occurred, please try again or contact a moderator.");
      revalidatePath("/");
    }
  };

  return (
    <button
      onClick={cancelSubscription}
      className="text-white px-4 rounded-full py-2 border-red-400 border-[1px] border-solid"
    >
      Cancel Subscription
    </button>
  );
};

export default CancelSubscriptionButton;
