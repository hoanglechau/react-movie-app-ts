// This file contains all the functions that convert the data from the API to a more readable format
export const timeConvert = (time: number) => {
  const hours = time / 60;
  const roundedHours = Math.floor(hours);
  const minutes = (hours - roundedHours) * 60;
  const roundedMinutes = Math.round(minutes);
  return `${roundedHours}h ${roundedMinutes}m`;
};

export const dateConvert = (date: string) => {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da} ${mo} ${ye}`;
};
