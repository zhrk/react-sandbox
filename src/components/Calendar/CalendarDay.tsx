import { randAnimal } from '@ngneat/falso';
import clsx from 'clsx';
import { format, isWithinInterval, isSameMonth } from 'date-fns';
import { nanoid } from 'nanoid';
import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';
import { Events } from './types';

type Props = {
  day: Date;
  date: Date;
  events: Events;
  setEvents: Dispatch<SetStateAction<Events>>;
};

const CalendarDay = (props: Props) => {
  const { day, date, events, setEvents } = props;

  const currentEvents = events.filter((event) =>
    isWithinInterval(day, { start: event.from, end: event.to })
  );

  const handleClick = () =>
    setEvents((prev) => [...prev, { id: nanoid(), title: randAnimal(), from: day, to: day }]);

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={handleClick}
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
};

export default CalendarDay;
