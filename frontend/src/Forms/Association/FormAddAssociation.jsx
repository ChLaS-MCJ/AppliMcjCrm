import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import AssociationService from '@/Services/Association.service';
import Countryservice from '@/Services/Country.service';

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

const AddAssociationForm = ({ onFinish, onSuccess }) => {
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

    const handleSubmit = async (values) => {
        try {
            const response = await AssociationService.AddAssociation(values);
            if (response.message) {
                message.success('Association ajoutée avec succès!');
                onFinish();
                onSuccess();
            } else {
                message.error('Erreur lors de l\'ajout de l\'association : ' + response.message);
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
        }
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="addAssociationForm"
            onFinish={handleSubmit}
        >
            <Form.Item
                name="association_name"
                label="Nom"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le nom de votre association !',
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
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="association_num_siret"
                label="Numéro SIRET"
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="code_naf"
                label="Code Naf"
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="code_rna"
                label="Code Rna"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le code Rna !',
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
                        message: 'Veuillez entrer la rue de votre association !',
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
                        message: 'Veuillez sélectionner le pays de votre association !',
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
                name="association_ville"
                label="Ville"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer la ville de votre association !',
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
                        message: 'Veuillez entrer le code postal de votre association !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Ajouter l'association
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddAssociationForm; 
