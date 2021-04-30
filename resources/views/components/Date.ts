import { FunctionalComponent } from 'vue';
import { formatDateString, formatDateTimeString } from '@/scripts/utils';

export const Date: FunctionalComponent<{ format?: string }> = (
  props,
  { attrs, slots },
) => {
  const date = (attrs.textContent ?? slots.default?.()?.[0].children) as string;
  return date && formatDateString(date, props.format);
};

Date.props = {
  format: String,
};

export const DateTime: FunctionalComponent<{ format?: string }> = (
  props,
  { attrs, slots },
) => {
  const dateTime = (attrs.textContent ?? slots.default?.()?.[0].children) as string;
  return dateTime && formatDateTimeString(dateTime, props.format);
};

DateTime.props = {
  format: String,
};

export default Date;
