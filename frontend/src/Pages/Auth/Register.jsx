/**
 * Functional component that renders a registration form.
 *
 * @returns {JSX.Element} The rendered registration form.
 */
import React, { useState } from 'react';
import { Form, Button, Layout, Col, Divider, Typography, message } from 'antd';
import RegisterForm from '@/Forms/Auth/RegisterForm';
import AuthLayout from '@/layout/AuthLayout';
import SideContent from '@/layout/AuthLayout/SideContentLogin';
import UsersService from "@/Services/Users.service";
import logomobile from '@/Assets/images/logo-mobile.png';
import clipboardCopy from 'clipboard-copy';
import passwordGenerator from 'secure-random-password';
import { useNavigate } from 'react-router-dom';


const { Content } = Layout;
const { Title, Text } = Typography;

const RegisterPage = () => {

  const [suggestedPassword, setSuggestedPassword] = useState('');

  const navigate = useNavigate();

  /**
   * Handles form submission.
   *
   * @param {Object} values - The form field values submitted by the user.
   */
  const onFinish = (values) => {

    UsersService.registerUsers(values)
      .then(() => {
        message.success('Inscription réussie!');
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        message.error("Un problème est survenu lors de l'inscription.");
        console.error("Erreur lors de l'inscription:", err);
      });
  };

  const generateSuggestedPassword = () => {
    const suggestedPassword = passwordGenerator.randomPassword({
      length: 16,
      characters: passwordGenerator.lower + passwordGenerator.upper + passwordGenerator.digits + passwordGenerator.symbols,
    });
    return suggestedPassword;
  };

  const copyToClipboard = () => {
    clipboardCopy(suggestedPassword);
  };

  return (
    <>
      <AuthLayout sideContent={<SideContent />}>
        <Content style={{ padding: '200px 30px 30px', maxWidth: '440px', margin: '0 auto' }}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
            <img src={logomobile} alt="Logo" style={{ margin: '-70px auto 40px', display: 'block' }} />
            <div className="space50"></div>
          </Col>
          <Title level={1}>Créer un compte</Title>
          <Divider />
          <div className="site-layout-content">
            <Form name="signup" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
              <RegisterForm />
              <Form.Item>
                <Button type="primary" onClick={() => {
                  const newPassword = generateSuggestedPassword();
                  setSuggestedPassword(newPassword);
                }}
                >
                  Suggérer un mot de passe
                </Button>
                {suggestedPassword && (
                  <div >
                    <strong style={{ padding: '20px 15px' }}>Mot de passe suggéré: <Text type="danger">{suggestedPassword}</Text></strong>

                    <Button type="link" onClick={copyToClipboard}>
                      Copier dans le presse-papiers
                    </Button>
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                  Créer un compte
                </Button>
                Ou <a href="/login"> Déjà inscrit ? Connectez-vous </a>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </AuthLayout>
    </>
  );
};

export default RegisterPage;
