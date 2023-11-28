import styles from './styles.module.scss';

const GridTable = () => (
  <div className={styles.container}>
    <div className={styles.table}>
      <div className={styles.tableRow}>
        <div>Name</div>
        <div>Age</div>
        <div>Description</div>
      </div>
      <div className={styles.tableRow}>
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non ea vel iste consequatur, eos
          et rem totam officiis accusantium! Ratione consequatur dicta natus officia vitae aliquid
          suscipit sed ex blanditiis!
        </div>
        <div>12</div>
        <div>Lorem, ipsum dolor</div>
      </div>
      <div className={styles.tableRow}>
        <div>Test</div>
        <div>222</div>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae praesentium labore
          fuga necessitatibus facere aliquam eaque accusantium animi tempora! Non.
        </div>
      </div>
    </div>
  </div>
);

export default GridTable;
