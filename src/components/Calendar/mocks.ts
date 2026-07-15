import { randAnimal } from '@ngneat/falso';
import { endOfDay, startOfDay, subDays } from 'date-fns';
import { nanoid } from 'nanoid';

export const createRandomEvent = (from: Date, to: Date) => ({
  id: nanoid(),
  title: randAnimal(),
  from,
  to,
});

export const mockedEvents = Array.from({ length: 3 }).map((_, index) =>
  createRandomEvent(
    subDays(startOfDay(new Date()), index + 1),
    subDays(endOfDay(new Date()), index + 1)
  )
);
