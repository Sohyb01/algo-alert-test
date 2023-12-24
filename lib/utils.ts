import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Stripe, loadStripe } from "@stripe/stripe-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    console.log(
      `publishable key from env--> ${process.env.STRIPE_PUBLISHABLE_KEY}`
    );
    // rexxors publishable key manually
    stripePromise = loadStripe(
      `pk_test_51OQf4QJYh1nryesbYtIE26ckuRMdJXMM335T0Z6ObBHJTcFdS4U0ssybMtcb3gvvVohYJ1ooUpe8b0kI8q237HKx00bIJF6W0m`
    );
  }
  return stripePromise;
};

export default getStripe;
