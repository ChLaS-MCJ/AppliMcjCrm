import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

/**
 * Renders a 404 error page with a title, subtitle, and a button to navigate to a different route.
 * Uses the `useNavigate` hook from the `react-router-dom` library to navigate to a specific route when the component mounts.
 * 
 * @returns {JSX.Element} The rendered 404 error page.
 */
const NotFoundPage = () => {

  let navigate = useNavigate();
  useEffect(() => {
    navigate(`notfound`, { replace: true });
  }, []);

  let entity = "";

  return (
    <Result
      status="404"
      title="Error 404"
      subTitle="Désolé, la page que vous avez demandée n'existe pas."
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(`/${entity.toLowerCase()}`);
          }}
        >
          Revenir en arrière
        </Button>
      }
    />
  );
};
export default NotFoundPage;
