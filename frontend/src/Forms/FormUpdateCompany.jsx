import React from 'react';
import { Button, Form, Input, Typography, Divider, message } from 'antd';

import EntrepriseService from "@/Services/Company.service";
const { Title } = Typography;

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

/**
 * Composant de mise à jour des informations de l'entreprise.
 * Permet de modifier les informations de l'entreprise.
 */
const FormUpdateCompany = () => {
    const [form] = Form.useForm();

    /**
     * Gère la soumission du formulaire de mise à jour des informations de l'entreprise.
     * @param {Object} values - Les valeurs du formulaire.
     */
    const onFinish = async (values) => {
        try {
            const validatedValues = await form.validateFields();

            const formData = new FormData();
            formData.append('nom', validatedValues.nom);
            formData.append('telephone', validatedValues.telephone);
            formData.append('siret', validatedValues.siret);
            formData.append('rue', validatedValues.rue);
            formData.append('pays', validatedValues.pays);
            formData.append('ville', validatedValues.ville);
            formData.append('codePostal', validatedValues.codePostal);


            const response = await EntrepriseService.UpdateCompany(formData);

            if (response.message) {
                message.success('Informations de l\'entreprise mises à jour avec succès!');

            } else {
                message.error('Erreur lors de la mise à jour des informations de l\'entreprise : ' + response.message);
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

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="updateEntrepriseInfo"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{
                maxWidth: 600,
            }}

            initialValues={{
                nom: "Nom de l'entreprise",
                telephone: "Numéro de téléphone de l'entreprise",
                siret: "Numéro SIRET de l'entreprise",
                rue: "Rue de l'entreprise",
                pays: "Pays de l'entreprise",
                ville: "Ville de l'entreprise",
                codePostal: "Code postal de l'entreprise",
            }}
        >
            <Title className="titleUpdateEntrepriseInfo" level={3}>Modification des informations de l'entreprise</Title>
            <Divider />

            <Form.Item
                name="nom"
                label="Nom de l'entreprise"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le nom de votre entreprise !',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="telephone"
                label="Téléphone de l'entreprise"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le numéro de téléphone de votre entreprise !',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="siret"
                label="Numéro SIRET de l'entreprise"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le numéro SIRET de votre entreprise !',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="rue"
                label="Rue de l'entreprise"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer la rue de votre entreprise !',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="pays"
                label="Pays de l'entreprise"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le pays de votre entreprise !',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="ville"
                label="Ville de l'entreprise"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer la ville de votre entreprise !',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="codePostal"
                label="Code postal de l'entreprise"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le code postal de votre entreprise !',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Mettre à jour les informations de l'entreprise
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormUpdateCompany;
