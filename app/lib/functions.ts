import Stripe from "stripe";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { DatatableRowProps, TopPurchasesRowProps } from "./types";
import { getServerSession } from "next-auth";

export function getOptionsMarketStatus() {
  // Set the options market hours in Eastern Time (ET)
  const optionsMarketOpenHour = 9; // 9 AM
  const optionsMarketCloseHour = 16.5; // 4:30 PM
  const optionsMarketTimeZoneOffset = -5; // Eastern Time (ET) is UTC-5

  // Get the current date and time
  const now = new Date();

  // Adjust for the Eastern Time Zone
  const currentHourInET = now.getUTCHours() + optionsMarketTimeZoneOffset;

  // Get the current day of the week (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
  const currentDay = now.getUTCDay();

  // Check if it's a weekday and within the options market hours
  const isWeekday = currentDay >= 1 && currentDay <= 5;
  const isOptionsMarketHours =
    isWeekday &&
    currentHourInET >= optionsMarketOpenHour &&
    currentHourInET < optionsMarketCloseHour;

  // Find the date of the last open market day
  let lastOpenMarketDate = new Date(now);
  if (!isOptionsMarketHours || currentHourInET >= optionsMarketCloseHour) {
    // If today is not a weekday or the market has closed for the day,
    // find the most recent weekday (Monday to Friday)
    if (lastOpenMarketDate.getUTCHours() - 5 < 9) {
      lastOpenMarketDate.setDate(lastOpenMarketDate.getUTCDate() - 1);
    }
    while (
      lastOpenMarketDate.getUTCDay() > 5 ||
      lastOpenMarketDate.getUTCDay() < 1
    ) {
      lastOpenMarketDate.setDate(lastOpenMarketDate.getUTCDate() - 1);
    }
  }

  // Format the date as 'YYYY-MM-DD'
  const formattedDate = lastOpenMarketDate.toISOString().split("T")[0];

  return formattedDate;
}

export async function fetchApiData() {
  const lastMarketDate = getOptionsMarketStatus();
  try {
    const response = await fetch(
      `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/largest_trades?date=${lastMarketDate}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching API Data: ${response.status}`);
    }
    const data = await response.json();

    let allPagesData = [...data["data"]];
    // console.log("length before looping: ", allPagesData.length);
    // console.log("remaining before looping: ", data["remaining_pages"]);

    if (data["remaining_pages"] > 0) {
      for (let i = 2; i < data["remaining_pages"] + 2; i++) {
        // console.log("fetching page no.", i);
        const additionalPageOfData = await fetch(
          `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/largest_trades?date=${lastMarketDate}&page=${i}`
        );
        // console.log("fetched page no.", i, "!");
        const additionalPageJSON = await additionalPageOfData.json();
        allPagesData = allPagesData.concat(additionalPageJSON["data"]);
        // console.log("length: ", allPagesData.length);
        // console.log("remaining pages: ", additionalPageJSON["remaining_pages"]);
      }
    }

    // console.log("done fetching pages!");

    return allPagesData.reverse();
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function filterObjectsBySymbol(
  arrayOfObjects: any,
  ...symbols: string[]
) {
  return arrayOfObjects.filter((obj: any) =>
    symbols.includes(obj["a: Symbol"])
  );
}

export const fetchHottestOptionsApiData = async () => {
  const lastMarketDate = getOptionsMarketStatus();
  try {
    const response = await fetch(
      `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/top-options?date=${lastMarketDate}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching API Data: ${response.status}`);
    }
    const data = await response.json();

    // console.log("data:", data);
    let allPagesData = [...data["data"]];
    // console.log("length before looping: ", allPagesData.length);
    // console.log("remaining before looping: ", data["remaining_pages"]);

    if (data["remaining_pages"] > 0) {
      for (let i = 2; i < data["remaining_pages"] + 2; i++) {
        // console.log("fetching page no.", i);
        const additionalPageOfData = await fetch(
          `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/top-options?date=${lastMarketDate}&page=${lastMarketDate}`
        );
        // console.log("fetched page no.", i, "!");
        const additionalPageJSON = await additionalPageOfData.json();
        allPagesData = allPagesData.concat(additionalPageJSON["data"]);
        // console.log("length: ", allPagesData.length);
        // console.log("remaining pages: ", additionalPageJSON["remaining_pages"]);
      }
    }

    return allPagesData.reverse();
  } catch (error) {
    console.error("Error:", error);
  }
};

