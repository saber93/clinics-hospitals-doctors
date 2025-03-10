/**
 * Formats a date object into YYYY-MM-DD string format
 * @param date The date to format
 * @returns Formatted date string
 */
export const formatDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getRelativeTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};
