import React, { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import GuardRoutes from './Middleware/Guardrouter';
import PageLoader from '@/Components/PageLoader';

const NotFound = lazy(() => import('@/Pages/NotFound.jsx'));
const Login = lazy(() => import('@/Pages/Auth/Login'));
const RegisterPage = lazy(() => import('@/Pages/Auth/Register'));
const ResendPassword = lazy(() => import('@/Pages/Auth/ResendPassword'));
const ResetPassword = lazy(() => import('@/Pages/Auth/ResetPassword'));
const Logout = lazy(() => import('@/Pages/Auth/Logout.jsx'));
const MainLayout = lazy(() => import('@/Layout/MainLayout'));
const Clients = lazy(() => import('@/Pages/Private/Clients'));
const Dashboard = lazy(() => import('@/Pages/Private/Dashboard'));
const Profil = lazy(() => import('@/Pages/Private/Profil'));
const AppRouter = () => {
  const element = useRoutes([
    {
      path: '/login',
      element: <GuardRoutes isPrivate={false}><Login /></GuardRoutes>,
    },
    {
      path: '/logout',
      element: <GuardRoutes isPrivate={true}><Logout /></GuardRoutes>,
    },
    {
      path: '/register',
      element: <GuardRoutes isPrivate={false}><RegisterPage /></GuardRoutes>,
    },
    {
      path: '/resendpassword',
      element: <GuardRoutes isPrivate={false}><ResendPassword /></GuardRoutes>,
    },
    {
      path: "/resetpassword",
      element: <GuardRoutes isPrivate={false}><ResetPassword /></GuardRoutes>,
    },
    {
      path: '/',
      element: <GuardRoutes isPrivate={true}><MainLayout /></GuardRoutes>,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />
        },
        {
          path: 'clients',
          element: <Clients />
        },
        {
          path: 'profil',
          element: <Profil />
        },
        {
          path: '/',
          element: <Navigate to="/dashboard" />,
        },
      ]
    },
    {
      path: '*',
      element: <GuardRoutes isPrivate={false}><NotFound /></GuardRoutes>,
    },
  ]);

  return (
    <Suspense fallback={<PageLoader />}>
      {element}
    </Suspense>
  );
};

export default AppRouter;
