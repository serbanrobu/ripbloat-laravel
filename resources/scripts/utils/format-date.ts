import { format as fmt } from 'date-fns';

export function formatDate(date: Date, format = 'E, MMM d yyyy') {
  return fmt(date, format);
}

export function formatDateTime(dateTime: Date, format = 'E, MMM d yyyy HH:mm:ss') {
  return fmt(dateTime, format);
}

export function formatDateString(date: string, format?: string) {
  return formatDate(new Date(date), format);
}

export function formatDateTimeString(dateTime: string, format?: string) {
  return formatDateTime(new Date(dateTime), format);
}

export default formatDate;
