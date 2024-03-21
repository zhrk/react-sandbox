import { randAnimal } from '@ngneat/falso';
import clsx from 'clsx';
import { addMonths, format, isWithinInterval, isSameMonth, subMonths } from 'date-fns';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { getDays } from './helpers';
import { mockedEvents } from './mocks';
import styles from './styles.module.scss';

type Event = {
  id: string;
  title: string;
  from: Date;
  to: Date;
};

type Events = Event[];

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const [events, setEvents] = useState<Events>(mockedEvents);

  const goToNow = () => setDate(new Date());
  const goToPrev = () => setDate((prev) => subMonths(prev, 1));
  const goToNext = () => setDate((prev) => addMonths(prev, 1));

  const days = getDays(date);

  const createEvent = (event: Event) => setEvents((prev) => [...prev, event]);

  // getDays проревьювить
  // переключение месяцев колёсиком мыши
  // onKeyDown обработать без undefined
  // иначе пофиксить баг когда много эвентов (grid-template-rows: min-content 1px;)
  // протестить с таймзонами

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.topControls}>
          <button type="button" onClick={goToPrev}>
            prev
          </button>
          <button type="button" onClick={goToNext}>
            next
          </button>
          <button disabled={isSameMonth(new Date(), date)} type="button" onClick={goToNow}>
            now
          </button>
        </div>
        {format(date, 'dd.MM.yyyy')}
      </div>
      <div className={styles.days}>
        {days.map((day) => {
          const currentEvents = events.filter((event) =>
            isWithinInterval(day, { start: event.from, end: event.to })
          );

          const handleCreate = () =>
            createEvent({ id: nanoid(), title: randAnimal(), from: day, to: day });

          return (
            <div
              key={day.toString()}
              tabIndex={0}
              role="button"
              onClick={handleCreate}
              onKeyDown={() => undefined}
              className={clsx(styles.day, !isSameMonth(day, date) && styles.notAvailable)}
            >
              <span>{format(day, 'dd')}</span>
              <div className={styles.dayEvents}>
                {currentEvents.map((event) => (
                  <div key={event.id} className={styles.dayEvent}>
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
