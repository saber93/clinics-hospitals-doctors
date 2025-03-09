
/**
 * Formats a date object into YYYY-MM-DD string format
 * @param date The date to format
 * @returns Formatted date string
 */
export const formatDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
