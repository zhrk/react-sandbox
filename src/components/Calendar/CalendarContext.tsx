import { createContext, ReactNode } from 'react';
import useContext from '../../hooks/useContext';
import useCalendar from './useCalendar';

type Context = ReturnType<typeof useCalendar>;

const Context = createContext<Context | undefined>(undefined);

interface Props extends Context {
  children: ReactNode;
}

const CalendarContext = (props: Props) => {
  const { children, ...rest } = props;

  return <Context value={rest}>{children}</Context>;
};

const useCalendarContext = () => useContext(Context);

export { useCalendarContext };

export default CalendarContext;
