// Import des bibliothèques et des composants nécessaires
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import CompanyService from '@/Services/Company.service'; // Assurez-vous d'importer le service approprié pour l'ajout d'entreprise

// Mise en page du formulaire
const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 9 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 26, offset: 6 },
        sm: { span: 3, offset: 8 },
    },
};

// Fonction de formulaire d'ajout d'entreprise
const AddCompanyForm = ({ onFinish }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            const response = await CompanyService.AddCompany(values);

            if (response.message) {
                message.success('Entreprise ajoutée avec succès!');
                onFinish();
            } else {
                message.error('Erreur lors de l\'ajout de l\'entreprise : ' + response.message);
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
        }
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="addCompanyForm"
            onFinish={handleSubmit}
        >
            <Form.Item
                name="company_name"
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
                name="company_telephone"
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
                name="company_num_siret"
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
                name="code_naf"
                label="Code Naf"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le code Naf !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="company_adresse"
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
                name="pays_name"
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
                name="company_ville"
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
                name="company_codepostal"
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
                    Ajouter l'entreprise
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddCompanyForm;
