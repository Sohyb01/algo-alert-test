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
  if (!isWeekday || currentHourInET >= optionsMarketCloseHour) {
    // If today is not a weekday or the market has closed for the day,
    // find the most recent weekday (Monday to Friday)
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

// Example usage
// const marketStatusDate = getOptionsMarketStatus();
// console.log(`The options market status date is: ${marketStatusDate}`);

// Fetch Data from the API
export const fetchApiData = async () => {
  const lastMarketDate = getOptionsMarketStatus();
  try {
    const response = await fetch(
      `https://alphasweeps-ae44af8990fe.herokuapp.com/api/data/largest_trades?date=${lastMarketDate}`
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
