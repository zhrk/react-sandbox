import { parseAsArrayOf, parseAsBoolean, parseAsString, useQueryStates } from 'nuqs';
import NuqsClear from './NuqsClear';
import styles from './styles.module.scss';

// нужен дебаунс https://github.com/47ng/nuqs/issues/291
// вынести в хук?
// сделать контекст?

const Nuqs = () => {
  const [filter, setFilter] = useQueryStates({
    name: parseAsString.withDefault(''),
    show_deleted: parseAsBoolean.withDefault(false),
    fruit: parseAsString.withDefault(''),
    fruits: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const setFruit = (fruit: 'apple' | 'orange' | 'banana') =>
    setFilter((prev) => ({
      fruits: prev.fruits.includes(fruit)
        ? prev.fruits.filter((item) => item !== fruit)
        : [...prev.fruits, fruit],
    }));

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Name"
            value={filter.name}
            onChange={(event) => setFilter({ name: event.target.value })}
          />
          <NuqsClear onClear={() => setFilter({ name: null })} />
        </div>
        <div className={styles.field}>
          <label className={styles.boolean}>
            <input
              type="checkbox"
              checked={filter.show_deleted}
              onChange={(event) => setFilter({ show_deleted: event.target.checked })}
            />
            Show deleted
          </label>
        </div>
        <div className={styles.field}>
          <select onChange={(event) => setFilter({ fruit: event.target.value })}>
            <option selected disabled>
              Fruit
            </option>
            <option value="apple">Apple</option>
            <option value="orange">Orange</option>
            <option value="banana">Banana</option>
          </select>
          <NuqsClear onClear={() => setFilter({ fruit: null })} />
        </div>
        <div className={styles.field}>
          <div className={styles.multi}>
            <button type="button" onClick={() => setFruit('apple')}>
              Apple
            </button>
            <button type="button" onClick={() => setFruit('orange')}>
              Orange
            </button>
            <button type="button" onClick={() => setFruit('banana')}>
              Banana
            </button>
          </div>
          <NuqsClear onClear={() => setFilter({ fruits: null })} />
        </div>
      </div>
      <button type="button" onClick={() => setFilter(null)}>
        Clear all
      </button>
    </div>
  );
};

export default Nuqs;
