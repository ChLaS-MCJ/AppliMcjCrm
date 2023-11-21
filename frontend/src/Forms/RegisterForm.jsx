import React from 'react';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

/**
 * Renders a form for user registration.
 * The form includes input fields for the user's name, email, password, and confirmation password.
 * @returns {JSX.Element} The rendered component.
 */
export default function RegisterForm() {
  return (
    <>
      <Form.Item
        name="nom"
        rules={[
          {
            required: true,
            message: 'le Nom est obligatoire'
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nom"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="prenom"
        rules={[
          {
            required: true,
            message: 'le Prénom est obligatoire'
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Prénom"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="pseudo"
        rules={[
          {
            required: true,
            message: 'le Pseudo est obligatoire'
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Pseudo"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "L'Email est obligatoire"
          },
          {
            type: 'email',
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="Email"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Le Password est obligatoire'
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        rules={[
          {
            required: true,
            message: 'La Confirmation du password est obligatoire'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Les deux mots de passe que vous avez saisis ne correspondent pas !'));
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirm_password"
          size="large"
        />
      </Form.Item>
    </>
  );
}
