/* eslint-disable jsx-a11y/prefer-tag-over-role */
import { clsx } from 'clsx';
import { endOfDay, format, isSameMonth, isWithinInterval, startOfDay } from 'date-fns';
import { useCalendarContext } from './CalendarContext';
import { createRandomEvent } from './mocks';
import styles from './styles.module.scss';
import useCalendarSelectionRange from './useCalendarSelectionRange';

const CalendarMonthView = () => {
  const { date, events, days, setEvents } = useCalendarContext();

  const { inRange, handleMouseDown, handleMouseEnter } = useCalendarSelectionRange((from, to) =>
    setEvents((prev) => [...prev, createRandomEvent(from, to)])
  );

  return (
    <div className={styles.days}>
      {days.map((day) => {
        const currentEvents = events.filter((event) =>
          isWithinInterval(day, { start: startOfDay(event.from), end: endOfDay(event.to) })
        );

        const selected = inRange(day);
        const notAvailable = !isSameMonth(day, date);

        return (
          <div
            key={day.toString()}
            tabIndex={0}
            role="button"
            onMouseDown={() => handleMouseDown(day)}
            onMouseEnter={() => handleMouseEnter(day)}
            onClick={() => setEvents((prev) => [...prev, createRandomEvent(day, day)])}
            className={clsx(
              styles.day,
              selected && styles.selected,
              notAvailable && styles.notAvailable
            )}
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
  );
};

export default CalendarMonthView;
