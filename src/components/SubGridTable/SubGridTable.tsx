import { randIntegration, randSemver } from '@ngneat/falso';
import styles from './styles.module.scss';

const SubGridTable = () => (
  <div className={styles.wrapper}>
    <div>
      <div className={styles.table}>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.cell}>
              {index + 1}
              {index === 10 && <>0000</>}
            </div>
            <div className={styles.cell}>{randIntegration()}</div>
            <div className={styles.cell}>{randSemver()}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SubGridTable;
