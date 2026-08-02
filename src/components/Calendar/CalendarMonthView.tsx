import { clsx } from 'clsx';
import { endOfDay, format, isSameMonth, isWithinInterval, startOfDay } from 'date-fns';
import { useCalendarContext } from './CalendarContext';
import styles from './styles.module.scss';
import useCalendarSelectionRange from './useCalendarSelectionRange';

const CalendarMonthView = () => {
  const { date, events, days, onSelect } = useCalendarContext();

  const { inRange, handleMouseDown, handleMouseEnter } = useCalendarSelectionRange(onSelect);

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
            onClick={() => onSelect(day, day)}
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
