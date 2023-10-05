import { useState } from 'react';
import HyperFetch from '../HyperFetch';
import NotHTMLTable from '../NotHTMLTable';
import Select from '../Select';
import Test from '../Test';
import styles from './styles.module.scss';

const views = ['Test', 'NotHTMLTable', 'Select', 'HyperFetch'] as const;

const App = () => {
  const [view, setView] = useState<(typeof views)[number]>('Test');

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        {views.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setView(item)}
            {...(view === item && { className: styles.active })}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.wrapper}>
        {view === 'Test' && <Test />}
        {view === 'NotHTMLTable' && <NotHTMLTable />}
        {view === 'Select' && (
          <>
            <Select onChange={(value) => console.log(value)} />
            <Select multi onChange={(value) => console.log(value)} />
          </>
        )}
        {view === 'HyperFetch' && <HyperFetch />}
      </div>
    </div>
  );
};

export default App;
