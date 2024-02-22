import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Drawer, Divider, Image } from 'antd';

import {
    SearchOutlined,
    MenuFoldOutlined,
    PhoneOutlined,
    CloudOutlined,
    UserOutlined,
    InfoCircleOutlined,

} from '@ant-design/icons';

import { useSelector } from 'react-redux';

import { UsersService } from '@/Services/Users.service';

import UpdateProfilAdmin from '@/Forms/Users/FormUpdateProfilAdmin';

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

const DataTableEmploye = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [FormUpdateAdmin, setFormUpdateAdmin] = useState(false);

    const [selectedRowData, setSelectedRowData] = useState(null);

    const isDarkMode = useSelector(state => state.theme.isDarkMode);
    const userRole = useSelector(state => state.UserStore.role_id);

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
            const result = await UsersService.getAllUser();
            setData(result.data);
            console.log(result)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const refreshData = async () => {
        setLoading(true);

        try {
            const result = await UsersService.getAllUser();
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

    const handleDrawerClose = () => {
        setDrawerVisible(false);
        setFormUpdateAdmin(false);
    };

    const handleOpenForm = () => {
        setFormUpdateAdmin(!FormUpdateAdmin);
    };

    const columns = [
        {
            title: 'Utilisateur',
            children: [
                {
                    title: <span style={{ color: 'red' }}>Nom</span>,
                    dataIndex: 'nom',
                    key: 'nom',
                    width: 100,
                    sorter: (a, b) => a.nom.localeCompare(b.nom),
                    ...getColumnSearchProps('nom'),
                },
                {
                    title: 'Prenom',
                    dataIndex: 'prenom',
                    key: 'prenom',
                    width: 100,
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                    width: 100,
                },
                {
                    title: 'Rôle',
                    dataIndex: ['Role', 'name_roles'],
                    key: 'Role',
                    width: 100,
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

                    <div className='DrawerEmployeContainer'>
                        <Image
                            width={200}
                            src={selectedRowData.image}
                            className='ImgEmployee'
                        />
                        <h2>
                            Identité de l'Employé
                        </h2>
                        <Space direction="vertical">
                            <div className='containerEmployeinfodrawer'>

                                <div>
                                    <InfoCircleOutlined />
                                    <strong>Nom : </strong> {selectedRowData.prenom}
                                </div>
                                <div>
                                    <InfoCircleOutlined />
                                    <strong>Prénom : </strong> {selectedRowData.prenom}
                                </div>
                                <div>
                                    <PhoneOutlined />
                                    <strong>Téléphone : </strong> {selectedRowData.phone}
                                </div>
                                <div>
                                    <UserOutlined />
                                    <strong>Genre : </strong> {selectedRowData.genre}
                                </div>
                                <div>
                                    <UserOutlined />
                                    <strong>Pseudo : </strong> {selectedRowData.pseudo}
                                </div>
                                <div>
                                    <CloudOutlined />
                                    <strong>Description : </strong> {selectedRowData.description}
                                </div>
                                <div>
                                    <InfoCircleOutlined />
                                    <strong>Adresse : </strong> {selectedRowData.adresse}
                                </div>
                                <div>
                                    <CloudOutlined />
                                    <strong>Rôle : </strong> <span style={{ color: 'red' }}>{selectedRowData.Role && selectedRowData.Role.name_roles && (selectedRowData.Role.name_roles)}</span>
                                </div>
                            </div>
                        </Space>

                        <Divider />

                        {userRole && userRole === 1 && (
                            <div className='containerFormAdmin'>
                                <Button type="primary" onClick={() => handleOpenForm()}>
                                    {FormUpdateAdmin ? "Fermer le formulaire" : "Mettre à jour l'utilisateur"}
                                </Button>

                                {FormUpdateAdmin && (
                                    <UpdateProfilAdmin initialUpdateProfilData={selectedRowData} onSuccess={handleDrawerClose} refreshData={refreshData} />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Drawer>

        </div>
    );
};

export default DataTableEmploye;
