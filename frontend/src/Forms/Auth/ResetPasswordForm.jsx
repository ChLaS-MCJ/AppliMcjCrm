import React from 'react';
import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';

export default function ResendPasswordForm() {
  return (
    <>
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
