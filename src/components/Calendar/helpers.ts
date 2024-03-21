import { addDays, endOfMonth, startOfWeek, startOfMonth, eachDayOfInterval } from 'date-fns';

const MONDAY = 1;

export const getDays = (date: Date) => {
  const GRID_DAYS_AMOUNT = 42;

  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const monthDays = eachDayOfInterval({ start: addDays(monthStart, 1), end: monthEnd });

  const monthStartWeekDay = startOfWeek(monthStart, { weekStartsOn: MONDAY });

  const prevMonthDays = eachDayOfInterval({ start: monthStartWeekDay, end: monthStart });

  const nextMonthDays = eachDayOfInterval({
    start: addDays(monthEnd, 1),
    end: addDays(monthEnd, GRID_DAYS_AMOUNT - (prevMonthDays.length + monthDays.length)),
  });

  const days = [prevMonthDays, monthDays, nextMonthDays].flat();

  return days;
};
