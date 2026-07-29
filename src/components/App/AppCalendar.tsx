import { randAnimal } from '@ngneat/falso';
import { endOfDay, startOfDay, subDays } from 'date-fns';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import Calendar from '../Calendar';

const createRandomEvent = (from: Date, to: Date) => ({
  id: nanoid(),
  title: randAnimal(),
  from,
  to,
});

const mockedEvents = Array.from({ length: 3 }).map((_, index) =>
  createRandomEvent(
    subDays(startOfDay(new Date()), index + 1),
    subDays(endOfDay(new Date()), index + 1)
  )
);

const AppCalendar = () => {
  const [events, setEvents] = useState(mockedEvents);

  return (
    <Calendar
      events={events}
      onSelect={(from, to) => setEvents((prev) => [...prev, createRandomEvent(from, to)])}
    />
  );
};

export default AppCalendar;
