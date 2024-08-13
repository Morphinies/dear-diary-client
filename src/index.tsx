import './style/index.scss';
import './style/themes.scss';
import './style/normalize.scss';
import { store } from './store';
import Menu from './pages/menu/Menu';
import Auth from './pages/auth/Auth';
import Main from './pages/main/Main';
import List from './pages/list/List';
import { Provider } from 'react-redux';
import Error from './pages/error/Error';
import SList from './pages/s_list/SList';
import { createRoot } from 'react-dom/client';
// import Finance from './pages/finance/Finance';
import Diagram from './pages/diagram/Diagram';
import Settings from './pages/settings/Settings';
import Calendar from './pages/calendar/Calendar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Graph from './pages/graph/Graph';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '',
        element: <Menu />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'list/:menuId',
        element: <List />,
      },
      {
        path: 's_list/:menuId',
        element: <SList />,
      },
      {
        path: 'diagram/:menuId',
        element: <Diagram />,
      },
      {
        path: 'calendar/:menuId',
        element: <Calendar />,
      },
      {
        path: 'graph/:menuId',
        element: <Graph />,
      },
    ],
  },
  {
    path: 'auth',
    element: <Auth />,
  },
  { path: '*', element: <Error /> },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
