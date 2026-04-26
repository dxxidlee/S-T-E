import { useEffect, useState } from "react";

const formatClock = () => {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/New_York",
  });
  return `${time} EST`;
};

export const useClock = () => {
  const [clock, setClock] = useState(formatClock);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(formatClock());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return clock;
};
