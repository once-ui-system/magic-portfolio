"use client";

import { useEffect, useState } from "react";

/**
 * Props for the TimeDisplay component
 */
interface TimeDisplayProps {
  /** 
   * The timezone to display time for, in IANA format (e.g., "America/New_York")
   */
  timeZone: string;
  /** 
   * Optional locale for time formatting, defaults to 'en-GB'
   */
  locale?: string;
}

/**
 * Displays the current time in the specified timezone
 * 
 * @param props - Component properties
 * @returns A formatted time display with timezone abbreviation
 */
export const TimeDisplay: React.FC<TimeDisplayProps> = ({ 
  timeZone, 
  locale = "en-GB" 
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [timeZoneAbbr, setTimeZoneAbbr] = useState<string>("");

  useEffect(() => {
    const updateTime = (): void => {
      const now = new Date();
      
      // Validate timezone format
      let validTimeZone = timeZone;
      try {
        // Test if the timezone is valid by attempting to use it
        Intl.DateTimeFormat(locale, { timeZone: validTimeZone });
      } catch (error) {
        // If invalid timezone, fallback to UTC and log error
        validTimeZone = "UTC";
        // Use a more graceful error handling approach instead of console.warn
        setTimeZoneAbbr("UTC"); // Set abbreviation directly in error case
      }
      
      const options: Intl.DateTimeFormatOptions = {
        timeZone: validTimeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      
      try {
        const timeString = new Intl.DateTimeFormat(locale, options).format(now);
        setCurrentTime(timeString);
        
        // Get timezone abbreviation
        const tzOptions: Intl.DateTimeFormatOptions = {
          timeZone: validTimeZone,
          timeZoneName: "short",
        };
        
        const tzString = new Intl.DateTimeFormat(locale, tzOptions)
          .formatToParts(now)
          .find(part => part.type === "timeZoneName")?.value || "";
          
        setTimeZoneAbbr(tzString);
      } catch (error) {
        // Handle errors gracefully with fallback values
        setCurrentTime("--:--:--");
        setTimeZoneAbbr("");
      }
    };

    // Initial update
    updateTime();
    
    // Set interval for updating the time
    const intervalId = setInterval(updateTime, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return (
    <>{currentTime} {timeZoneAbbr}</>
  );
};

export default TimeDisplay;

