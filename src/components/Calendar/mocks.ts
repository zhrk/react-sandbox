import { randAnimal } from '@ngneat/falso';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import { nanoid } from 'nanoid';

export const mockedEvents = Array.from({ length: 3 }).map((_, index) => ({
  id: nanoid(),
  title: randAnimal(),
  from: subDays(startOfDay(new Date()), index + 1),
  to: subDays(endOfDay(new Date()), index + 1),
}));
