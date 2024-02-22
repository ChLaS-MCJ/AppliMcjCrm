import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Checkbox, Divider, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { userReducer } from '@/Redux/User/Reducer';

import UsersService from '@/Services/Users.service';

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

const FormUpdateProfilAdmin = ({ initialUpdateProfilData, onSuccess, refreshData }) => {
    const [form] = Form.useForm();
    const [changePassword, setChangePassword] = useState(false);
    const [file, setFile] = useState(null);
    const [Role, setRole] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const RoleData = await UsersService.GetAllRoles();
                setRole(RoleData);
            } catch (error) {
                console.error('Error fetching Role:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const onFinish = async (values) => {
        try {
            const validatedValues = await form.validateFields();

            const formData = new FormData();
            formData.append('id', initialUpdateProfilData.id);
            formData.append('email', validatedValues.email);
            if (changePassword) {
                formData.append('password', validatedValues.password);
            }
            formData.append('pseudo', validatedValues.pseudo);
            formData.append('adresse', validatedValues.adresse);
            formData.append('phone', validatedValues.phone);
            formData.append('description', validatedValues.intro);
            formData.append('genre', validatedValues.gender);
            formData.append('role_id', validatedValues.role_id);

            if (file) {
                formData.append('image', file);
            }
            const response = await UsersService.updateUserProfile(initialUpdateProfilData.id, formData);

            if (response.message) {
                message.success('Profil mis à jour avec succès!');
                onSuccess();
                refreshData();
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
            initialValues={{
                email: initialUpdateProfilData.email,
                pseudo: initialUpdateProfilData.pseudo,
                adresse: initialUpdateProfilData.adresse,
                phone: initialUpdateProfilData.phone,
                intro: initialUpdateProfilData.description,
                gender: initialUpdateProfilData.genre,
                role_id: initialUpdateProfilData.role_id,
            }}
        >
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
                        className='changepasswordform'
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
                        className='changepasswordform'
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
                        message: 'Veuillez entrer votre pseudo !',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="adresse"
                label="Adresse"
                rules={[
                    {
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
                        message: 'Veuillez entrer votre numéro de téléphone !',
                    },
                ]}
            >
                <Input
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
                        message: 'Veuillez sélectionner le genre !',
                    },
                ]}
            >
                <Select placeholder="Sélectionnez votre genre">
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

            <Form.Item
                name="role_id"
                label="Rôle"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez sélectionner le rôle de l\'utilisateur !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                {loading ? (
                    <Input placeholder="Chargement des rôles..." disabled />
                ) : (
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {Role.data.map(role => (
                            <Select.Option key={role.id} value={role.id}>
                                {role.name_roles}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Mettre à jour le profil
                </Button>
            </Form.Item>
        </Form>
    );
}

export default FormUpdateProfilAdmin;
