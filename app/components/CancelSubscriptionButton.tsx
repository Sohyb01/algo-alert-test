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
import { redirectManually } from "../actions/redirectAction";

const CancelSubscriptionButton = () => {
  const cancelSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/subscription-cancel");
      const { subscription } = await res.json();
      if (subscription.cancel_at_period_end) {
        toast("Subscription Canceled.");
        revalidatePathManually("/");
        redirectManually("/");
      }
    } catch (error) {
      toast("An error as occurred, please try again or contact a moderator.");
      console.log(error);
      revalidatePathManually("/");
      redirectManually("/");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-white hover:bg-slate-700" variant="outline">
          Cancel Subscription
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-900 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to cancel your subscription?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-slate-700 bg-slate-900">
            Back
          </AlertDialogCancel>
          <AlertDialogAction
            className="border-red-400 border-[1px] border-solid hover:bg-slate-700 bg-slate-900"
            onClick={cancelSubscription}
          >
            Yes, Cancel my Subscription
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
