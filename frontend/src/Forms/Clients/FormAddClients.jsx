import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';

import ClientService from '@/Services/Clients.service';
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

const FormAddClients = ({ onFinish, onSuccess }) => {
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
            const response = await ClientService.AddClient(values);
            if (response.message) {
                message.success('Client ajouté avec succès!');
                onFinish();
                onSuccess();
            } else {
                message.error('Erreur lors de l\'ajout du client : ' + response.message);
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
        }
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="addClientForm"
            onFinish={handleSubmit}
        >
            <Form.Item
                name="clients_name"
                label="Nom"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le nom du client !',
                        whitespace: true,
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="clients_prenom"
                label="Prénom"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer le prénom du client !',
                        whitespace: true,
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="clients_civilite"
                label="Civilité"
                style={{ width: '100%' }}
            >
                <Select>
                    <Select.Option value="homme">Homme</Select.Option>
                    <Select.Option value="femme">Femme</Select.Option>
                    <Select.Option value="autres">Autres</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="clients_tel"
                label="Téléphone"
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="clients_mail"
                label="Adresse Email"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez entrer l\'adresse email du client !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="clients_adresse"
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
                name="clients_ville"
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
                name="clients_codepostal"
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
                    Ajouter le client
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormAddClients;
