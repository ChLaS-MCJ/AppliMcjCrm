import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';

import AssociationService from '@/Services/Association.service';

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

const FromUpdateLinkAssociation = ({ onFinish, onSuccess, clientID }) => {
    const [form] = Form.useForm();
    const [AllAssociations, setAssociations] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const AssociationsData = await AssociationService.GetAllAssociation();
                setAssociations(AssociationsData);
            } catch (error) {
                console.error('Error fetching associations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (values) => {
        try {
            const response = await AssociationService.LinkAssociation(values, clientID);

            if (response) {
                message.success('Association liée avec succès!');
                onFinish();
                onSuccess();
            } else {
                message.error(`Erreur lors de l'ajout du client: ${response ? response.error : 'Réponse non définie'}.`);
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
        }
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="UpdateLinkCompanyForm"
            onFinish={handleSubmit}
        >
            <Form.Item
                name="associationId"
                label="Toutes les associations"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez sélectionner une association !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                {loading ? (
                    <Input placeholder="Chargement des associations..." disabled />
                ) : (
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {AllAssociations.data.map(association => (
                            <Select.Option key={association.id} value={association.id}>
                                {association.association_name}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Lié l'association
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FromUpdateLinkAssociation;
