import React, { useState, useEffect } from 'react';

import { Table, Input, Button, Space, Modal, message } from 'antd';

import {
    SearchOutlined,
    SwapOutlined
} from '@ant-design/icons';

import { AdminService } from '@/Services/Admin.service';

function getColumnSearchProps(dataIndex) {
    return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 15 }}>
                <Input
                    placeholder={`Rechercher ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => confirm()}
                    style={{ width: 200, marginBottom: 10, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: "100%" }}
                    >
                        Rechercher
                    </Button>
                    <Button onClick={() => clearFilters()} size="small" style={{ width: "100%" }}>
                        Réinitialiser
                    </Button>
                </Space>
            </div>
        ),
        onFilter: (value, record) => {
            const dataIndexArray = dataIndex.split('.');
            let nestedValue = record;
            for (const key of dataIndexArray) {
                if (nestedValue && key in nestedValue) {
                    nestedValue = nestedValue[key];
                    if (Array.isArray(nestedValue) && nestedValue.length > 0) {
                        nestedValue = nestedValue[0];
                    }
                } else {
                    nestedValue = undefined;
                    break;
                }
            }

            if (typeof nestedValue === 'string') {
                return nestedValue.toLowerCase().includes(value.toLowerCase());
            }

            return false;
        },
        render: (text) => text,
    };
}
const CompanyDelAdmin = () => {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 20,
        },
    });

    const columns = [
        {
            title: 'Entreprise',
            children: [
                {
                    title: <span style={{ color: 'orange' }}>Nom</span>,
                    dataIndex: 'company_name',
                    key: 'company_name',
                    width: 100,
                    ...getColumnSearchProps('company_name'),
                },
                {
                    title: 'Téléphone',
                    dataIndex: 'company_telephone',
                    key: 'company_telephone',
                    width: 100,
                },
                {
                    title: 'N°Siret',
                    dataIndex: 'company_num_siret',
                    key: 'company_num_siret',
                    width: 100,
                },
                {
                    title: 'CodeNaf',
                    dataIndex: 'code_naf',
                    key: 'code_naf',
                    width: 100,
                },
                {
                    title: 'Adresse',
                    children: [
                        {
                            title: 'Rue',
                            dataIndex: ['CompanyAdresses', 0, 'company_adresse'],
                            key: 'Rue',
                            width: 150,
                            ...getColumnSearchProps('CompanyAdresses.company_adresse'),
                        },
                        {
                            title: 'Complément',
                            children: [
                                {
                                    title: 'Pays',
                                    dataIndex: ['Country', 'nom_fr_fr'],
                                    key: 'Pays',
                                    width: 100,
                                },
                                {
                                    title: 'Ville',
                                    dataIndex: ['CompanyAdresses', 0, 'company_ville'],
                                    key: 'Ville',
                                    width: 100,
                                    ...getColumnSearchProps('CompanyAdresses.company_ville'),
                                },
                                {
                                    title: 'Code Postal',
                                    dataIndex: ['CompanyAdresses', 0, 'company_codepostal'],
                                    key: 'Code Postal',
                                    width: 100,
                                    ...getColumnSearchProps('CompanyAdresses.company_codepostal'),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            title: 'Restauration',
            dataIndex: 'restauration',
            key: 'restauration',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <a style={{ color: '#f4a54b' }} onClick={() => handlerestorClick(record)}><SwapOutlined /></a>
                </div>
            ),
        },
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            order: sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await AdminService.GetAllCompanyDel();
            setData(result.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const refreshData = async () => {
        setLoading(true);
        try {
            const result = await AdminService.GetAllCompanyDel();
            setData(result.data.map(item => ({ ...item, key: item.id })));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlerestorClick = (record) => {

        Modal.confirm({
            title: 'Restaurer le client',
            content: "Êtes-vous sûr de vouloir restaurer l'entreprise?",
            okText: 'Oui',
            cancelText: 'Annuler',
            onOk: async () => {
                try {

                    let ojectdata = {
                        idcompany: record.id,
                        idcompanyadresses: record.CompanyAdresses[0].id,
                    }

                    await AdminService.RestoreOneCompanyDel(record.id, ojectdata);
                    refreshData();
                    message.success('Entreprise restauré avec succès!');
                } catch (error) {
                    message.error("Erreur lors de la restauration de l'Entreprise", error);
                }
            },
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='maincontainclients'>
            <Table
                columns={columns}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                bordered
                size="small"
                scroll={{ x: '100%', y: 430 }}
            />
        </div>
    );
};

export default CompanyDelAdmin;