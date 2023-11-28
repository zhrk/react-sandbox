import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import usePrevious from '../../hooks/usePrevious';
import styles from './styles.module.scss';

const Filter = () => {
  const [, setSearchParmas] = useSearchParams();

  const form = useForm<{
    text: string;
    boolean: boolean;
  }>();

  const { register, watch } = form;

  const values = watch();

  const prevValues = usePrevious(JSON.stringify(values));

  useEffect(() => {
    if (JSON.stringify(values) !== prevValues) {
      setSearchParmas({});
    }
  }, [values, prevValues, setSearchParmas]);

  // конвертировать values циклом
  // обработать falsy значения
  // селект значения

  return (
    <div className={styles.container}>
      <label className={styles.input}>
        <span>Text</span>
        <input type="text" {...register('text')} />
      </label>
      <label className={styles.checkbox}>
        <input type="checkbox" {...register('boolean')} />
        Boolean
      </label>
    </div>
  );
};

export default Filter;
