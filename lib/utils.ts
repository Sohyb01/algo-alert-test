import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Stripe, loadStripe } from "@stripe/stripe-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    console.log(`publishable key --> ${process.env.STRIPE_PUBLISHABLE_KEY}`);
    stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
  }
  return stripePromise;
};

export default getStripe;
