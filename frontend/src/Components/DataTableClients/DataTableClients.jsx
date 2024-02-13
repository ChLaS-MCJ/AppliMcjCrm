import React, { useState, useEffect } from 'react';

import { Table, Input, Button, Space, Drawer, Divider, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import {
  SearchOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ShopOutlined,
  InfoCircleOutlined,
  BankOutlined,
  IdcardOutlined,
  HomeOutlined,
  RightOutlined,
  AppstoreAddOutlined,
  CloseOutlined
} from '@ant-design/icons';

import { useSelector } from 'react-redux';

import FormAddClients from '@/Forms/Clients/FormAddClients';
import FormUpdateLinkCompany from "@/Forms/Clients/FormUpdateLinkCompany";
import { ClientService } from '@/Services/Clients.service';

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

const DataTableClients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [addClientsDrawerVisible, setAddClientsDrawerVisible] = useState(false);
  const [updateCompanyFormVisible, setUpdateCompanyFormVisible] = useState(false);

  const isDarkMode = useSelector(state => state.theme.isDarkMode);

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
          dataIndex: ['ClientAdresse', 'client_adresse_adresse'],
          key: 'client_adresse_adresse',
          width: 150,
          ...getColumnSearchProps('ClientAdresse.client_adresse_adresse'),
        },
        {
          title: 'Complément',
          children: [
            {
              title: 'Pays',
              dataIndex: ['ClientAdresse', 'Country', 'nom_fr_fr'],
              key: 'pays',
              width: 100,
            },
            {
              title: 'Ville',
              dataIndex: ['ClientAdresse', 'client_adresse_ville'],
              key: 'ville',
              width: 100,
              ...getColumnSearchProps('ClientAdresse.client_adresse_ville'),
            },
            {
              title: 'Code Postal',
              dataIndex: ['ClientAdresse', 'client_adresse_codepostal'],
              key: 'codePostal',
              width: 100,
              ...getColumnSearchProps('ClientAdresse.client_adresse_codepostal'),
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
                  title: 'Pays',
                  dataIndex: ['Companies', [0], 'Country', 'nom_fr_fr'],
                  key: 'societePays',
                  width: 100,
                },
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
      title: 'Détails',
      dataIndex: 'details',
      key: 'details',
      width: 80,
      fixed: 'right',
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <a style={{ color: 'red' }} onClick={() => handleDetailsClick(record)}><MenuFoldOutlined /></a>
        </div>
      ),
    },
  ];

  const CloseIcon = ({ onClick }) => (
    <Button className="BtncloseFormUpdateLink" onClick={onClick} type="primary" icon={<CloseOutlined />} />
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await ClientService.GetAllClients();
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
      const result = await ClientService.GetAllClients();
      setData(result.data.map(item => ({ ...item, key: item.id })));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination.current, tableParams.pagination.pageSize, tableParams.filters, tableParams.order]);

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

  const handleToggleAddClientsDrawer = () => {
    setAddClientsDrawerVisible(!addClientsDrawerVisible);
  };

  const handleAddClientSuccess = () => {
    refreshData();
    setAddClientsDrawerVisible(false);
  };

  const handleUpdateCompanyClick = () => {
    setUpdateCompanyFormVisible(!updateCompanyFormVisible);
  };

  const handleUpdateClientLinkSuccess = () => {
    refreshData();
    setUpdateCompanyFormVisible(!updateCompanyFormVisible);
    setDrawerVisible(!updateCompanyFormVisible);
  };

  return (
    <div className='maincontainclients'>
      <Button type="dashed" className="btnAddcompany btn-orange" icon={<AppstoreAddOutlined />} onClick={handleToggleAddClientsDrawer}>
        Ajouter un Clients
      </Button>
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
      <Drawer
        title="Détails"
        width={600}
        placement="right"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className={isDarkMode ? 'dark-drawer' : 'light-drawer'}
      >
        {selectedRowData && (
          <div className='DrawerClientContainer'>

            <Breadcrumb
              style={{ paddingLeft: '20px' }}
              separator="/"
              items={[
                {
                  key: 'dashboardBread',
                  href: '/dashboard',
                  title: <HomeOutlined style={{ color: 'orange' }} />,
                },
                {
                  key: 'clientsBread',
                  href: '/clients',
                  title: "Client",
                },
                {
                  key: `client-${selectedRowData.key}-Bread`,
                  href: `/clients/${selectedRowData.key}`,
                  title: `${selectedRowData.clients_name} ${selectedRowData.clients_prenom}`,
                }
              ]}
            />

            <div className="Boxdrawerheadercontainer" >
              <Link to={`/clients/${selectedRowData.clients_name}`}>Vers la fiche cliente détaillée <RightOutlined /></Link>
            </div>

            <Divider />

            <h2> <UserOutlined /> Utilisateur</h2>
            <Space direction="vertical">
              <div className='containerinfodrawer'>
                <div>
                  <UserOutlined />
                  <strong>Nom:</strong> {selectedRowData.clients_name}
                </div>
                <div>
                  <UserOutlined />
                  <strong>Prénom:</strong> {selectedRowData.clients_prenom}
                </div>
                <div>
                  <IdcardOutlined />
                  <strong>Civilité:</strong> {selectedRowData.clients_civilite}
                </div>
                <div>
                  <PhoneOutlined />
                  <strong>Téléphone:</strong> {selectedRowData.clients_tel}
                </div>
                <div>
                  <MailOutlined />
                  <strong>Mail:</strong> {selectedRowData.clients_mail}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Rue:</strong> {selectedRowData.ClientAdresse.client_adresse_adresse}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Code Postal:</strong> {selectedRowData.ClientAdresse.client_adresse_codepostal}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Ville:</strong> {selectedRowData.ClientAdresse.client_adresse_ville}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Pays:</strong> {selectedRowData.ClientAdresse.Country.nom_fr_fr}
                </div>
              </div>
            </Space>

            <Divider />

            {updateCompanyFormVisible ? (
              <div>
                <CloseIcon onClick={handleUpdateCompanyClick} key={`BtnCloseFormFormUpdateLinkCompany-${selectedRowData.id}`} />
                <FormUpdateLinkCompany
                  key={`FormUpdateLinkCompany-${selectedRowData.id}`}
                  clientID={selectedRowData.id}
                  onFinish={handleUpdateCompanyClick} onSuccess={handleUpdateClientLinkSuccess}
                />
              </div>
            ) : (
              <div className='ContainerEntreprise'>
                <h2>
                  <ShopOutlined style={{ marginRight: '8px' }} /> Entreprise
                  {selectedRowData.Companies.length > 1 && (
                    <span style={{ marginLeft: '5px', color: '#1677ff' }}>
                      ({selectedRowData.Companies.length})
                    </span>
                  )}
                  <Button
                    className='ButtonLinkCompany'
                    type="primary"
                    onClick={handleUpdateCompanyClick}
                    icon={<AppstoreAddOutlined />}
                  >
                    Lier une entreprise
                  </Button>
                </h2>
                <Space direction="vertical">
                  <div className='containerinfodrawer'>
                    {selectedRowData.Companies.length > 0 ? (
                      <div>
                        <div>
                          <ShopOutlined />
                          <strong>Nom de l'entreprise:</strong> {selectedRowData.Companies[0].company_name}
                        </div>
                        <div>
                          <PhoneOutlined />
                          <strong>Téléphone de l'entreprise:</strong> {selectedRowData.Companies[0].company_telephone}
                        </div>
                        <div>
                          <InfoCircleOutlined />
                          <strong>N°Siret:</strong> {selectedRowData.Companies[0].company_num_siret}
                        </div>
                        <div>
                          <EnvironmentOutlined />
                          <strong>Rue de l'entreprise:</strong> {selectedRowData.Companies[0].CompanyAdresses[0].company_adresse}
                        </div>
                        <div>
                          <BankOutlined />
                          <strong>Pays de l'entreprise:</strong> {selectedRowData.Companies[0].Country.nom_fr_fr}
                        </div>
                        <div>
                          <EnvironmentOutlined />
                          <strong>Ville de l'entreprise:</strong> {selectedRowData.Companies[0].CompanyAdresses[0].company_ville}
                        </div>
                        <div>
                          <EnvironmentOutlined />
                          <strong>Code Postal de l'entreprise:</strong> {selectedRowData.Companies[0].CompanyAdresses[0].company_codepostal}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p>Aucune entreprise liée.</p>
                      </div>
                    )}
                  </div>
                </Space>
              </div>
            )}
          </div>
        )
        }
      </Drawer >

      <Drawer
        title="Ajouter un Client"
        width={600}
        placement="right"
        closable={true}
        onClose={() => setAddClientsDrawerVisible(false)}
        open={addClientsDrawerVisible}
        className={isDarkMode ? 'dark-drawer' : 'light-drawer'}
      >
        <FormAddClients key="FormAddClients" onFinish={handleToggleAddClientsDrawer} onSuccess={handleAddClientSuccess} />
      </Drawer>
    </div >
  );
};

export default DataTableClients;
