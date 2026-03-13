import { clsx } from 'clsx';
import { format, isSameMonth } from 'date-fns';
import CalendarContext from './CalendarContext';
import CalendarMonthView from './CalendarMonthView';
import styles from './styles.module.scss';
import useCalendar from './useCalendar';

const Calendar = () => {
  const calendar = useCalendar();

  const { view, setView, goToPrev, goToNext, goToNow, date, views } = calendar;

  // getDays проревьювить
  // переключение месяцев колёсиком мыши
  // onKeyDown обработать без undefined
  // иначе пофиксить баг когда много эвентов (grid-template-rows: min-content 1px;)
  // протестить с таймзонами
  // значение свойства grid-template-rows можно сделать динамическим
  // (https://frontendmasters.com/blog/css-fan-out-with-grid-and-property/)
  // если использовать внутри кастомное свойство --int, объявленное через @property, и анимировать его

  return (
    <CalendarContext {...calendar}>
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
            {format(date, 'dd.MM.yyyy')}
          </div>
          <div className={styles.topControls}>
            {views.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={clsx(view === item && styles.active)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {view === 'day' && 'day view'}
        {view === 'week' && 'week view'}
        {view === 'month' && <CalendarMonthView />}
        {view === 'schedule' && 'schedule'}
      </div>
    </CalendarContext>
  );
};

export default Calendar;
