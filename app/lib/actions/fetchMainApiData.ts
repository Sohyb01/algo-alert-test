"use server";

import { getOptionsMarketStatus } from "./getOptionsMarketStatus";

export async function fetchApiDataOnServer() {
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

    return allPagesData;
  } catch (error) {
    console.error("Error:", error);
  }
}
