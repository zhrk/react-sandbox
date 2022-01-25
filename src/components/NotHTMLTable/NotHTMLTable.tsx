import styles from './styles.module.scss';

const columns = [
  {
    title: 'Name',
    key: 'name',
    render: () => undefined,
    align: 'right',
    clip: true,
  },
];

const NotHTMLTable: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.table}>
      <div className={styles.tableRow}>
        <div>Name</div>
        <div>Age</div>
        <div>Description</div>
        <div />
      </div>
      <div className={styles.tableRow}>
        <div>Test1111111111111111111111111111111111111111111111111111111111111111</div>
        <div>12</div>
        <div>Lorem, ipsum dolor</div>
        <div>X</div>
      </div>
      <div className={styles.tableRow}>
        <div>Test</div>
        <div>222</div>
        <div>Lorem ipsum dolor sit amet</div>
        <div>X</div>
      </div>
    </div>
  </div>
);

export default NotHTMLTable;
