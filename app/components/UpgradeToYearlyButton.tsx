"use client";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { revalidatePathManually } from "../actions/revalidatePath";

const UpgradeToYearlyButton = () => {
  const upgradeSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/subscription-upgrade");
      const { subscription } = await res.json();
      if (subscription.status === 200) {
        // revalidatePathManually("/");
        toast("Subscription upgraded successfully!");
      }
    } catch (error) {
      // toast("An error as occurred, please try again or contact a moderator.");
      // console.log(error);
      toast.error(
        "An error as occurred, please try again or contact a moderator.",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  return (
    <button
      onClick={upgradeSubscription}
      className="text-white px-4 rounded-full py-2 border-teal-400 border-[1px] border-solid"
    >
      Upgrade to Yearly Subscription
    </button>
  );
};

export default UpgradeToYearlyButton;
