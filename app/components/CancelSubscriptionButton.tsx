"use client";
import React from "react";

const CancelSubscriptionButton = () => {
  const cancelSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/subscription-cancel");
      const { subscription } = await res.json();
      console.log(subscription);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={cancelSubscription} className="btn-1">
      Cancel Subscription
    </button>
  );
};

export default CancelSubscriptionButton;
