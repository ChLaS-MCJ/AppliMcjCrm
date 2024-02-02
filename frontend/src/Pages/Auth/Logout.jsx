import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoader from '@/Components/PageLoader';
import { useDispatch } from 'react-redux';
import { themeSlice } from '@/Redux/Themes/Reducer';
/**
 * The Logout component handles the logout functionality.
 * It dispatches a logout action, removes the user's authentication data from local storage,
 * and redirects the user to the login page.
 *
 * @returns {JSX.Element} The Logout component
 */
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {

    window.localStorage.removeItem('auth');
    dispatch(themeSlice.actions.resetTheme());
    navigate('/login');
  }, []);

  return <PageLoader />;
};

export default Logout;
