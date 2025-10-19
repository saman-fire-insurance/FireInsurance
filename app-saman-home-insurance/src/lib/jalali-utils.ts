import dayjs, { Dayjs } from 'dayjs';
import jalaliday from 'jalaliday';

// Extend dayjs with jalali plugin
dayjs.extend(jalaliday);

/**
 * Convert Jalali date to Gregorian date using dayjs
 * @param jy Jalali year
 * @param jm Jalali month (1-12)
 * @param jd Jalali day
 * @returns Gregorian date object or null if invalid
 */
export function jalaliToGregorian(jy?: number, jm?: number, jd?: number) {
  if (!jy || !jm || !jd) return null;
  if (isNaN(jy) || isNaN(jm) || isNaN(jd)) return null;
  
  try {
    // Create jalali date (month is 0-indexed in dayjs)
    const jalaliDate = dayjs().calendar('jalali').year(jy).month(jm - 1).date(jd);
    
    // Convert to gregorian
    const gregorianDate = jalaliDate.calendar('gregory');
    
    return {
      year: gregorianDate.year(),
      month: gregorianDate.month() + 1, // Convert back to 1-indexed
      day: gregorianDate.date()
    };
  } catch (error) {
    console.error('Error converting jalali to gregorian:', error);
    return null;
  }
}

/**
 * Convert Gregorian date to Jalali date using dayjs
 * @param gy Gregorian year
 * @param gm Gregorian month (1-12)
 * @param gd Gregorian day
 * @returns Jalali date object
 */
export function gregorianToJalali(gy: number, gm: number, gd: number) {
  try {
    // Create gregorian date (month is 0-indexed in dayjs)
    const gregorianDate = dayjs().calendar('gregory').year(gy).month(gm - 1).date(gd);
    
    // Convert to jalali
    const jalaliDate = gregorianDate.calendar('jalali');
    
    return {
      year: jalaliDate.year(),
      month: jalaliDate.month() + 1, // Convert back to 1-indexed
      day: jalaliDate.date()
    };
  } catch (error) {
    console.error('Error converting gregorian to jalali:', error);
    return { year: 1400, month: 1, day: 1 };
  }
}

/**
 * Get current Jalali date
 * @returns Current Jalali date object
 */
export function getCurrentJalaliDate() {
  const today = dayjs().calendar('jalali');
  
  return {
    year: today.year(),
    month: today.month() + 1, // dayjs months are 0-indexed
    day: today.date()
  };
}

/**
 * Get days in month for Persian calendar using dayjs
 * @param month Jalali month (1-12)
 * @param year Jalali year
 * @returns Number of days in the month
 */
export function getDaysInMonth(month?: number, year?: number): number {
  if (!month || !year) return 31;
  if (isNaN(month) || isNaN(year)) return 31;
  
  try {
    // Create jalali date and get days in month
    const jalaliDate = dayjs().calendar('jalali').year(year).month(month - 1); // month is 0-indexed in dayjs
    return jalaliDate.daysInMonth();
  } catch (error) {
    console.error('Error getting days in month:', error);
    return 31;
  }
}

/**
 * Calculate difference in days between two dates
 * @param date1 First date
 * @param date2 Second date
 * @returns Absolute difference in days
 */
export function calculateDaysDifference(date1: Date, date2: Date) {
  if (!date1 || !date2) return null;
  const dayjs1 = dayjs(date1);
  const dayjs2 = dayjs(date2);
  return Math.abs(dayjs2.diff(dayjs1, 'day'));
}

/**
 * Create a Date object from Gregorian date components using dayjs
 * @param year Gregorian year
 * @param month Gregorian month (1-12)
 * @param day Gregorian day
 * @returns Date object
 */
export function createGregorianDate(year: number, month: number, day: number): Date {
  return dayjs().year(year).month(month - 1).date(day).toDate();
}

/**
 * Validate if a Jalali date is valid
 * @param year Jalali year
 * @param month Jalali month (1-12)
 * @param day Jalali day
 * @returns Boolean indicating if the date is valid
 */
export function isValidJalaliDate(year: number, month: number, day: number): boolean {
  try {
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;
    
    const maxDays = getDaysInMonth(month, year);
    if (day > maxDays) return false;
    
    return true;
  } catch (error) {
    return false;
  }
}
