"use server";

import { getOptionsMarketStatus } from "./getOptionsMarketStatus";

export const fetchHottestOptionsApiDataOnServer = async () => {
  const lastMarketDate = getOptionsMarketStatus();
  try {
    const response = await fetch(
      `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/top-options?date=${lastMarketDate}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching API Data: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
