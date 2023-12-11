import { TopPurchasesRowProps } from "./types";

// This function will return the last date which the options market was open
function getOptionsMarketStatus() {
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

// Fetch Data from the API
// export const fetchApiData = async () => {
//   const lastMarketDate = getOptionsMarketStatus();
//   try {
//     const response = await fetch(
//       `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/largest_trades?date=${lastMarketDate}`
//     );

//     if (!response.ok) {
//       throw new Error(`Error fetching API Data: ${response.status}`);
//     }
//     const data = await response.json();
//     // 'data' format is:
//     // {

//     // "data": [
//     // {
//     // "a: Symbol": "JPM",
//     // "b: Time": "2023-12-05 09:57:43",
//     // "c: C/P": "CALL",
//     // "d: Strike": "126.00",
//     // "e: Exp Date": "2023-12-15",
//     // "f: Side": "BID",
//     // "g: Size": "1,798",
//     // "h: Price": "31.71",
//     // "i: Prems": "6M",
//     // "j: DTE": "10d",
//     // "k: Spot Price": "157.57",
//     // "l: Volume": "1,798",
//     // "m: Open Interest": "0",
//     // "n: Trade": "",
//     // "trade_value": 5701458
//     // },

//     // ... Rest of the objects]
//     // remaining_pages: number

//     // }

//     let allPagesData = [...data["data"]];
//     console.log("length before looping: ", allPagesData.length);
//     console.log("remaining before looping: ", data["remaining_pages"]);

//     if (data["remaining_pages"] > 0) {
//       for (let i = 2; i < data["remaining_pages"] + 2; i++) {
//         console.log("fetching page no.", i);
//         const additionalPageOfData = await fetch(
//           `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/largest_trades?date=${lastMarketDate}&page=${i}`
//         );
//         console.log("fetched page no.", i, "!");
//         const additionalPageJSON = await additionalPageOfData.json();
//         allPagesData = allPagesData.concat(additionalPageJSON["data"]);
//         console.log("length: ", allPagesData.length);
//         console.log("remaining pages: ", additionalPageJSON["remaining_pages"]);
//       }
//     }

//     console.log("done fetching pages!");

//     return allPagesData;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// export const fetchHottestOptionsApiData = async () => {
//   const lastMarketDate = getOptionsMarketStatus();
//   try {
//     const response = await fetch(
//       `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/top-options?date=${lastMarketDate}`
//     );

//     if (!response.ok) {
//       throw new Error(`Error fetching API Data: ${response.status}`);
//     }
//     const data = await response.json();
//     return data.data;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// Filter For top Gainers Widget
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

// Example usage:
let numberWithCommas = formatNumberWithCommas(1234567890.12345);
console.log(numberWithCommas); // Output: "1,234,567,890.12345"

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

export const analyzeTrades = (trades: any) => {
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

// Example usage:
// const trades = [
//   { "c: C/P": "CALL", trade_value: 100 },
//   { "c: C/P": "PUT", trade_value: 200 },
//   { "c: C/P": "CALL", trade_value: 150 },
//   // Add more objects as needed
// ];

// const analysisResult = analyzeTrades(trades);
// console.log(analysisResult);
