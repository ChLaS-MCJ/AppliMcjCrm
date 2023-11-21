
import React from 'react';
import { useEffect } from 'react';
import { Form, Button, Layout, Col, Divider, Typography,message  } from 'antd';
import ResendPasswordForm from '@/Forms/ResendPasswordForm';
import AuthLayout from '@/layout/AuthLayout';
import SideContent from '@/layout/AuthLayout/SideContentLogin';
import AuthService from "@/Services/Auth.service";
import logomobile from '@/Assets/images/logo-mobile.png';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/Redux/Auth/Selector';
const { Content } = Layout;
const { Title } = Typography;


const ResendPassword = () => {
  const { isLoading, isSuccess } = useSelector(selectAuth);

  const handleSubmit = async (values) => {
    let email = values.email;
    try {
      await AuthService.requestPasswordReset({ email });
      message.success("Lien de réinitialisation du mot de passe envoyé avec succès");
    } catch (error) {
      console.error("Erreur lors de la demande de réinitialisation du mot de passe:", error);
      message.error("Échec de l'envoi du lien de réinitialisation du mot de passe");
    }
  };

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess]);

  return (
    <>
      <AuthLayout sideContent={<SideContent />}>
        <Content style={{padding: '10px 20px',}}></Content>
        <Content style={{padding: '140px 30px 30px',maxWidth: '440px',margin: '0 auto',}}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
            <img src={logomobile} alt="Logo" style={{ margin: '-70px auto 40px',display: 'block',}}/>
            </Col>
          <Title level={1}>Renvoyer le mot de passe</Title>
          <Divider />
          <div className="site-layout-content">
            <Form layout="vertical" name="normal_login" className="login-form" onFinish={handleSubmit}>
              <ResendPasswordForm />
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

export default ResendPassword;