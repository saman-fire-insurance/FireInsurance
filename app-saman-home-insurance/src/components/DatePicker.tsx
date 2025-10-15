"use client";

import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getCurrentJalaliDate,
  getDaysInMonth,
  jalaliToGregorian,
  calculateDaysDifference,
  createGregorianDate,
} from "@/lib/jalali-utils";

// Persian month names
const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

// Helper function to safely parse values
function safeParseInt(value: any): number | undefined {
  if (value === null || value === undefined) return undefined;
  const parsed = parseInt(String(value), 10);
  return isNaN(parsed) ? undefined : parsed;
}

export type DateFormat = "yyyy" | "yyyy-MM" | "yyyy-MM-dd";

type DatePickerProps = {
  value?: {
    day?: number | null;
    month?: number | null;
    year?: number | null;
    gregorian?: { year: number; month: number; day: number } | null;
    daysDifference?: number | null;
  } | null;
  onChange?: (
    date:
      | {
          day?: number;
          month?: number;
          year?: number;
          gregorian?: { year: number; month: number; day: number } | null;
          daysDifference?: number | null;
        }
      | undefined
  ) => void;
  minDate?: { year: number; month?: number; day?: number };
  maxDate?: { year: number; month?: number; day?: number };
  minYear?: number;
  maxYear?: number;
  format?: DateFormat;
  openStates?: {
    year: boolean;
    month: boolean;
    day: boolean;
  };
  onOpenChange?: (field: "year" | "month" | "day", isOpen: boolean) => void;
  isInvalid?: boolean;
};

