/**
 * Functional component that handles the login functionality.
 *
 * @component
 * @example
 * return (
 *   <LoginPage />
 * )
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Layout, Col, Divider, Typography } from 'antd';
import LoginForm from '@/Forms/LoginForm';
import AuthLayout from '@/layout/AuthLayout';
import SideContent from '@/layout/AuthLayout/SideContentLogin';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '@/Redux/Auth/Selector';
import { AuthService } from '@/Services';
import logomobile from '@/Assets/images/logo-mobile.png';

const { Content } = Layout;
const { Title } = Typography;

/**
 * Represents a login page component.
 * 
 * This component handles the submission of a login form, dispatches an action to update the authentication state,
 * and redirects the user to the home page upon successful login.
 * 
 * @returns {JSX.Element} The login page component.
 */
const LoginPage = () => {
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Function called when the login form is submitted.
   *
   * @param {Object} values - The form values entered by the user.
   * @returns {void}
   */
  const onFinish = (values) => {
    AuthService.login(values)
      .then(response => {
        dispatch({ type: "Auth/setToken", payload: response.data.access_token });
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.error('Error during login:', error);
        if (error.response) {
          console.log('Response status:', error.response.status);
        }
        alert('Veuillez entrer une adresse mail et/ou un mot de passe valide');
      })
  };

  return (
    <>
      <AuthLayout sideContent={<SideContent />}>
        <Content style={{ padding: '10px 20px', }}></Content>
        <Content style={{ padding: '140px 30px 30px', maxWidth: '440px', margin: '0 auto', }}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
            <img src={logomobile} alt="Logo" style={{ margin: '-70px auto 40px', display: 'block', }} />
          </Col>
          <Title level={1}>Se Connecter</Title>
          <Divider />
          <div className="site-layout-content">
            <Form layout="vertical" name="normal_login" className="login-form" initialValues={{ remember: true, }} onFinish={onFinish}>
              <LoginForm />
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading} size="large">
                  Connexion
                </Button>
                Ou <a href="/register">s'enregistrer!</a>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </AuthLayout >
    </>
  );
};

export default LoginPage;