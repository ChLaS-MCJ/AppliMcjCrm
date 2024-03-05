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
const ClientDelAdmin = () => {

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
            title: 'Clients',
            children: [
                {
                    title: <span style={{ color: 'red' }}>Nom</span>,
                    dataIndex: 'clients_name',
                    key: 'clients_name',
                    width: 130,
                    fixed: 'left',
                    sorter: (a, b) => a.clients_name.localeCompare(b.clients_name),
                    ...getColumnSearchProps('clients_name'),
                },
                {
                    title: 'Prénom',
                    dataIndex: 'clients_prenom',
                    key: 'clients_prenom',
                    width: 100,
                    sorter: (a, b) => a.clients_prenom.localeCompare(b.clients_prenom),
                },
                {
                    title: 'Civilité',
                    dataIndex: 'clients_civilite',
                    key: 'clients_civilite',
                    width: 100,
                    sorter: (a, b) => a.clients_civilite.localeCompare(b.clients_civilite),
                    ...getColumnSearchProps('clients_civilite'),
                },
                {
                    title: 'Téléphone',
                    dataIndex: 'clients_tel',
                    key: 'clients_tel',
                    width: 150,
                    ...getColumnSearchProps('clients_tel'),
                },
                {
                    title: 'Mail',
                    dataIndex: 'clients_mail',
                    key: 'clients_mail',
                    width: 150,
                    sorter: (a, b) => a.clients_mail.localeCompare(b.clients_mail),
                    ...getColumnSearchProps('clients_mail'),
                },
            ],
        },
        {
            title: 'Adresse',
            children: [
                {
                    title: 'Rue',
                    dataIndex: ['ClientAdresses', [0], 'client_adresse_adresse'],
                    key: 'client_adresse_adresse',
                    width: 150,
                    ...getColumnSearchProps('ClientAdresses.client_adresse_adresse'),
                },
                {
                    title: 'Complément',
                    children: [
                        {
                            title: 'Pays',
                            dataIndex: ['ClientAdresses', [0], 'Country', 'nom_fr_fr'],
                            key: 'pays',
                            width: 100,
                        },
                        {
                            title: 'Ville',
                            dataIndex: ['ClientAdresses', [0], 'client_adresse_ville'],
                            key: 'ville',
                            width: 100,
                            ...getColumnSearchProps('ClientAdresses.client_adresse_ville'),
                        },
                        {
                            title: 'Code Postal',
                            dataIndex: ['ClientAdresses', [0], 'client_adresse_codepostal'],
                            key: 'codePostal',
                            width: 100,
                            ...getColumnSearchProps('ClientAdresses.client_adresse_codepostal'),
                        },
                    ],
                },
            ],
        },
        {
            title: 'Entreprise',
            children: [
                {
                    title: <span style={{ color: 'orange' }}>Nom</span>,
                    dataIndex: ['Companies', [0], 'company_name'],
                    key: 'societeNom',
                    width: 100,
                    ...getColumnSearchProps('Companies.company_name'),
                },
                {
                    title: 'Téléphone',
                    dataIndex: ['Companies', [0], 'company_telephone'],
                    key: 'societeTel',
                    width: 100,
                },
                {
                    title: 'N°Siret',
                    dataIndex: ['Companies', [0], 'company_num_siret'],
                    key: 'numSiret',
                    width: 100,
                },
                {
                    title: 'Adresse',
                    children: [
                        {
                            title: 'Rue',
                            dataIndex: ['Companies', [0], 'CompanyAdresses', [0], 'company_adresse'],
                            key: 'societeRue',
                            width: 150,
                        },
                        {
                            title: 'Complément',
                            children: [

                                {
                                    title: 'Ville',
                                    dataIndex: ['Companies', [0], 'CompanyAdresses', [0], 'company_ville'],
                                    key: 'societeVille',
                                    width: 100,
                                },
                                {
                                    title: 'Code Postal',
                                    dataIndex: ['Companies', [0], 'CompanyAdresses', [0], 'company_codepostal'],
                                    key: 'societeCodePostal',
                                    width: 100,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            title: 'Association',
            children: [
                {
                    title: <span style={{ color: 'red' }}>Nom</span>,
                    dataIndex: ['Association', 'association_name'],
                    key: 'Association',
                    width: 130,
                },
            ],
        },
        {
            title: 'Restauration ',
            dataIndex: 'restauration ',
            key: 'restauration',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <a style={{ color: 'green' }} onClick={() => handlerestorClick(record)}><SwapOutlined /></a>
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
            const result = await AdminService.GetAllClientsDel();
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
            const result = await AdminService.GetAllClientsDel();
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
            content: 'Êtes-vous sûr de vouloir restaurer ce client?',
            okText: 'Oui',
            cancelText: 'Annuler',
            onOk: async () => {
                try {
                    let ojectdata = {
                        idclient: record.id,
                        idclientadresses: record.ClientAdresses[0].id,
                        idclientcompanies: record.Companies[0].id,
                        idclientcompaniesadresses: record.Companies[0].CompanyAdresses[0].id,
                    }

                    await AdminService.RestoreOneClientsDel(record.id, ojectdata);
                    refreshData();
                    message.success('Client restauré avec succès!');
                } catch (error) {
                    console.error('Erreur lors de la restauration du client', error);
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

export default ClientDelAdmin;