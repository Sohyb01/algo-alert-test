import Stripe from "stripe";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { DatatableRowProps, TopPurchasesRowProps } from "./types";
import { getServerSession } from "next-auth";
import { checkIfSubscribed } from "../actions/checkIfSubscribed";
import getStripe from "@/lib/utils";
import toast from "react-hot-toast";

// Gets the date using an external time API for accurateness
export const getOptionsMarketStatusAsync = async () => {
  // Set the options market hours in Eastern Time (ET)
  const optionsMarketOpenHour = 9; // 9 AM
  const optionsMarketCloseHour = 16.5; // 4:30 PM

  // Fetch the current Eastern Time from TimeAPI
  try {
    const response = await fetch(
      "https://www.timeapi.io/api/Time/current/zone?timeZone=America/New_York"
    );
    const data = await response.json();
    const now = new Date(data.dateTime);

    // Get the current hour in ET
    const currentHourInET = now.getHours() + now.getMinutes() / 60;

    // Get the current day of the week (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
    const currentDay = now.getDay();

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
      if (currentHourInET < optionsMarketOpenHour) {
        lastOpenMarketDate.setDate(lastOpenMarketDate.getDate() - 1);
      }
      while (
        lastOpenMarketDate.getDay() > 5 ||
        lastOpenMarketDate.getDay() < 1
      ) {
        lastOpenMarketDate.setDate(lastOpenMarketDate.getDate() - 1);
      }
    }

    // Format the date as 'YYYY-MM-DD'
    const formattedDate = lastOpenMarketDate.toISOString().split("T")[0];

    console.log(`formatted: ${formattedDate}`);
    return formattedDate;
  } catch (error) {
    console.error("Error fetching time:", error);
    return null;
  }
};

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

export function getPastMonthsWeekDays() {
  const EASTERN_TIME_OFFSET = -5; // Eastern Standard Time (EST) offset from UTC
  let currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + EASTERN_TIME_OFFSET);

  // Exclude the current date
  currentDate.setDate(currentDate.getDate() - 1);

  let pastDates = [];
  let oneMonthAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate()
  );

  // Iterate through the days, going back one month
  for (
    let d = new Date(currentDate);
    d > oneMonthAgo;
    d.setDate(d.getDate() - 1)
  ) {
    // Check if the day is not Saturday (6) or Sunday (0)
    if (d.getDay() !== 6 && d.getDay() !== 0) {
      // Format the date as YYYY-MM-DD
      let formattedDate =
        d.getFullYear() +
        "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + d.getDate()).slice(-2);
      pastDates.push(formattedDate);
    }
  }

  return pastDates;
}

export async function fetchApiDataByDate(date: string) {
  try {
    const response = await fetch(
      `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/largest_trades?date=${date}`
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
          `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/largest_trades?date=${date}&page=${i}`
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

// Fetches the latest available API data
export async function fetchApiData() {
  const lastMarketDateAsync = await getOptionsMarketStatusAsync();
  const lastMarketDate = await getOptionsMarketStatus();
  // console.log(`async: ${lastMarketDateAsync}`);
  // console.log(`normal: ${lastMarketDate}`);
  try {
    const response = await fetch(
      `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/largest_trades?date=${
        lastMarketDateAsync || lastMarketDate
      }`
    );

    if (!response.ok) {
      throw new Error(`Error fetching API Data: ${response.status}`);
    } else {
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
    }
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
  const lastMarketDate = await getOptionsMarketStatus();
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
  let num;
  typeof number === "number"
    ? (num = Math.round(number))
    : (num = Math.round(parseInt(number)));
  // Convert the number to a string
  let numberString = String(num);

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

export const getUserPlanPriceId = async () => {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, {
    apiVersion: "2023-10-16",
  });

  const session = await getServerSession(authOptions);

  const subscriptions = await stripe.subscriptions.list({
    customer: `${session?.user?.stripeCustomerId!}`,
  });

  return subscriptions.data[0].items.data[0].price.id;
};

export const geUserPlanItemId = async () => {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, {
    apiVersion: "2023-10-16",
  });

  const session = await getServerSession(authOptions);

  const subscription = await stripe.subscriptions.list({
    customer: `${session?.user?.stripeCustomerId!}`,
  });

  return subscription.data[0].items.data[0].id;
};

export const handleCreateCheckoutSession = async (productId: string) => {
  const customerHasSubscription = await checkIfSubscribed();
  if (customerHasSubscription) {
    alert("You already have an active plan!");
  } else {
    const res = await fetch("/api/stripe/checkout-session", {
      method: "POST",
      body: JSON.stringify(productId),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const checkoutSession = await res.json().then((value) => {
      if (value.error) {
        // Perhaps add a react hot toast here!
        alert("Please Sign In!");
      }
      return value.session;
    });
    if (checkoutSession) {
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: checkoutSession.id,
      });
    }
  }
};

export const getTopGainersWidgetData = async (data: any) => {
  const objects = // The top 8 Objects with only the required properties to be displayed
    filterUniqueSymbolsWhileKeepingHighestTradeValueOfEachSymbol([...data]); // Make a copy to avoid mutating original

  objects.sort((a, b) => b.trade_value - a.trade_value); // Sort by trade_value property value

  const top8 = objects.slice(0, 8).map((item) => ({
    symbol: item["a: Symbol"],
    contract: item["c: C/P"],
    premium: item["trade_value"],
  })); // The top 8 which will be displayed

  return top8; // Store them in a UseState which will be displayed in the top gainers widget
};
export const getHottestOptionsData = async (data: any) => {
  const objects = // The top Objects with only the required properties to be displayed
    getTopHottestOptionsByTotalSize([...data]); // Make a copy to avoid mutating original
  return objects;
};
export const analyzeTrades = async (trades: any) => {
  // Initialize counters and sums
  let callCount = 0;
  let putCount = 0;
  let callTradeSum = 0;
  let putTradeSum = 0;

  // Iterate through the array of objects
  for (const trade of trades) {
    // Check the value of the "c: C/P" property
    if (trade["c: C/P"] === "CALL") {
      callCount++;
      callTradeSum += parseInt(trade["g: Size"]);
    } else if (trade["c: C/P"] === "PUT") {
      putCount++;
      putTradeSum += parseInt(trade["g: Size"]);
    }
  }

  let totalFlows = callCount + putCount;
  const callFlowPercentage = Math.round(1000 * (callCount / totalFlows)) / 10;
  const putFlowPercentage = Math.round(1000 * (putCount / totalFlows)) / 10;

  let totalPremiums = callTradeSum + putTradeSum;
  const callPremiumPercentage =
    Math.round(1000 * (callTradeSum / totalPremiums)) / 10;
  const putPremiumPercentage =
    Math.round(1000 * (putTradeSum / totalPremiums)) / 10;

  // Create and return the result object
  const result = {
    callFlows: callCount,
    callFlowsPercentage: callFlowPercentage,
    callPremiumSum: callTradeSum,
    callPremiumPercentage: callPremiumPercentage,
    putFlows: putCount,
    putFlowsPercentage: putFlowPercentage,
    putPremiumSum: putTradeSum,
    putPremiumPercentage: putPremiumPercentage,
  };

  return result;
};
