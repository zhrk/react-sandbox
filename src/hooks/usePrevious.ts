import { useEffect, useRef } from 'react';

const usePrevious = <T>(value: T) => {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  });

  // eslint-disable-next-line react-hooks/refs
  return ref.current;
};

export default usePrevious;
