import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Checkbox, Divider, Typography, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UsersService } from '@/Services';
import { AuthService } from '@/Services';

const { Title } = Typography;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
    },
};

const passwordFormItemLayout = {
    labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
    },
};

export default function UpdateProfil() {
    const [form] = Form.useForm();
    const [changePassword, setChangePassword] = useState(false);
    const [ProfilUser, setProfilUser] = useState({});
    const [file, setFile] = useState(null);

    useEffect(() => {
        const tokenInfo = AuthService.getTokenInfo();
        setProfilUser(tokenInfo);
    }, []);

    const onFinish = async (values) => {
        try {
            const validatedValues = await form.validateFields();

            const formData = new FormData();
            formData.append('id', ProfilUser.id);
            formData.append('email', validatedValues.email);
            if (changePassword) {
                formData.append('password', validatedValues.password);
            }
            formData.append('pseudo', validatedValues.pseudo);
            formData.append('adresse', validatedValues.Adresse);
            formData.append('phone', validatedValues.prefix + validatedValues.phone);
            formData.append('description', validatedValues.intro);
            formData.append('genre', validatedValues.gender);

            if (file) {
                formData.append('image', file);
            }
            const response = await UsersService.updateUserProfile(ProfilUser.id, formData);

            if (response.message) {
                message.success('Profil mis à jour avec succès !');


            } else {
                message.error('Erreur lors de la mise à jour du profil : ' + response.message);
            }
        } catch (errorInfo) {
            console.log('Validation Failed:', errorInfo);
        }
    };


    const onFinishFailed = (errorInfo) => {
        message.open({
            type: 'error',
            content: 'Échec de la validation du formulaire',
        });
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="07">+07</Option>
                <Option value="06">+06</Option>
            </Select>
        </Form.Item>
    );

    const toggleChangePassword = () => {
        setChangePassword(!changePassword);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const beforeUpload = (file) => {
        setFile(file);
        return false;
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="updateprofil"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{
                maxWidth: 600,
            }}
        >
            <Title className="titleUpdateprofil" level={3}>Modification profil</Title>
            <Divider />

            <Form.Item
                required
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: "L'entrée n'est pas un E-mail valide !",
                    },
                    {
                        required: true,
                        message: 'Veuillez entrer votre E-mail !',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            {changePassword ? (
                <>
                    <Form.Item
                        name="password"
                        label="Mot de passe"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez entrer votre mot de passe !',
                            },
                        ]}
                        hasFeedback
                        {...passwordFormItemLayout}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirmer"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez confirmer votre mot de passe !',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Les mots de passe ne correspondent pas !'));
                                },
                            }),
                        ]}
                        {...passwordFormItemLayout}
                    >
                        <Input.Password />
                    </Form.Item>
                </>
            ) : null}

            <Form.Item
                name="changePassword"
                valuePropName="checked"
                {...tailFormItemLayout}
            >
                <Checkbox onChange={toggleChangePassword}>Modifier le mot de passe</Checkbox>
            </Form.Item>

            <Form.Item
                name="pseudo"
                label="Pseudo"
                tooltip="Comment souhaitez-vous que les autres vous appellent ?"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer votre pseudo !',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="Adresse"
                label="Adresse"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez ecrire votre adresse !',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Téléphone"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer votre numéro de téléphone !',
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item
                name="intro"
                label="Introduction"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer une introduction',
                    },
                ]}
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Genre"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez sélectionner le genre !',
                    },
                ]}
            >
                <Select placeholder="sélectionnez votre genre">
                    <Option value="Homme">Homme</Option>
                    <Option value="Femme">Femme</Option>
                    <Option value="Autre">Autre</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="upload"
                label="Image Profil"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload
                    name="logo"
                    listType="picture"
                    beforeUpload={beforeUpload}
                >
                    <Button icon={<UploadOutlined />}>Modification</Button>
                </Upload>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Mettre à jour le profil
                </Button>
            </Form.Item>
        </Form>
    );
}
