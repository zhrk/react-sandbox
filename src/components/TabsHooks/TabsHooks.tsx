import clsx from 'clsx';
import { useState } from 'react';
import { keys } from 'remeda';
import styles from './styles.module.scss';

// сделать чтобы таб не рендерился по кондишену (пермишены например)

type Config<T extends string> = Record<T, string>;

const useTabs = <T extends string, K extends T>(config: Config<T>, defaultTab?: K) => {
  const tabs = keys.strict(config);

  const [tab, setTab] = useState(defaultTab || tabs[0]);

  return { tab, tabs, setTab };
};

const TabsHooks = () => {
  const config = { all: 'All', todo: 'Todo', complete: 'Complete' };

  const { tab, tabs, setTab } = useTabs(config, 'todo');

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={clsx(item === tab && 'active')}
          >
            {config[item]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsHooks;
