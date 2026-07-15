import { isWithinInterval, max, min } from 'date-fns';
import { useEffect, useState } from 'react';

type SelectionRange = { start: Date; end: Date } | null;

const useCalendarSelectionRange = (onSelect: (from: Date, to: Date) => void) => {
  const [selectionRange, setSelectionRange] = useState<SelectionRange>(null);

  const handleMouseDown = (date: Date) => setSelectionRange({ start: date, end: date });

  const handleMouseEnter = (date: Date) =>
    setSelectionRange((prev) => (prev === null ? null : { start: prev.start, end: date }));

  const inRange = (date: Date) =>
    selectionRange &&
    isWithinInterval(date, {
      start: min([selectionRange.start, selectionRange.end]),
      end: max([selectionRange.start, selectionRange.end]),
    });

  useEffect(() => {
    const handler = () => {
      if (selectionRange) {
        const { start, end } = selectionRange;

        if (start.getTime() !== end.getTime()) {
          onSelect(min([start, end]), max([start, end]));
        }

        setSelectionRange(null);
      }
    };

    window.addEventListener('mouseup', handler);

    return () => window.removeEventListener('mouseup', handler);
  }, [selectionRange, onSelect]);

  return { handleMouseDown, handleMouseEnter, inRange };
};

export default useCalendarSelectionRange;
