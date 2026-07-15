import { addMonths, subMonths } from 'date-fns';
import { useState } from 'react';
import { getDays } from './helpers';
import { mockedEvents } from './mocks';

const views = ['day', 'week', 'month', 'schedule'] as const;

const useCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState(mockedEvents);
  const [view, setView] = useState<(typeof views)[number]>('month');

  const goToNow = () => setDate(new Date());
  const goToPrev = () => setDate((prev) => subMonths(prev, 1));
  const goToNext = () => setDate((prev) => addMonths(prev, 1));

  const days = getDays(date);

  return {
    date,
    view,
    days,
    views,
    events,
    setView,
    goToNow,
    goToPrev,
    goToNext,
    setEvents,
  };
};

export default useCalendar;
