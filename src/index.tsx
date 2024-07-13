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
import Finance from './pages/finance/Finance';
import Settings from './pages/settings/Settings';
import CalendarPage from './pages/calendarPage/CalendarPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

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
        path: 'finance',
        element: <Finance />,
      },
      {
        path: 'calendar',
        element: <CalendarPage />,
      },
      {
        path: 'list/:menuId',
        element: <List />,
      },
      {
        path: 's_list/:menuId',
        element: <SList />,
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
