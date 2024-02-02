import React from 'react';
import { Button, Form, Input, Typography, Divider, message } from 'antd';

import EntrepriseService from "@/Services/Company.service";
const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 26, offset: 6 },
        sm: { span: 4, offset: 14 },
    },
};

/**
 * Composant de mise à jour des informations de l'entreprise.
 * Permet de modifier les informations de l'entreprise.
 */
const FormUpdateCompany = (selectedRowData) => {
    const [form] = Form.useForm();
    console.log(selectedRowData);
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flexStart',
                maxWidth: 600,
            }}

            initialValues={{
                nom: selectedRowData.initialCompanyData.societeNom,
                telephone: selectedRowData.initialCompanyData.societeTel,
                siret: selectedRowData.initialCompanyData.numSiret,
                Adresse: selectedRowData.initialCompanyData.societeRue,
                pays: selectedRowData.initialCompanyData.societePays,
                ville: selectedRowData.initialCompanyData.societeVille,
                codePostal: selectedRowData.initialCompanyData.societeCodePostal,
            }}
        >
            <Divider />
            <Title className="titleUpdateEntrepriseInfo" level={3}>Modification des informations de l'entreprise</Title>
            <Divider />

            <Form.Item
                name="nom"
                label="Nom"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le nom de votre entreprise !',
                        whitespace: true,
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="telephone"
                label="Téléphone"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le numéro de téléphone de votre entreprise !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="siret"
                label="Numéro SIRET"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le numéro SIRET de votre entreprise !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="Adresse"
                label="Adresse"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer la rue de votre entreprise !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="pays"
                label="Pays"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le pays de votre entreprise !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="ville"
                label="Ville"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer la ville de votre entreprise !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="codePostal"
                label="Code postal"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le code postal de votre entreprise !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Mettre à jour l'entreprise
                </Button>
            </Form.Item>
        </Form>
    )
};

export default FormUpdateCompany;