export default function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  minYear,
  maxYear,
  format = "yyyy-MM-dd",
  onOpenChange,
  isInvalid,
}: DatePickerProps) {
  // Get current Jalali date for defaults
  const currentDate = getCurrentJalaliDate();

  // Safely parse values to avoid NaN issues
  const safeYear = safeParseInt(value?.year);
  const safeMonth = safeParseInt(value?.month);
  const safeDay = safeParseInt(value?.day);

  // Set default min/max years
  const defaultMinYear = 1300;
  const defaultMaxYear = currentDate.year;

  // Calculate effective min/max dates - prioritize specific year props over date props
  const effectiveMinYear = minYear ?? minDate?.year ?? defaultMinYear;
  const effectiveMaxYear = maxYear ?? maxDate?.year ?? defaultMaxYear;

  const effectiveMinMonth =
    safeYear === minDate?.year && minDate?.month ? minDate.month : 1;
  const effectiveMaxMonth =
    safeYear === maxDate?.year && maxDate?.month ? maxDate.month : 12;

  const effectiveMinDay =
    safeYear === minDate?.year && safeMonth === minDate?.month && minDate?.day
      ? minDate.day
      : 1;

  const effectiveMaxDay =
    safeYear === maxDate?.year && safeMonth === maxDate?.month && maxDate?.day
      ? maxDate.day
      : getDaysInMonth(safeMonth, safeYear);

  // Generate years array
  const yearsArray = Array.from(
    { length: effectiveMaxYear - effectiveMinYear + 1 },
    (_, i) => effectiveMaxYear - i
  );

  // Generate months array
  const monthsArray = persianMonths
    .map((month, index) => ({ name: month, value: index + 1 }))
    .slice(effectiveMinMonth - 1, effectiveMaxMonth);

  // Generate days array
  const daysArray =
    safeYear && safeMonth
      ? Array.from(
          { length: getDaysInMonth(safeMonth, safeYear) },
          (_, i) => i + 1
        ).filter((day) => day >= effectiveMinDay && day <= effectiveMaxDay)
      : [];

  // Handle year selection
  const handleYearChange = (newYear: string) => {
    const year = parseInt(newYear, 10);
    if (isNaN(year)) return;

    const currentMonth = safeMonth ?? 1;
    const maxDays = getDaysInMonth(currentMonth, year);
    const currentDay = safeDay ? Math.min(safeDay, maxDays) : 1;
    const gregorianDate = jalaliToGregorian(year, currentMonth, currentDay);

    let diff = null;
    if (gregorianDate) {
      // Create Date object using the utility function
      const selectedDate = createGregorianDate(
        gregorianDate.year,
        gregorianDate.month,
        gregorianDate.day
      );
      const today = new Date();
      diff = calculateDaysDifference(selectedDate, today);
    }

    if (onChange) {
      onChange({
        year,
        month: currentMonth,
        day: currentDay,
        gregorian: gregorianDate,
        daysDifference: diff,
      });
    }

    if (onOpenChange) {
      onOpenChange("year", false);
      if (format.includes("MM")) {
        setTimeout(() => onOpenChange("month", true), 100);
      }
    }
  };

  // Handle month selection
  const handleMonthChange = (newMonth: string) => {
    const month = parseInt(newMonth, 10);
    if (isNaN(month)) return;

    const currentYear = safeYear ?? currentDate.year;
    const maxDays = getDaysInMonth(month, currentYear);
    const currentDay = safeDay ? Math.min(safeDay, maxDays) : 1;
    const gregorianDate = jalaliToGregorian(currentYear, month, currentDay);

    let diff = null;
    if (gregorianDate) {
      // Create Date object using the utility function
      const selectedDate = createGregorianDate(
        gregorianDate.year,
        gregorianDate.month,
        gregorianDate.day
      );
      const today = new Date();
      diff = calculateDaysDifference(selectedDate, today);
    }

    if (onChange) {
      onChange({
        year: currentYear,
        month,
        day: currentDay,
        gregorian: gregorianDate,
        daysDifference: diff,
      });
    }

    if (onOpenChange) {
      onOpenChange("month", false);
      if (format.includes("dd")) {
        setTimeout(() => onOpenChange("day", true), 100);
      }
    }
  };

  // Handle day selection
  const handleDayChange = (newDay: string) => {
    const day = parseInt(newDay, 10);
    if (isNaN(day)) return;

    const currentYear = safeYear ?? currentDate.year;
    const currentMonth = safeMonth ?? 1;
    const gregorianDate = jalaliToGregorian(currentYear, currentMonth, day);

    let diff = null;
    if (gregorianDate) {
      // Create Date object using the utility function
      const selectedDate = createGregorianDate(
        gregorianDate.year,
        gregorianDate.month,
        gregorianDate.day
      );
      const today = new Date();
      diff = calculateDaysDifference(selectedDate, today);
    }

    if (onChange) {
      onChange({
        year: currentYear,
        month: currentMonth,
        day,
        gregorian: gregorianDate,
        daysDifference: diff,
      });
    }

    if (onOpenChange) {
      onOpenChange("day", false);
    }
  };

  // Determine which fields to show based on format
  const showMonth = format.includes("MM");
  const showDay = format.includes("dd");

  return (
    <div className="flex flex-row gap-2 justify-center">
      {/* Year Selector */}
      <div className="w-1/3 rounded-md border border-border bg-gray-50 placeholder:text-placeholder placeholder:text-sm placeholder:font-normal">
        <FormControl>
          <Select
            value={safeYear?.toString()}
            onValueChange={handleYearChange}
            dir="rtl"
          >
            <SelectTrigger
              className={`text-right text-textBlack placeholder:text-gray-400 ${
                isInvalid ? "border-red-500 bg-red-50" : ""
              }`}
              aria-invalid={isInvalid}
            >
              <SelectValue placeholder="سال" />
            </SelectTrigger>
            <SelectContent>
              {yearsArray.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      </div>

      {/* Month Selector */}
      {showMonth && (
        <div className="w-1/3 rounded-md border border-border bg-gray-50 placeholder:text-placeholder placeholder:text-sm placeholder:font-normal">
          <FormControl>
            <Select
              value={safeMonth?.toString()}
              onValueChange={handleMonthChange}
              dir="rtl"
              disabled={!safeYear}
            >
              <SelectTrigger
                className={`text-right text-textBlack placeholder:text-gray-400 ${
                  isInvalid ? "border-red-500 bg-red-50" : ""
                }`}
                aria-invalid={isInvalid}
              >
                <SelectValue
                  placeholder="ماه"
                  className={`${isInvalid ? "text-red-500" : ""}`}
                />
              </SelectTrigger>
              <SelectContent>
                {monthsArray.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      )}

      {/* Day Selector */}
      {showDay && (
        <div className="w-1/3 rounded-md border border-border bg-gray-50 placeholder:text-placeholder placeholder:text-sm placeholder:font-normal">
          <FormControl>
            <Select
              value={safeDay?.toString()}
              onValueChange={handleDayChange}
              dir="rtl"
              disabled={!safeYear || !safeMonth}
            >
              <SelectTrigger
                className={`text-right text-textBlack placeholder:text-gray-400 ${
                  isInvalid ? "border-red-500 bg-red-50" : ""
                }`}
                aria-invalid={isInvalid}
              >
                <SelectValue placeholder="روز" />
              </SelectTrigger>
              <SelectContent>
                {daysArray.map((day) => (
                  <SelectItem key={day} value={day.toString()}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
}
