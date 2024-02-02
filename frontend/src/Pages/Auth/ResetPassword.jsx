
import React from 'react';
import { useEffect } from 'react';
import { Form, Button, Layout, Col, Divider, Typography, message } from 'antd';
import ResetPasswordForm from '@/Forms/Auth/ResetPasswordForm';
import AuthLayout from '@/layout/AuthLayout';
import SideContent from '@/layout/AuthLayout/SideContentLogin';
import { AuthService } from '@/Services';
import logomobile from '@/Assets/images/logo-mobile.png';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/Redux/Auth/Selector';
import { useNavigate, useLocation } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;


const ResetPassword = () => {
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resettoken = searchParams.get('token');


  const handleSubmit = async (values) => {

    let password = values.password;
    try {
      await AuthService.resetPassword({ password, resettoken });
      message.success('Réinitialisation du mot de passe réussie');
      navigate("/login", { replace: true });
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      message.error('Échec de la réinitialisation du mot de passe');
    }
  };

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess]);

  return (
    <>
      <AuthLayout sideContent={<SideContent />}>
        <Content style={{ padding: '10px 20px', }}></Content>
        <Content style={{ padding: '140px 30px 30px', maxWidth: '440px', margin: '0 auto', }}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
            <img src={logomobile} alt="Logo" style={{ margin: '-70px auto 40px', display: 'block', }} />
          </Col>
          <Title level={1}>Réinitialiser le mot de passe</Title>
          <Divider />
          <div className="site-layout-content">
            <Form layout="vertical" name="normal_login" className="login-form" onFinish={handleSubmit}>
              <ResetPasswordForm />
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading} size="large">
                  Faire la demande
                </Button>
                <a href="/login">se connecter</a> ou <a href="/register">s'enregistrer!</a>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </AuthLayout >
    </>
  );
};

export default ResetPassword;