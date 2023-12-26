"use server";
export const getOptionsMarketStatusOnServer = async () => {
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

    // console.log(`formatted: ${formattedDate}`);
    return formattedDate;
  } catch (error) {
    console.error("Error fetching time:", error);
    return null;
  }
};
