// utils/dateUtils.js
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export function parseAndAddDays(dateString: string, format: string = 'YYYY-MM-DD ddd h:mm A', daysToAdd: number = 0) {
  const parsedDate = dayjs(dateString, format);
  if (parsedDate.isValid()) {
    return parsedDate.add(daysToAdd, 'days').toDate();
  } else {
    return undefined;
  }
}
