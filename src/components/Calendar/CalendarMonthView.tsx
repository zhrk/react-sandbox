import { useCalendarContext } from './CalendarContext';
import CalendarDay from './CalendarDay';
import styles from './styles.module.scss';

const CalendarMonthView = () => {
  const { days } = useCalendarContext();

  return (
    <div className={styles.days}>
      {days.map((day) => (
        <CalendarDay key={day.toString()} day={day} />
      ))}
    </div>
  );
};

export default CalendarMonthView;
