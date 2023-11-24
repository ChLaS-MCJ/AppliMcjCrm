import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import GuardRoutes from './Middleware/Guardrouter';
import PageLoader from '@/Components/PageLoader';

const NotFound = lazy(() => import('@/Pages/NotFound.jsx'));
const Login = lazy(() => import('@/Pages/Auth/Login'));
const RegisterPage = lazy(() => import('@/Pages/Auth/Register'));
const ResendPassword = lazy(() => import('@/Pages/Auth/ResendPassword'));
const ResetPassword = lazy(() => import('@/Pages/Auth/ResetPassword'));
const Logout = lazy(() => import('@/Pages/Auth/Logout.jsx'));
const Dashboard = lazy(() => import('@/Pages/Private/Dashboard'));
const Clients = lazy(() => import('@/Pages/Private/Clients'));

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
      element: <GuardRoutes isPrivate={true}><Dashboard /></GuardRoutes>,
    },
    {
      path: '/dashboard',
      element: <GuardRoutes isPrivate={true}><Dashboard /></GuardRoutes>,
    },
    {
      path: '/clients',
      element: <GuardRoutes isPrivate={true}><Clients /></GuardRoutes>,
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