export const filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol = (
  objects: object[]
) => {
  const groupedObjects = objects.reduce((groups: any, obj: any) => {
    const symbol = obj["a: Symbol"];
    groups[symbol] = groups[symbol] || [];
    groups[symbol].push(obj);
    return groups;
  }, {});

  const filteredObjects = Object.values(groupedObjects).map((group: any) => {
    const maxTradeValueObj = group.reduce((maxObj: any, obj: any) => {
      return obj["trade_value"] > maxObj["trade_value"] ? obj : maxObj;
    }, group[0]);

    return maxTradeValueObj;
  });

  return filteredObjects;
};

export const formatNumberWithCommas = (number: number | string) => {
  // Convert the number to a string
  let numberString = String(number);

  // Split the string into integer and decimal parts (if any)
  let parts = numberString.split(".");

  // Format the integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Join the integer and decimal parts (if any) and return the result
  return parts.join(".");
};

// Filter For Hottest Options / Top Purchases Widget
export const getTopHottestOptionsByTotalSize = (
  objects: TopPurchasesRowProps[]
) => {
  // Sort the array of objects based on the "total_size" property in descending order
  const sortedArray = objects.sort((a, b) => b.total_size - a.total_size);

  // Take the top 5 objects
  const top5Objects = sortedArray.slice(0, 5);

  return top5Objects;
};

export async function convertPropertiesToNumbers(array: any) {
  array.forEach((obj: any) => {
    obj["d: Strike"] = parseFloat(obj["d: Strike"]);
    obj["g: Size"] = parseInt(obj["g: Size"].replace(/,/g, ""), 10);
    obj["h: Price"] = parseFloat(obj["h: Price"]);
    obj["k: Spot Price"] = parseFloat(obj["k: Spot Price"]);
    obj["l: Volume"] = parseInt(obj["l: Volume"].replace(/,/g, ""), 10);
    obj["m: Open Interest"] = parseInt(obj["m: Open Interest"], 10);
  });
  return array;
}

export const getStripeSubscriptionName = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.subscriptionID) {
    return null;
  } else {
    const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, {
      apiVersion: "2023-10-16",
    });
    // Retrieve the subscription
    const subscription = await stripe.subscriptions.retrieve(
      session?.user?.subscriptionID
    );

    // Assuming the subscription has at least one item
    // Get the price ID from the first item
    const priceId = subscription.items.data[0].price.id;

    // Retrieve the price object
    const price = await stripe.prices.retrieve(priceId);

    // Retrieve the product ID from the price object
    const productId = price.product;

    // Retrieve the product object
    const product = await stripe.products.retrieve(productId as string);

    // Get the product name
    return product.name;
  }
};

export const getStripePlanEndDate = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.subscriptionID) {
    return null;
  } else {
    const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, {
      apiVersion: "2023-10-16",
    });
    // Retrieve the subscription
    const subscription = await stripe.subscriptions.retrieve(
      session?.user?.subscriptionID
    );

    // Get the end of the current period
    const periodEnd = subscription.current_period_end;

    // Convert the timestamp to a readable date format
    const endDate = new Date(periodEnd * 1000).toLocaleString();

    return endDate;
  }
};

export const checkIfUserHasAlreadyCanceled = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.subscriptionID) {
    return null;
  } else {
    const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, {
      apiVersion: "2023-10-16",
    });
    const hasCanceled = await stripe.subscriptions
      .retrieve(session?.user?.subscriptionID)
      .then((user) => user.cancel_at_period_end);
    return hasCanceled;
  }
};
// Check if user is subscribed, if so return subscription
//
//
//
//
//
//
//
