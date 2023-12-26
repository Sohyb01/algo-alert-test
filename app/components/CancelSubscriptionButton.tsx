"use client";
import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";

import React from "react";
import { revalidatePathManually } from "../actions/revalidatePath";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const CancelSubscriptionButton = () => {
  const cancelSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/subscription-cancel");
      const { subscription } = await res.json();
      if (subscription.cancel_at_period_end) {
        toast("Subscription canceled successfully!");
        revalidatePathManually("/");
      }
    } catch (error) {
      toast("An error as occurred, please try again or contact a moderator.");
      revalidatePath("/");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Cancel Subscription</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to cancel your subscription?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={cancelSubscription}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    // <button
    //   onClick={cancelSubscription}
    //   className="text-white px-4 rounded-full py-2 border-red-400 border-[1px] border-solid"
    // >
    //   Cancel Subscription
    // </button>
  );
};

export default CancelSubscriptionButton;
