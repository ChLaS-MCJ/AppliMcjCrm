import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';

import ClientService from '@/Services/Clients.service';
import CompanyService from '@/Services/Company.service';

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

const FromUpdateLinkCompany = ({ onFinish, onSuccess, clientID }) => {
    const [form] = Form.useForm();
    const [Allcompany, setCompany] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const CompanyData = await CompanyService.GetAllCompany();
                setCompany(CompanyData);

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
            const response = await ClientService.LinkCompany(values, clientID);

            if (response) {
                message.success('Entreprise liée avec succès!');
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
                name="companyId"
                label="Toutes les entreprises"
                rules={[
                    {
                        required: true,
                        message: 'Veuillez sélectionner une entreprise !',
                    },
                ]}
                style={{ width: '100%' }}
            >
                {loading ? (
                    <Input placeholder="Chargement des entreprises..." disabled />
                ) : (
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {Allcompany.data.map(company => (
                            <Select.Option key={company.id} value={company.id}>
                                {company.company_name}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Lié l'entreprise
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FromUpdateLinkCompany;
