/* eslint-disable jsx-a11y/prefer-tag-over-role */
import { randAnimal } from '@ngneat/falso';
import clsx from 'clsx';
import { format, isSameMonth, isWithinInterval } from 'date-fns';
import { nanoid } from 'nanoid';
import { useCalendarContext } from './CalendarContext';
import styles from './styles.module.scss';

interface Props {
  day: Date;
}

const CalendarDay = (props: Props) => {
  const { day } = props;

  const { date, events, setEvents } = useCalendarContext();

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
