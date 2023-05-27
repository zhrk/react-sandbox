/* import Test from '../Test'; */
/* import NotHTMLTable from '../NotHTMLTable'; */
/* import Select from '../Select'; */
import { getPagePath } from '@nanostores/router';
import { useRouter } from '../../useRouter';
import styles from './styles.module.scss';

const Nav = () => {
  const { router } = useRouter();

  return (
    <div style={{ display: 'flex', columnGap: '8px' }}>
      <a href="/">home</a>
      <a href="/news">news</a>
      <a href="/contacts">contacts</a>
      <button
        type="button"
        onClick={() => {
          console.log('123');
        }}
      >
        button
      </button>
    </div>
  );
};

const Articles = () => {
  const { router } = useRouter();

  if (router.route === 'article') {
    if (router.params.articleId === '1') {
      return <div>article 1</div>;
    }

    if (router.params.articleId === '2') {
      return <div>article 2</div>;
    }

    if (router.params.articleId === '3') {
      return <div>article 3</div>;
    }
  }

  return null;
};

const App = () => {
  const { router } = useRouter();

  if (router.route === 'home') {
    return (
      <div>
        <Nav />
        home
      </div>
    );
  }

  if (router.route === 'news') {
    return (
      <div>
        <Nav />
        news
        <ul>
          <li>
            <a href="/news/1">article 1</a>
          </li>
          <li>
            <a href="/news/2">article 2</a>
          </li>
          <li>
            <a href="/news/3">article 3</a>
          </li>
        </ul>
        <Articles />
      </div>
    );
  }

  if (router.route === 'contacts') {
    return (
      <div>
        <Nav />
        contacts
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* <Test /> */}
      {/* <NotHTMLTable /> */}
      {/* <Select onChange={(value) => console.log(value)} /> */}
      {/* <Select multi onChange={(value) => console.log(value)} /> */}
    </div>
  );
};

export default App;
