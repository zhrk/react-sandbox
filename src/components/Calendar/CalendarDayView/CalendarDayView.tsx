import { eachMinuteOfInterval, endOfDay, format, startOfDay } from 'date-fns';
import { useCalendarContext } from '../CalendarContext';
import styles from './styles.module.scss';

const CalendarDayView = () => {
  const { date } = useCalendarContext();

  const start = startOfDay(date);
  const end = endOfDay(date);

  const intervals = eachMinuteOfInterval({ start, end }, { step: 30 });

  return (
    <div className={styles.container}>
      {intervals.map((item) => (
        <button key={item.toString()} type="button">
          <span>{format(item, 'HH:mm')}</span>
        </button>
      ))}
    </div>
  );
};

export default CalendarDayView;
