import clsx from 'clsx';
import { addMinutes, eachMinuteOfInterval, endOfDay, format, startOfDay } from 'date-fns';
import { useCalendarContext } from '../CalendarContext';
import { createRandomEvent } from '../mocks';
import useCalendarSelectionRange from '../useCalendarSelectionRange';
import styles from './styles.module.scss';

const STEP = 30;

const CalendarDayView = () => {
  const { date, events, setEvents } = useCalendarContext();

  const { inRange, handleMouseDown, handleMouseEnter } = useCalendarSelectionRange((from, to) =>
    setEvents((prev) => [...prev, createRandomEvent(from, addMinutes(to, STEP))])
  );

  const intervals = eachMinuteOfInterval(
    { start: startOfDay(date), end: endOfDay(date) },
    { step: STEP }
  );

  return (
    <div className={styles.container}>
      {intervals.map((interval) => {
        const intervalEnd = addMinutes(interval, STEP);

        const currentEvents = events.filter(
          (event) => event.to > interval && event.from < intervalEnd
        );

        const selected = inRange(interval);

        return (
          <button
            type="button"
            key={interval.toString()}
            className={clsx(selected && styles.selected)}
            onMouseDown={() => handleMouseDown(interval)}
            onMouseEnter={() => handleMouseEnter(interval)}
            onClick={() => setEvents((prev) => [...prev, createRandomEvent(interval, intervalEnd)])}
          >
            <span className={styles.time}>{format(interval, 'HH:mm')}</span>
            {currentEvents.map((event) => (
              <span key={event.id} className={styles.event}>
                {event.title}
              </span>
            ))}
          </button>
        );
      })}
    </div>
  );
};

export default CalendarDayView;
