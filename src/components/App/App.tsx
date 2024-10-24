import { createBrowserRouter, NavLink, Outlet, RouterProvider, Navigate } from 'react-router-dom';
import Calendar from '../Calendar';
import Filter from '../Filter';
import Nuqs from '../Nuqs';
import Select from '../Select';
import SubGridTable from '../SubGridTable';
import TabsHooks from '../TabsHooks';
import TanStackTable from '../TanStackTable';
import Template from '../Template';
import YaMusic from '../YaMusic';
import styles from './styles.module.scss';

const routes = [
  {
    path: '/',
    element: (
      <div className={styles.centered}>
        <span className={styles.hello}>Hello</span>
      </div>
    ),
  },
  {
    path: '/template',
    element: <Template />,
  },
  {
    path: '/select',
    element: (
      <div className={styles.centered}>
        <Select onChange={(value) => console.log(value)} />
        <Select multi onChange={(value) => console.log(value)} />
      </div>
    ),
  },
  {
    path: '/filter',
    element: (
      <div className={styles.centered}>
        <Filter />
      </div>
    ),
  },
  {
    path: '/calendar',
    element: <Calendar />,
  },
  {
    path: '/sub-grid-table',
    element: <SubGridTable />,
  },
  {
    path: '/ya-music',
    element: <YaMusic />,
  },
  {
    path: '/tanstack-table',
    element: <TanStackTable />,
  },
  {
    path: '/tabs-hook',
    element: <TabsHooks />,
  },
  {
    path: '/nuqs',
    element: <Nuqs />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

const Layout = () => (
  <div className={styles.container}>
    <div className={styles.nav}>
      {routes
        .filter((item) => item.path !== '*')
        .map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
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
