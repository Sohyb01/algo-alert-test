import { TopPurchasesRowProps } from "./types";

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
