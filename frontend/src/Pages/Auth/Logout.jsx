import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoader from '@/Components/PageLoader';

/**
 * The Logout component handles the logout functionality.
 * It dispatches a logout action, removes the user's authentication data from local storage,
 * and redirects the user to the login page.
 *
 * @returns {JSX.Element} The Logout component
 */
const Logout = () => {

  const navigate = useNavigate();
  console.log("je passe au logout")
  useEffect(() => {

    window.localStorage.removeItem('auth');
    navigate('/login');
  }, []);

  return <PageLoader />;
};

export default Logout;
