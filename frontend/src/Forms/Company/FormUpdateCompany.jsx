import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Typography, Divider, message, Select } from 'antd';

import EntrepriseService from "@/Services/Company.service";
import Countryservice from '@/Services/Country.service';
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
const FormUpdateCompany = ({ initialCompanyData, onSuccess }) => {
    const [form] = Form.useForm();
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countriesData = await Countryservice.GetAllCountries();
                setCountries(countriesData);

            } catch (error) {
                console.error('Error fetching countries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    /**
     * Gère la soumission du formulaire de mise à jour des informations de l'entreprise.
     * @param {Object} values - Les valeurs du formulaire.
     */
    const onFinish = async (values) => {
        try {

            const validatedValues = await form.validateFields();

            let ObjectCompany = {
                id: initialCompanyData.id,
                company_name: validatedValues.company_name,
                company_telephone: validatedValues.company_telephone,
                company_num_siret: validatedValues.company_num_siret,
                code_naf: validatedValues.code_naf,
                company_adresse: validatedValues.company_adresse,
                pays_id: validatedValues.pays_id,
                company_ville: validatedValues.company_ville,
                company_codepostal: validatedValues.company_codepostal,
                idAdresse: initialCompanyData.CompanyAdresses[0].id,
            }

            const response = await EntrepriseService.UpdateCompany(initialCompanyData.id, ObjectCompany);

            if (response.message) {
                message.success('Informations de l\'entreprise mises à jour avec succès!');
                onSuccess();
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
                company_name: initialCompanyData.company_name,
                company_telephone: initialCompanyData.company_telephone,
                company_num_siret: initialCompanyData.company_num_siret,
                code_naf: initialCompanyData.code_naf,
                company_adresse: initialCompanyData.CompanyAdresses[0].company_adresse,
                pays_id: initialCompanyData.Country.id,
                company_ville: initialCompanyData.CompanyAdresses[0].company_ville,
                company_codepostal: initialCompanyData.CompanyAdresses[0].company_codepostal,
            }}
        >
            <Divider />
            <Title className="titleUpdateEntrepriseInfo" level={3}>Modification des informations de l'entreprise</Title>
            <Divider />

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
                label="CodeNaf"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le code naf de votre entreprise !',
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
                name="pays_id"
                label="Pays"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez sélectionner le pays de votre entreprise !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                {loading ? (
                    <Input placeholder="Chargement des pays..." disabled />
                ) : (
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {countries.data.map(country => (
                            <Select.Option key={country.id} value={country.id}>
                                {country.nom_fr_fr}
                            </Select.Option>
                        ))}
                    </Select>
                )}
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
                    Mettre à jour l'entreprise
                </Button>
            </Form.Item>
        </Form>
    )
};

export default FormUpdateCompany;
