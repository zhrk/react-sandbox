import { addMonths, format, isSameMonth, subMonths } from 'date-fns';
import { useState } from 'react';
import CalendarDay from './CalendarDay';
import { getDays } from './helpers';
import { mockedEvents } from './mocks';
import styles from './styles.module.scss';
import { Events } from './types';

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const [events, setEvents] = useState<Events>(mockedEvents);

  const goToNow = () => setDate(new Date());
  const goToPrev = () => setDate((prev) => subMonths(prev, 1));
  const goToNext = () => setDate((prev) => addMonths(prev, 1));

  const days = getDays(date);

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
        {days.map((day) => (
          <CalendarDay
            key={day.toString()}
            day={day}
            date={date}
            events={events}
            setEvents={setEvents}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
