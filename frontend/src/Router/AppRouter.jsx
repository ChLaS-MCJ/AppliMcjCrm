import React, { lazy } from 'react';

import { useRoutes } from 'react-router-dom';
import GuardRoutes from './Middleware/Guardrouter';

const NotFound = lazy(() => import('@/Pages/NotFound.jsx'));

const Login = lazy(() => import('@/Pages/Auth/Login'));
const RegisterPage = lazy(() => import('@/Pages/Auth/Register'));
const ResendPassword = lazy(() => import('@/Pages/Auth/ResendPassword'));
const ResetPassword = lazy(() => import('@/Pages/Auth/ResetPassword'));
const Logout = lazy(() => import('@/Pages/Auth/Logout.jsx'));

const Dashboard = lazy(() => import('@/Pages/Dashboard'));

/**
 * React component that defines the routes for different pages in the application.
 * Uses the `useRoutes` hook from the `react-router-dom` library.
 *
 * @returns {React.Component} The component that handles the routing for the application.
 */
export default function AppRouter() {

  let element = useRoutes([
    {
      path: '/login',
      element: <GuardRoutes isPrivate={false}><Login /></GuardRoutes>,
    },
    {
      path: '/logout',
      element: <GuardRoutes isPrivate={false}><Logout /></GuardRoutes>,
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
      path: '*',
      element: <GuardRoutes isPrivate={false}><NotFound /></GuardRoutes>,
    },
  ]);

  return element;
}
