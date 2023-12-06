// This function will return the last date which the options market was open
function getOptionsMarketStatus() {
  // Set the options market hours in Eastern Time (ET)
  const optionsMarketOpenHour = 9;
  const optionsMarketCloseHour = 16;
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
const marketStatusDate = getOptionsMarketStatus();
console.log(`The options market status date is: ${marketStatusDate}`);

////////////
