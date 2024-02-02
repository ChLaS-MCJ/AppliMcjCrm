import React from 'react';
import { Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';

export default function ResendPasswordForm() {
  return (
    <>
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
          placeholder="Votre Email"
          size="large"
        />
      </Form.Item>
    </>
  );
}
