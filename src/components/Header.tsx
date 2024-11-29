"use client";

import { useEffect, useState } from "react";
import { Flex, ToggleButton } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";
import { display } from "@/app/resources";
import { renderContent } from "@/app/resources";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = "en-GB",
}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const { person } = renderContent("en");

  return (
    <>
      <Flex
        className={styles.mask}
        position="fixed"
        zIndex={9}
        fillWidth
        minHeight="80"
        justifyContent="center"
      ></Flex>
      <Flex
        style={{ height: "fit-content" }}
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        justifyContent="center"
      >
        <Flex
          paddingLeft="12"
          fillWidth
          alignItems="center"
          textVariant="body-default-s"
        >
          {display.location && <Flex hide="s">Charlotte, North Carolina</Flex>}
        </Flex>
        <Flex fillWidth justifyContent="center"></Flex>
        <Flex fillWidth justifyContent="flex-end" alignItems="center">
          <Flex
            paddingRight="12"
            justifyContent="flex-end"
            alignItems="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex hide="s">
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
