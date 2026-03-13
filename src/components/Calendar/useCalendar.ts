import { addMonths, subMonths } from 'date-fns';
import { useState } from 'react';
import { getDays } from './helpers';
import { mockedEvents } from './mocks';

interface Event {
  id: string;
  title: string;
  from: Date;
  to: Date;
}

type Events = Event[];

const views = ['day', 'week', 'month', 'schedule'] as const;

const useCalendar = () => {
  const [date, setDate] = useState(new Date());

  const [events, setEvents] = useState<Events>(mockedEvents);
  const [view, setView] = useState<(typeof views)[number]>('day');

  const goToNow = () => setDate(new Date());
  const goToPrev = () => setDate((prev) => subMonths(prev, 1));
  const goToNext = () => setDate((prev) => addMonths(prev, 1));

  const days = getDays(date);

  return {
    view,
    setView,
    goToPrev,
    goToNext,
    goToNow,
    date,
    views,
    events,
    setEvents,
    days,
  };
};

export default useCalendar;
