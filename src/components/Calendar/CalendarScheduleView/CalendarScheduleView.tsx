import { format, isSameDay } from 'date-fns';
import { useCalendarContext } from '../CalendarContext';
import styles from './styles.module.scss';

const CalendarScheduleView = () => {
  const { events } = useCalendarContext();

  const sorted = events.toSorted((a, b) => a.from.getTime() - b.from.getTime());

  const groups = sorted
    .filter((event, index) => index === 0 || !isSameDay(sorted[index - 1].from, event.from))
    .map((event) => ({
      day: event.from,
      events: sorted.filter((item) => isSameDay(item.from, event.from)),
    }));

  return (
    <div className={styles.container}>
      {groups.map((group) => (
        <div key={group.day.toString()} className={styles.group}>
          <div className={styles.date}>{format(group.day, 'dd MMMM yyyy')}</div>
          <div className={styles.events}>
            {group.events.map((event) => (
              <div key={event.id}>
                <span className={styles.time}>
                  {format(event.from, 'HH:mm')} – {format(event.to, 'HH:mm')}
                </span>
                <span>{event.title}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {groups.length === 0 && <div className={styles.empty}>No events</div>}
    </div>
  );
};

export default CalendarScheduleView;
