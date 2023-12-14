import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Stripe, loadStripe } from "@stripe/stripe-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51NmOWMCJ7W2t3weqPgDQAiQBIEuZp4rNAphapt05icaCLoQu0cb087MCUIBGwzkBsHwDmNMT5RA6o0OREAkGCxjX00CNSy6UIM"
    );
  }
  return stripePromise;
};

export default getStripe;
