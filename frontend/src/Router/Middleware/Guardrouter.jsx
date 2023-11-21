import React from 'react';
import { Navigate } from 'react-router-dom';

import AuthService from "@/Services/Auth.service";

/**
 * A React component that acts as a route guard. It checks if a route is private or public
 * and redirects the user accordingly based on their authentication status.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isPrivate - A boolean flag indicating if the route is private or public.
 * @param {ReactNode} props.children - The components to be rendered inside the AuthRoute component.
 * @returns {ReactNode} - The rendered components or a redirect.
 */
const AuthRoute = ({ children, isPrivate }) => {
  const isLoggedIn = AuthService.isLogged();

  if (isPrivate) {
    if (isLoggedIn) {
      return <>{children}</>;
    } else {
      return <Navigate to="/login" replace />;
    }
  } else {
    if (isLoggedIn) {
      return <Navigate to="/" replace />;
    } else {
      return <>{children}</>;
    }
  }
};

export default AuthRoute;