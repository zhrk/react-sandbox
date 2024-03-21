import { createBrowserRouter, NavLink, Outlet, RouterProvider, Navigate } from 'react-router-dom';
import Filter from '../Filter';
import Select from '../Select';
import Template from '../Template';
import styles from './styles.module.scss';

const routes = [
  {
    path: '/',
    element: <span className={styles.hello}>Hello</span>,
  },
  {
    path: '/template',
    element: <Template />,
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
    path: '/filter',
    element: <Filter />,
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
