import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Drawer, Divider, message } from 'antd';

import {
    SearchOutlined,
    MenuFoldOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    ShopOutlined,
    InfoCircleOutlined,
    BankOutlined,
    EditOutlined,
    AppstoreAddOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

import { useSelector } from 'react-redux';
import FormUpdateAssociation from '@/Forms/Association/FormUpdateAssociation';
import FormAddAssociation from '@/Forms/Association/FormAddAssociation';

import { AssociationService } from '@/Services/Association.service';

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
            const nestedValue = dataIndexArray.reduce((obj, key) => (obj && obj[key]) || undefined, record);

            if (typeof nestedValue === 'string') {
                return nestedValue.toLowerCase().includes(value.toLowerCase());
            }

            return false;
        },
        render: (text) => text,
    };
}

const DataTableAssociation = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [drawerVisible, setDrawerVisible] = useState(false);
    const [addAssociationDrawerVisible, setAddAssociationDrawerVisible] = useState(false);

    const [selectedRowData, setSelectedRowData] = useState(null);

    const isDarkMode = useSelector(state => state.theme.isDarkMode);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 20,
        },
    });

    const handleDetailsClick = (record) => {
        setDrawerVisible(true);
        setSelectedRowData(record);
    };

    const handleDrawerClose = () => {
        setDrawerVisible(false);
        setShowForm(false);
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleAddAssociationSuccess = () => {
        refreshData();
        setDrawerVisible(false);
        setShowForm(false);
    };

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

    const handleToggleAddAssociationDrawer = () => {
        setAddAssociationDrawerVisible(!addAssociationDrawerVisible);
    };

    const handleDeleteAssociation = async (associationId) => {
        try {
            const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer l'association avec l'ID "${associationId}" ?`);
            if (!confirmDelete) return;

            await AssociationService.DeleteAssociation(associationId);
            message.success('Association supprimée avec succès!');
            setDrawerVisible(false);
            refreshData();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'association :', error);
            message.error('Erreur lors de la suppression de l\'association.');
        }
    };

    const fetchData = async () => {
        setLoading(true);

        try {
            const result = await AssociationService.GetAllAssociation();
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const refreshData = async () => {
        setLoading(true);

        try {
            const result = await AssociationService.GetAllAssociation();
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination.current, tableParams.pagination.pageSize, tableParams.filters, tableParams.order]);

    const columns = [
        {
            title: 'Association',
            children: [
                {
                    title: <span style={{ color: 'red' }}>Nom</span>,
                    dataIndex: 'association_name',
                    key: 'association_name',
                    width: 100,
                    fixed: 'left',
                    sorter: (a, b) => a.association_name.localeCompare(b.association_name),
                    ...getColumnSearchProps('association_name'),
                },
                {
                    title: 'Téléphone',
                    dataIndex: 'association_telephone',
                    key: 'association_telephone',
                    width: 100,
                },
                {
                    title: 'N°Siret',
                    dataIndex: 'association_num_siret',
                    key: 'association_num_siret',
                    width: 100,
                },
                {
                    title: 'CodeNaf',
                    dataIndex: 'code_naf',
                    key: 'code_naf',
                    width: 100,
                },
                {
                    title: 'CodeRna',
                    dataIndex: 'code_rna',
                    key: 'code_rna',
                    width: 100,
                },
                {
                    title: 'Adresse',
                    children: [
                        {
                            title: 'Rue',
                            dataIndex: ['AssociationAdresse', 'association_adresse'],
                            key: 'Rue',
                            width: 150,
                            ...getColumnSearchProps('AssociationAdresse.association_adresse'),
                        },
                        {
                            title: 'Complément',
                            children: [
                                {
                                    title: 'Pays',
                                    dataIndex: ['country', 'nom_fr_fr'],
                                    key: 'Pays',
                                    width: 100,
                                },
                                {
                                    title: 'Ville',
                                    dataIndex: ['AssociationAdresse', 'association_ville'],
                                    key: 'Ville',
                                    width: 100,
                                    ...getColumnSearchProps('AssociationAdresse.association_ville'),
                                },
                                {
                                    title: 'Code Postal',
                                    dataIndex: ['AssociationAdresse', 'association_codepostal'],
                                    key: 'Code Postal',
                                    width: 100,
                                    ...getColumnSearchProps('AssociationAdresse.association_codepostal'),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            title: 'Détails',
            dataIndex: 'details',
            key: 'details',
            width: 80,
            fixed: 'right',
            render: (_, record) => (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <a style={{ color: '#f4a54b' }} onClick={() => handleDetailsClick(record)}><MenuFoldOutlined /></a>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Button type="dashed" className="btnAddcompany btn-orange" icon={<AppstoreAddOutlined />} onClick={handleToggleAddAssociationDrawer}>
                Ajouter une association
            </Button>

            <Table
                columns={columns}
                dataSource={data.map((record, index) => ({ ...record, key: index }))}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                bordered
                size="small"
                scroll={{ x: '100%', y: 430 }}
                className="tablecompany"
            />
            <Drawer
                title="Détails"
                width={600}
                placement="right"
                closable={true}
                onClose={handleDrawerClose}
                open={drawerVisible}
                className={isDarkMode ? 'dark-drawer' : 'light-drawer'}
            >
                {selectedRowData && (
                    <div className='DrawerClientContainer'>
                        <Button
                            type="primary" danger
                            className="btnsuppcompany"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteAssociation(selectedRowData.id)}
                        >
                            Supprimer l'association
                        </Button>

                        <h2>
                            Identité de l'Association
                            <Button
                                className={`btnupdatecompany ${showForm ? "btn-danger" : "btn-primary"}`}
                                icon={<EditOutlined />}
                                onClick={handleToggleForm}
                            >
                                {showForm ? "Fermer le formulaire" : "Modifier l'association"}
                            </Button>
                        </h2>
                        <Space direction="vertical">
                            <div className='containerinfodrawer'>
                                <div>
                                    <ShopOutlined />
                                    <strong>Nom :</strong> {selectedRowData.association_name}
                                </div>
                                <div>
                                    <PhoneOutlined />
                                    <strong>Téléphone :</strong> {selectedRowData.association_telephone}
                                </div>
                                <div>
                                    <InfoCircleOutlined />
                                    <strong>N°Siret :</strong> {selectedRowData.association_num_siret}
                                </div>
                                <div>
                                    <InfoCircleOutlined />
                                    <strong>CodeNaf :</strong> {selectedRowData.code_naf}
                                </div>
                                <div>
                                    <InfoCircleOutlined />
                                    <strong>CodeRna :</strong> {selectedRowData.code_rna}
                                </div>
                            </div>
                        </Space>

                        <Divider />

                        <h2>Adresse de l'Association</h2>
                        <Space direction="vertical">
                            <div className='containerinfodrawer'>
                                <div>
                                    <EnvironmentOutlined />
                                    <strong>Rue :</strong> {selectedRowData.AssociationAdresse.association_adresse}
                                </div>
                                <div>
                                    <BankOutlined />
                                    <strong>Pays :</strong> {selectedRowData.country.nom_fr_fr}
                                </div>
                                <div>
                                    <EnvironmentOutlined />
                                    <strong>Ville :</strong> {selectedRowData.AssociationAdresse.association_ville}
                                </div>
                                <div>
                                    <EnvironmentOutlined />
                                    <strong>Code Postal :</strong> {selectedRowData.AssociationAdresse.association_codepostal}
                                </div>

                                {showForm && (
                                    <div className='ContainerAssociationForm'>
                                        <FormUpdateAssociation initialAssociationData={selectedRowData} onSuccess={handleAddAssociationSuccess} />
                                    </div>
                                )}
                            </div>
                        </Space>
                    </div>
                )}
            </Drawer>

            <Drawer
                title="Ajouter une association"
                width={600}
                placement="right"
                closable={true}
                onClose={() => setAddAssociationDrawerVisible(false)}
                open={addAssociationDrawerVisible}
                className={isDarkMode ? 'dark-drawer' : 'light-drawer'}
            >
                <FormAddAssociation onFinish={handleToggleAddAssociationDrawer} onSuccess={handleAddAssociationSuccess} />
            </Drawer>
        </div>
    );
};

export default DataTableAssociation;
