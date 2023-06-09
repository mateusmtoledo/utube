import { useEffect, useState } from "react";

function getRelativeTime(date: string) {
  let dateNumber =
    (new Date().getTime() - new Date(date).getTime()) / 31104000000;
  const dateDistances = [12, 30, 24, 60, 60, 1000];
  const dateNames = ["year", "month", "day", "hour", "minute", "second"];
  for (let i = 0; i < dateDistances.length; i += 1) {
    if (dateNumber >= 1 || i === dateDistances.length - 1) {
      dateNumber = Math.floor(dateNumber);
      return dateNumber === 1
        ? `1 ${dateNames[i]} ago`
        : `${Math.max(dateNumber, 0)} ${dateNames[i]}s ago`;
    }
    dateNumber *= dateDistances[i];
  }
  return "0 seconds ago";
}

export function useRelativeTime(date: string | undefined) {
  const [relativeTime, setRelativeTime] = useState<string | null>(null);
  useEffect(() => {
    if (typeof date === "string") setRelativeTime(getRelativeTime(date));
  }, [date]);
  return relativeTime;
}

function getFormattedDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function useFormattedDate(date: string) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  useEffect(() => {
    setFormattedDate(getFormattedDate(date));
  }, [date]);
  return formattedDate;
}
