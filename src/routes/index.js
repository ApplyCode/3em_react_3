import {lazy} from 'react';
import { useRoutes } from 'react-router-dom';

// project import
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import ComponentsRoutes from './ComponentsRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import AuthGuard from "../utils/route-guard/AuthGuard";

// render - landing page
const PagesLanding = Loadable(lazy(() => import('pages/landing')));

// ==============================|| ROUTING RENDER ||============================== //
const logged_routes = [
  {
    path: '/',
    element: <CommonLayout layout="landing" />,
    children: [
      {
        path: '/',
        element: <PagesLanding />
      }
    ]
  },
  LoginRoutes,
  ComponentsRoutes,
  MainRoutes
]

const not_logged_routes = [
  LoginRoutes,
  {
    path: '/*',
    element:
        <AuthGuard>
          <CommonLayout layout="landing" />
        </AuthGuard>
  }
]

let loaded_routes = null;

export default function ThemeRoutes() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
    loaded_routes = logged_routes
  } else {
    loaded_routes = not_logged_routes
  }
  return useRoutes(loaded_routes)
}


