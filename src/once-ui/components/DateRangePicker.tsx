"use client";

import React, { useState, useEffect } from "react";
import { Flex, DatePicker } from ".";

export interface DateRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export interface DateRangePickerProps extends Omit<React.ComponentProps<typeof Flex>, "onChange"> {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  size?: "s" | "m" | "l";
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  size = "m",
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState<DateRange>({
    startDate: value?.startDate || undefined,
    endDate: value?.endDate || undefined,
  });

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (value) {
      setInternalValue({
        startDate: value.startDate,
        endDate: value.endDate,
      });
    }
  }, [value]);

  const handleDateChange = (date: Date) => {
    if (!internalValue.startDate || (internalValue.startDate && internalValue.endDate)) {
      // Start new selection
      const newRange = {
        startDate: date,
        endDate: undefined,
      };
      setInternalValue(newRange);
      onChange?.(newRange);
    } else {
      const newRange = {
        startDate: internalValue.startDate,
        endDate: date,
      };

      if (newRange.startDate > date) {
        newRange.startDate = date;
        newRange.endDate = internalValue.startDate;
      }

      setInternalValue(newRange);
      onChange?.(newRange);
    }
  };

  const handleMonthChange = (increment: number) => {
    const newDate = new Date(currentYear, currentMonth + increment, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
    setInternalValue({
      startDate: internalValue.startDate,
      endDate: internalValue.endDate,
    });
  };

  const getSecondMonth = () => {
    const firstMonth = new Date(currentYear, currentMonth, 1);
    const secondMonth = new Date(firstMonth);
    secondMonth.setMonth(secondMonth.getMonth() + 1);
    return secondMonth;
  };

  const getPreviewRange = () => {
    if (!internalValue.startDate || internalValue.endDate || !hoveredDate) return null;
    return {
      startDate: internalValue.startDate,
      endDate: hoveredDate > internalValue.startDate ? hoveredDate : internalValue.startDate,
      isPreview: true,
    };
  };

  return (
    <Flex gap="24" {...rest}>
      <DatePicker
        value={internalValue.startDate}
        onChange={handleDateChange}
        range={getPreviewRange() || internalValue}
        minDate={minDate}
        maxDate={maxDate}
        size={size}
        nextMonth={false}
        currentMonth={currentMonth}
        currentYear={currentYear}
        onMonthChange={handleMonthChange}
        onHover={setHoveredDate}
      />
      <DatePicker
        value={internalValue.endDate}
        onChange={handleDateChange}
        range={getPreviewRange() || internalValue}
        minDate={minDate}
        maxDate={maxDate}
        previousMonth={false}
        size={size}
        currentMonth={getSecondMonth().getMonth()}
        currentYear={getSecondMonth().getFullYear()}
        onMonthChange={handleMonthChange}
        onHover={setHoveredDate}
      />
    </Flex>
  );
};

DateRangePicker.displayName = "DateRangePicker";
export { DateRangePicker };
