import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import usePrevious from '../../hooks/usePrevious';
import styles from './styles.module.scss';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && !Array.isArray(value) && value !== null;

const convert = (values: Record<string, unknown>) => {
  const entries = Object.entries(values);

  const clearedParams = entries.flatMap(([key, value]) => {
    if (isObject(value) && 'value' in value) {
      return [[key, value.value]];
    }

    if (value === '') return [];
    if (value === false) return [];
    if (value === null) return [];

    if (Array.isArray(value)) {
      if (!value.length) return [];

      return [[key, value.map((item) => item.value).join(',')]];
    }

    return [[key, value]];
  });

  return Object.fromEntries(clearedParams);
};

type Option = {
  value: string;
  label: string;
};

const Filter = () => {
  const [, setSearchParmas] = useSearchParams();

  const form = useForm<{
    text: string;
    boolean: boolean;
    single: Option | null;
    multi: Option[];
  }>({ defaultValues: { text: '', boolean: false, single: null, multi: [] } });

  const { register, watch, setValue } = form;

  const values = watch();

  const prevValues = usePrevious(JSON.stringify(values));

  useEffect(() => {
    if (JSON.stringify(values) !== prevValues) {
      setSearchParmas(convert(values));
    }
  }, [values, prevValues, setSearchParmas]);

  const getMultiValue = (option: Option) => {
    const { multi } = values;

    if (multi.map((item) => item.value).includes(option.value)) {
      return multi.filter((item) => item.value !== option.value);
    }

    return [...multi, option];
  };

  // конвертация значений формы в значения для урла
  // конвертация значений формы в значения для отправки на бек
  // конвертация значений из урла в значения из формы для дефолтных значений

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
      <div className={styles.wrapper}>
        <label className={styles.select}>
          Select single
          <button
            type="button"
            onClick={() => setValue('single', { value: 'single-1', label: 'Single 1' })}
          >
            Single 1
          </button>
          <button
            type="button"
            onClick={() => setValue('single', { value: 'single-2', label: 'Single 2' })}
          >
            Single 2
          </button>
          <button type="button" onClick={() => setValue('single', null)}>
            clear
          </button>
        </label>
        <label className={styles.select}>
          Multi
          <button
            type="button"
            onClick={() => setValue('multi', getMultiValue({ value: 'multi-1', label: 'Multi 1' }))}
          >
            Multi 1
          </button>
          <button
            type="button"
            onClick={() => setValue('multi', getMultiValue({ value: 'multi-2', label: 'Multi 2' }))}
          >
            Multi 2
          </button>
          <button
            type="button"
            onClick={() => setValue('multi', getMultiValue({ value: 'multi-3', label: 'Multi 3' }))}
          >
            Multi 3
          </button>
          <button type="button" onClick={() => setValue('multi', [])}>
            clear
          </button>
        </label>
      </div>
    </div>
  );
};

export default Filter;
