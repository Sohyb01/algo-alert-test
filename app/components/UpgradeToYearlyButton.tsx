"use client";
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
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { revalidatePathManually } from "../actions/revalidatePath";
import { redirectManually } from "../actions/redirectAction";

const UpgradeToYearlyButton = () => {
  const upgradeSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/subscription-upgrade");
      const { subscription } = await res.json();
      if (subscription.status === 200) {
        // revalidatePathManually("/");
        toast.success("Subscription upgraded successfully!");
        revalidatePathManually("/");
        redirectManually("/");
      }
    } catch (error) {
      // toast("An error as occurred, please try again or contact a moderator.");
      // console.log(error);
      toast.error(
        "An error as occurred, please try again or contact a moderator."
      );
      console.log(error);
      revalidatePathManually("/");
      redirectManually("/");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-white" variant="outline">
          Upgrade to Yearly Subscription
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-900 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to upgrade your subscription?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-red-400 border-[1px] border-solid hover:bg-slate-700 bg-slate-900">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="hover:bg-teal-400 bg-slate-900 border-[1px] border-solid border-teal-400"
            onClick={upgradeSubscription}
          >
            Upgrade
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    // <button
    //   onClick={upgradeSubscription}
    //   className="text-white px-4 rounded-full py-2 border-teal-400 border-[1px] border-solid"
    // >
    //   Upgrade to Yearly Subscription
    // </button>
  );
};

export default UpgradeToYearlyButton;
