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
  const { tab, tabs, setTab } = useTabs({ all: 'All', todo: 'Todo', complete: 'Complete' }, 'todo');

  return (
    <div className={styles.container}>
      {tab}
      <div className={styles.tabs}>
        {tabs.map((item) => (
          <button key={item} type="button" onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsHooks;
