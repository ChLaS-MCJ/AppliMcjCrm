import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Typography, Divider, Select } from 'antd';

import AssociationService from "@/Services/Association.service";
import Countryservice from '@/Services/Country.service';
const { Title } = Typography;
const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
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

const FormUpdateAssociation = ({ initialAssociationData, onSuccess }) => {
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
     * Gère la soumission du formulaire de mise à jour des informations de l'association.
     * @param {Object} values - Les valeurs du formulaire.
     */
    const onFinish = async (values) => {
        try {

            const validatedValues = await form.validateFields();

            let ObjectAssociation = {
                id: initialAssociationData.id,
                association_name: validatedValues.association_name,
                association_telephone: validatedValues.association_telephone,
                association_num_siret: validatedValues.association_num_siret,
                code_naf: validatedValues.code_naf,
                code_rna: validatedValues.code_rna,
                association_adresse: validatedValues.association_adresse,
                pays_id: validatedValues.pays_id,
                association_ville: validatedValues.association_ville,
                association_codepostal: validatedValues.association_codepostal,
                idAdresse: initialAssociationData.associationAdresse_id,
            }
            const response = await AssociationService.UpdateAssociation(initialAssociationData.id, ObjectAssociation);

            if (response.message) {
                message.success('Informations de l\'association mises à jour avec succès!');
                onSuccess();
            } else {
                message.error('Erreur lors de la mise à jour des informations de l\'association : ' + response.message);
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
            name="updateAssociationInfo"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flexStart',
                maxWidth: 600,
            }}

            className='FormUpdateAssociation'

            initialValues={{
                association_name: initialAssociationData.association_name,
                association_telephone: initialAssociationData.association_telephone,
                association_num_siret: initialAssociationData.association_num_siret,
                code_naf: initialAssociationData.code_naf,
                code_rna: initialAssociationData.code_rna,
                association_adresse: initialAssociationData.AssociationAdresse.association_adresse,
                pays_id: initialAssociationData.AssociationAdresse.associationpays_id,
                association_ville: initialAssociationData.AssociationAdresse.association_ville,
                association_codepostal: initialAssociationData.AssociationAdresse.association_codepostal,
                idAdresse: initialAssociationData.associationAdresse_id,
            }}
        >
            <Divider />
            <Title className="titleUpdateEntrepriseInfo" level={3}>Modification des informations de l'association</Title>
            <Divider />

            <Form.Item
                name="association_name"
                label="Nom"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le nom de votre Association !',
                        whitespace: true,
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="association_telephone"
                label="Téléphone"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le numéro de téléphone de votre Association !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="association_num_siret"
                label="Numéro SIRET"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le numéro SIRET de votre Association !',
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
                        message: 'Veuillez entrer le code naf de votre Association !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="code_rna"
                label="CodeRna"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le code rna de votre Association !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="association_adresse"
                label="Adresse"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer la rue de votre Association !',
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
                        message: 'Veuillez sélectionner le pays de votre Association !',
                    },
                ]}
                style={{ width: '100%' }}
                className='InputPays'
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
                name="association_ville"
                label="Ville"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer la ville de votre Association !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="association_codepostal"
                label="Code postal"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le code postal de votre Association !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Mettre à jour l'association
                </Button>
            </Form.Item>
        </Form>
    )
};

export default FormUpdateAssociation; 
