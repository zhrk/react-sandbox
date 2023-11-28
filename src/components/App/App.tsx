import { createBrowserRouter, NavLink, Outlet, RouterProvider } from 'react-router-dom';
import Filter from '../Filter';
import GridTable from '../GridTable';
import HyperFetch from '../HyperFetch';
import NotHTMLTable from '../NotHTMLTable';
import Select from '../Select';
import Test from '../Test';
import styles from './styles.module.scss';

const routes = [
  {
    path: '/',
    element: 'Hello',
  },
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/not-html-table',
    element: <NotHTMLTable />,
  },
  {
    path: '/select',
    element: (
      <>
        <Select onChange={(value) => console.log(value)} />
        <Select multi onChange={(value) => console.log(value)} />
      </>
    ),
  },
  {
    path: '/hyper-fetch',
    element: <HyperFetch />,
  },
  {
    path: '/grid-table',
    element: <GridTable />,
  },
  {
    path: '/filter',
    element: <Filter />,
  },
];

const Layout = () => (
  <div className={styles.container}>
    <div className={styles.nav}>
      {routes.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          /* {...(item.path === item.path && { className: styles.active })} */
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          {item.path === '/' ? 'home' : item.path.replace('/', '')}
        </NavLink>
      ))}
    </div>
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routes,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
