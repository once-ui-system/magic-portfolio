"use client";

import React, { useState, forwardRef, useEffect } from "react";
import classNames from "classnames";
import { Flex, Text, Button, Grid, SegmentedControl, IconButton, RevealFx, NumberInput } from ".";
import styles from "./DatePicker.module.scss";

export interface DatePickerProps extends Omit<React.ComponentProps<typeof Flex>, "onChange"> {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  previousMonth?: boolean;
  nextMonth?: boolean;
  timePicker?: boolean;
  defaultDate?: Date;
  defaultTime?: {
    hours: number;
    minutes: number;
  };
  size?: "s" | "m" | "l";
  className?: string;
  style?: React.CSSProperties;
  currentMonth?: number;
  currentYear?: number;
  onMonthChange?: (increment: number) => void;
  range?: {
    startDate?: Date;
    endDate?: Date;
  };
  onHover?: (date: Date | null) => void;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      timePicker = false,
      previousMonth = true,
      nextMonth = true,
      minDate,
      maxDate,
      defaultDate,
      defaultTime,
      size = "m",
      className,
      style,
      currentMonth: propCurrentMonth,
      currentYear: propCurrentYear,
      onMonthChange,
      range,
      onHover,
      ...rest
    },
    ref,
  ) => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
    const [selectedTime, setSelectedTime] = useState<
      | {
          hours: number;
          minutes: number;
        }
      | undefined
    >(defaultTime);
    const [isPM, setIsPM] = useState(defaultTime?.hours ? defaultTime.hours >= 12 : false);
    const [isTimeSelector, setIsTimeSelector] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const [currentMonth, setCurrentMonth] = useState<number>(
      value ? value.getMonth() : today.getMonth(),
    );
    const [currentYear, setCurrentYear] = useState<number>(
      value ? value.getFullYear() : today.getFullYear(),
    );

    useEffect(() => {
      if (typeof propCurrentMonth === "number") {
        setCurrentMonth(propCurrentMonth);
      }
      if (typeof propCurrentYear === "number") {
        setCurrentYear(propCurrentYear);
      }
    }, [propCurrentMonth, propCurrentYear]);

    useEffect(() => {
      setSelectedDate(value);
      if (value) {
        setSelectedTime({
          hours: value.getHours(),
          minutes: value.getMinutes(),
        });
        setIsPM(value.getHours() >= 12);
      }
    }, [value]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 100);

      return () => clearTimeout(timer);
    }, []);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const handleTimeToggle = (show: boolean) => {
      setIsTransitioning(false);
      setTimeout(() => {
        setIsTimeSelector(show);
        setIsTransitioning(true);
      }, 400);
    };

    const handleDateSelect = (date: Date) => {
      const newDate = new Date(date);
      if (timePicker && selectedDate && selectedTime) {
        newDate.setHours(selectedTime.hours);
        newDate.setMinutes(selectedTime.minutes);
      }
      setSelectedDate(newDate);
      if (timePicker) {
        handleTimeToggle(true);
      } else {
        onChange?.(newDate);
      }
    };

    const handleMonthChange = (increment: number) => {
      if (onMonthChange) {
        // Delegate to external handler
        onMonthChange(increment);
      } else {
        // Fallback to internal state management
        const newMonth = currentMonth + increment;
        if (newMonth < 0) {
          setCurrentMonth(11); // December
          setCurrentYear(currentYear - 1);
        } else if (newMonth > 11) {
          setCurrentMonth(0); // January
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(newMonth);
        }
      }
    };

    const convert24to12 = (hour24: number) => {
      if (hour24 === 0) return 12;
      if (hour24 > 12) return hour24 - 12;
      return hour24;
    };

    const handleTimeChange = (hours: number, minutes: number, pm: boolean = isPM) => {
      if (!selectedDate) return;

      const newTime = {
        hours: pm ? (hours === 12 ? 12 : hours + 12) : hours === 12 ? 0 : hours,
        minutes,
      };
      setSelectedTime(newTime);
      setIsPM(pm);

      const newDate = new Date(selectedDate);
      newDate.setHours(newTime.hours);
      newDate.setMinutes(minutes);
      onChange?.(newDate);
    };

    const isInRange = (date: Date) => {
      if (!range?.startDate) return false;
      if (!range?.endDate) return false;
      return date >= range.startDate && date <= range.endDate;
    };

    const renderCalendarGrid = () => {
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

      // Calculate total number of weeks needed
      const totalDaysShown = firstDay + daysInMonth;
      const numberOfWeeks = Math.ceil(totalDaysShown / 7);
      const totalGridSpots = numberOfWeeks * 7;

      const days = [];

      // Previous month's days
      for (let i = 0; i < firstDay; i++) {
        const prevMonthDay = daysInPrevMonth - firstDay + i + 1;
        days.push(
          //@ts-ignore
          <Flex
            paddingY="2"
            width="40"
            height="40"
            key={`prev-${currentYear}-${currentMonth}-${i}`}
          >
            <Button fillWidth weight="default" variant="tertiary" size="m" disabled>
              {prevMonthDay}
            </Button>
          </Flex>,
        );
      }

      // Current month's days
      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(currentYear, currentMonth, day);
        const isSelected =
          (selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === currentMonth &&
            selectedDate?.getFullYear() === currentYear) ||
          (value instanceof Date && value.getTime() === currentDate.getTime()) ||
          range?.startDate?.getTime() === currentDate.getTime() ||
          range?.endDate?.getTime() === currentDate.getTime();

        const isFirstInRange =
          range?.startDate && currentDate.getTime() === range.startDate.getTime();
        const isLastInRange = range?.endDate && currentDate.getTime() === range.endDate.getTime();

        // Check if the current date is out of the minDate and maxDate range
        const isDisabled = (minDate && currentDate < minDate) || (maxDate && currentDate > maxDate);

        days.push(
          //@ts-ignore
          <Flex paddingY="2" key={`day-${currentYear}-${currentMonth}-${day}`}>
            <Flex
              width="40"
              height="40"
              background={isInRange(currentDate) ? "neutral-alpha-weak" : undefined}
              borderTop={isInRange(currentDate) ? "neutral-alpha-weak" : "transparent"}
              borderBottom={isInRange(currentDate) ? "neutral-alpha-weak" : "transparent"}
              leftRadius={isFirstInRange ? "m" : undefined}
              rightRadius={isLastInRange ? "m" : undefined}
            >
              <Button
                fillWidth
                weight={isSelected ? "strong" : "default"}
                variant={isSelected ? "primary" : "tertiary"}
                size="m"
                onClick={() => !isDisabled && handleDateSelect(currentDate)}
                onMouseEnter={() => onHover?.(currentDate)}
                onMouseLeave={() => onHover?.(null)}
                disabled={isDisabled}
              >
                {day}
              </Button>
            </Flex>
          </Flex>,
        );
      }

      const remainingDays = totalGridSpots - days.length;

      for (let i = 1; i <= remainingDays; i++) {
        days.push(
          //@ts-ignore
          <Flex
            marginTop="2"
            width="40"
            height="40"
            key={`next-${currentYear}-${currentMonth}-${i}`}
          >
            <Button fillWidth weight="default" variant="tertiary" size="m" disabled>
              {i}
            </Button>
          </Flex>,
        );
      }

      return days;
    };

    return (
      <Flex
        ref={ref}
        className={classNames(styles.calendar, className)}
        style={style}
        direction="column"
        fillWidth
        horizontal="center"
        gap={size}
        {...rest}
      >
        <Flex fillWidth center>
          {isTimeSelector ? (
            <Flex horizontal="center" fillWidth direction="column" gap="8">
              <Text variant={`label-default-${size}`} onBackground="neutral-strong">
                {monthNames[currentMonth]} {currentYear}
              </Text>
              <Text
                className="cursor-interactive"
                variant="label-default-s"
                onBackground="brand-weak"
                onClick={() => handleTimeToggle(false)}
              >
                Back to calendar
              </Text>
            </Flex>
          ) : (
            <>
              {previousMonth && (
                <IconButton
                  variant="tertiary"
                  size={size === "l" ? "l" : "m"}
                  icon="chevronLeft"
                  onClick={(event: any) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleMonthChange(-1);
                  }}
                />
              )}
              <Flex fillWidth direction="column" horizontal="center" gap="8">
                <Text variant={`body-default-${size}`} onBackground="neutral-strong">
                  {monthNames[currentMonth]} {currentYear}
                </Text>
                {timePicker && selectedTime && (
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {`${selectedTime.hours.toString().padStart(2, "0")}:${selectedTime.minutes.toString().padStart(2, "0")} ${isPM ? "PM" : "AM"}`}
                  </Text>
                )}
              </Flex>
              {nextMonth && (
                <IconButton
                  variant="tertiary"
                  size={size === "l" ? "l" : "m"}
                  icon="chevronRight"
                  onClick={(event: any) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleMonthChange(1);
                  }}
                />
              )}
            </>
          )}
        </Flex>

        <RevealFx
          fillWidth
          horizontal="center"
          vertical="center"
          key={isTimeSelector ? "time" : "date"}
          trigger={isTransitioning}
          speed="fast"
        >
          {isTimeSelector ? (
            <Flex
              maxWidth={24}
              horizontal="center"
              vertical="center"
              direction="column"
              padding="32"
              gap="32"
            >
              <SegmentedControl
                buttons={[
                  {
                    value: "AM",
                    label: "AM",
                  },
                  {
                    value: "PM",
                    label: "PM",
                  },
                ]}
                selected={isPM ? "PM" : "AM"}
                onToggle={(value) =>
                  handleTimeChange(
                    selectedTime?.hours ?? 0,
                    selectedTime?.minutes ?? 0,
                    value === "PM",
                  )
                }
              />
              <Flex fillWidth gap="16" vertical="center" data-scaling="110">
                <NumberInput
                  id="hours"
                  label="Hours"
                  labelAsPlaceholder
                  min={1}
                  max={12}
                  value={selectedTime?.hours ? convert24to12(selectedTime.hours) : 12}
                  onChange={(value) => {
                    if (value >= 1 && value <= 12) {
                      handleTimeChange(value, selectedTime?.minutes ?? 0);
                    }
                  }}
                  aria-label="Hours"
                />
                :
                <NumberInput
                  id="minutes"
                  label="Minutes"
                  labelAsPlaceholder
                  min={0}
                  max={59}
                  padStart={2}
                  value={selectedTime?.minutes ?? 0}
                  onChange={(value) => {
                    if (value >= 0 && value <= 59) {
                      handleTimeChange(selectedTime?.hours ?? 0, value);
                    }
                  }}
                  aria-label="Minutes"
                />
              </Flex>
            </Flex>
          ) : (
            <Grid fitWidth columns="7">
              {dayNames.map((day) => (
                <Text
                  marginBottom="16"
                  key={day}
                  variant="label-default-m"
                  onBackground="neutral-medium"
                  align="center"
                >
                  {day}
                </Text>
              ))}
              {renderCalendarGrid()}
            </Grid>
          )}
        </RevealFx>
      </Flex>
    );
  },
);

DatePicker.displayName = "DatePicker";
export { DatePicker };
