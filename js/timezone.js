// timezone.js

// Populate datalist with all supported timezones
export function populateTimeZones() {
  const tzList = document.getElementById("tz-list");

  if (!tzList) return;

  if (Intl.supportedValuesOf) {
    const zones = Intl.supportedValuesOf("timeZone").sort();

    zones.forEach((zone) => {
      const option = document.createElement("option");
      option.value = zone;
      tzList.appendChild(option);
    });
  }

  // Auto detect user's timezone
  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const toInput = document.getElementById("to-tz");
  if (toInput && userTz) {
    toInput.value = userTz;
  }
}


// Helper: get timezone offset in milliseconds
function getTimeZoneOffset(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const parts = formatter.formatToParts(date);

  const values = {};
  parts.forEach(({ type, value }) => {
    if (type !== "literal") {
      values[type] = value;
    }
  });

  const asUTC = Date.UTC(
    values.year,
    values.month - 1,
    values.day,
    values.hour,
    values.minute,
    values.second
  );

  return asUTC - date.getTime();
}


// Core conversion function
export function convertTime({ date, time, fromTimeZone, toTimeZone }) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  // Create initial UTC guess
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute));

  // Get correct offset for source timezone
  const offset = getTimeZoneOffset(utcGuess, fromTimeZone);

  // Adjust to get real instant
  const instant = new Date(utcGuess.getTime() - offset);

  // Format in both timezones
  const formatOptions = {
    dateStyle: "full",
    timeStyle: "short"
  };

  const sourceFormatted = new Intl.DateTimeFormat("en-US", {
    ...formatOptions,
    timeZone: fromTimeZone
  }).format(instant);

  const targetFormatted = new Intl.DateTimeFormat("en-US", {
    ...formatOptions,
    timeZone: toTimeZone
  }).format(instant);

  // Detect date shift
  const sourceDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: fromTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(instant);

  const targetDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: toTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(instant);

  const dateShift = sourceDate !== targetDate;

  return {
    instant,
    sourceFormatted,
    targetFormatted,
    dateShift
  };
}
