import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


/**
 * Renders a login form using the Ant Design library.
 * The form includes fields for email and password, with validation rules.
 * It also includes a checkbox for remembering the user and a link for password recovery.
 * @returns {JSX.Element} The login form component.
 */
export default function LoginForm() {
  return (
    <>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "l'Email est obligatoire"
          },
          {
            type: 'email',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="email@gmail.com"
          type="email"
          autoComplete="email"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "le Password est obligatoire"
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="password"
          size="large"
        />
      </Form.Item>
      <Form.Item>

        <a className="login-form-forgot" href="/resendpassword">
          Mot de passe oublié
        </a>
      </Form.Item>
    </>
  );
}
