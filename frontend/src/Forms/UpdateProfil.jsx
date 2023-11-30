import React, { useState } from 'react';
import { Button, Form, Input, Select, Checkbox, Divider, Typography, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UsersService } from '@/Services';
import { useDispatch, useSelector } from 'react-redux';
import { userReducer } from '@/Redux/User/Reducer';

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

/**
 * Composant de mise à jour du profil utilisateur.
 * Permet à l'utilisateur de modifier ses informations personnelles.
 */
const UpdateProfil = () => {
    const [form] = Form.useForm();
    const [changePassword, setChangePassword] = useState(false);
    const [file, setFile] = useState(null);

    // Utilisez une convention camelCase pour les variables
    const storeUser = useSelector(state => state.UserStore);
    const dispatch = useDispatch();

    /**
     * Gère la soumission du formulaire de mise à jour du profil.
     * @param {Object} values - Les valeurs du formulaire.
     */
    const onFinish = async (values) => {
        try {
            const validatedValues = await form.validateFields();

            const formData = new FormData();
            formData.append('id', storeUser.id);
            formData.append('email', validatedValues.email);
            if (changePassword) {
                formData.append('password', validatedValues.password);
            }
            formData.append('pseudo', validatedValues.pseudo);
            formData.append('adresse', validatedValues.adresse);
            formData.append('phone', validatedValues.phone);
            formData.append('description', validatedValues.intro);
            formData.append('genre', validatedValues.gender);

            if (file) {
                formData.append('image', file);
            }
            const response = await UsersService.updateUserProfile(storeUser.id, formData);

            if (response.message) {
                message.success('Profil mis à jour avec succès!');
                dispatch(userReducer.actions.setUserData(response.user));
            } else {
                message.error('Erreur lors de la mise à jour du profil : ' + response.message);
            }
        } catch (errorInfo) {
            console.log('Validation Failed:', errorInfo);
        }
    };

    /**
     * Gère l'échec de la soumission du formulaire.
     * @param {Object} errorInfo - Informations sur l'erreur.
     */
    const onFinishFailed = (errorInfo) => {
        message.open({
            type: 'error',
            content: 'Échec de la validation du formulaire',
        });
    };

    /**
     * Bascule l'état du changement de mot de passe.
     */
    const toggleChangePassword = () => {
        setChangePassword(!changePassword);
    };

    /**
     * Normalise le fichier téléchargé.
     * @param {Object} e - Événement de changement de fichier.
     * @returns {Array|File} - Liste des fichiers ou fichier unique.
     */
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    /**
     * Exécuté avant le téléchargement d'un fichier.
     * @param {File} file - Fichier à télécharger.
     * @returns {boolean} - Indique si le téléchargement doit avoir lieu.
     */
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
                email: storeUser.email,
                pseudo: storeUser.pseudo,
                Adresse: storeUser.adresse,
                phone: storeUser.phone,
                intro: storeUser.description,
                gender: storeUser.genre,
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

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Mettre à jour le profil
                </Button>
            </Form.Item>
        </Form>
    );
}

export default UpdateProfil;
