import { DateTime } from 'luxon';

export const formatDate = (date: Date) => {
  return DateTime.fromJSDate(date).toFormat('dd/LL/yyyy');
};
