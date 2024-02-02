import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Table, Input, Button, Space, Drawer, Divider, Breadcrumb, Typography } from 'antd';
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
  SwapRightOutlined
} from '@ant-design/icons';

import { useSelector } from 'react-redux';

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
    onFilter: (value, record) => record[dataIndex].toLowerCase().includes(value.toLowerCase()),
    render: (text) => text,
  };
}

const getRandomUserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [drawerVisible, setDrawerVisible] = useState(false);
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

  const fetchData = () => {
    setLoading(true);

    fetch(`https://randomuser.me/api?${qs.stringify(getRandomUserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        const formattedData = results.map((user, index) => ({
          key: index,
          lastName: user.name.last,
          firstName: user.name.first,
          civilite: user.gender,
          phone: user.phone,
          mail: user.email,
          rue: user.location.street.name,
          pays: user.location.country,
          ville: user.location.city,
          codePostal: user.location.postcode,
          societeNom: "name",
          societeTel: user.phone,
          numSiret: user.login.uuid,
          societeRue: user.location.street.name,
          societePays: user.location.country,
          societeVille: user.location.city,
          societeCodePostal: user.location.postcode,
        }));

        setData(formattedData);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200, // Remplacez cela par le total réel des données sur le serveur
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const columns = [
    {
      title: 'Clients',
      children: [
        {
          title: <span style={{ color: 'red' }}>Nom</span>,
          dataIndex: 'lastName',
          key: 'lastName',
          width: 130,
          fixed: 'left',
          sorter: (a, b) => a.lastName.localeCompare(b.lastName),
          ...getColumnSearchProps('lastName'),
        },
        {
          title: 'Prénom',
          dataIndex: 'firstName',
          key: 'firstName',
          width: 100,
          sorter: (a, b) => a.firstName.localeCompare(b.firstName),
        },
        {
          title: 'Civilité',
          dataIndex: 'civilite',
          key: 'civilite',
          width: 100,
          sorter: (a, b) => a.civilite.localeCompare(b.civilite),
          ...getColumnSearchProps('civilite'),
        },
        {
          title: 'Téléphone',
          dataIndex: 'phone',
          key: 'phone',
          width: 150,
          ...getColumnSearchProps('phone'),
        },
        {
          title: 'Mail',
          dataIndex: 'mail',
          key: 'mail',
          width: 150,
          sorter: (a, b) => a.mail.localeCompare(b.mail),
          ...getColumnSearchProps('mail'),
        },
      ],
    },
    {
      title: 'Adresse',
      children: [
        {
          title: 'Rue',
          dataIndex: 'rue',
          key: 'rue',
          width: 150,
          ...getColumnSearchProps('rue'),
        },
        {
          title: 'Complément',
          children: [
            {
              title: 'Pays',
              dataIndex: 'pays',
              key: 'pays',
              width: 100,
            },
            {
              title: 'Ville',
              dataIndex: 'ville',
              key: 'ville',
              width: 100,
              ...getColumnSearchProps('ville'),
            },
            {
              title: 'Code Postal',
              dataIndex: 'codePostal',
              key: 'codePostal',
              width: 100,
              ...getColumnSearchProps('codePostal'),
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
          dataIndex: 'societeNom',
          key: 'societeNom',
          width: 100,
          ...getColumnSearchProps('societeNom'),
        },
        {
          title: 'Téléphone',
          dataIndex: 'societeTel',
          key: 'societeTel',
          width: 100,
        },
        {
          title: 'N°Siret',
          dataIndex: 'numSiret',
          key: 'numSiret',
          width: 100,
        },
        {
          title: 'Adresse',
          children: [
            {
              title: 'Rue',
              dataIndex: 'societeRue',
              key: 'societeRue',
              width: 150,
              ...getColumnSearchProps('societeRue'),
            },
            {
              title: 'Complément',
              children: [
                {
                  title: 'Pays',
                  dataIndex: 'societePays',
                  key: 'societePays',
                  width: 100,
                },
                {
                  title: 'Ville',
                  dataIndex: 'societeVille',
                  key: 'societeVille',
                  width: 100,
                  ...getColumnSearchProps('societeVille'),
                },
                {
                  title: 'Code Postal',
                  dataIndex: 'societeCodePostal',
                  key: 'societeCodePostal',
                  width: 100,
                  ...getColumnSearchProps('societeCodePostal'),
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

  console.log(selectedRowData)
  return (
    <div>
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
                  href: '/dashboard',
                  title: <HomeOutlined style={{ color: 'orange' }} />,
                },
                {
                  href: '/clients',
                  title: "Client",
                },
                {
                  href: `/clients/${selectedRowData.key}`,
                  title: selectedRowData.lastName + " " + selectedRowData.firstName,
                }

              ]}
            />


            <div className="Boxdrawerheadercontainer" >
              <Link to={`/clients/${selectedRowData.key}`}>Vers la fiche cliente détaillée <RightOutlined /></Link>
            </div>


            <Divider />

            <h2> <UserOutlined /> Utilisateur</h2>
            <Space direction="vertical">
              <div className='containerinfodrawer'>

                <div>
                  <UserOutlined />
                  <strong>Nom:</strong> {selectedRowData.lastName}
                </div>
                <div>
                  <UserOutlined />
                  <strong>Prénom:</strong> {selectedRowData.firstName}
                </div>
                <div>
                  <IdcardOutlined />
                  <strong>Civilité:</strong> {selectedRowData.civilite}
                </div>
                <div>
                  <PhoneOutlined />
                  <strong>Téléphone:</strong> {selectedRowData.phone}
                </div>
                <div>
                  <MailOutlined />
                  <strong>Mail:</strong> {selectedRowData.mail}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Rue:</strong> {selectedRowData.rue}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Code Postal:</strong> {selectedRowData.codePostal}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Ville:</strong> {selectedRowData.ville}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Pays:</strong> {selectedRowData.pays}
                </div>
              </div>
            </Space>

            <Divider />

            <h2><ShopOutlined style={{ marginRight: '8px' }} /> Entreprise</h2>
            <Space direction="vertical">
              <div className='containerinfodrawer'>
                <div>
                  <ShopOutlined />
                  <strong>Nom de l'entreprise:</strong> {selectedRowData.societeNom}
                </div>
                <div>
                  <PhoneOutlined />
                  <strong>Téléphone de l'entreprise:</strong> {selectedRowData.societeTel}
                </div>
                <div>
                  <InfoCircleOutlined />
                  <strong>N°Siret:</strong> {selectedRowData.numSiret}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Rue de l'entreprise:</strong> {selectedRowData.societeRue}
                </div>
                <div>
                  <BankOutlined />
                  <strong>Pays de l'entreprise:</strong> {selectedRowData.societePays}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Ville de l'entreprise:</strong> {selectedRowData.societeVille}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Code Postal de l'entreprise:</strong> {selectedRowData.societeCodePostal}
                </div>
              </div>
            </Space>
          </div>
        )
        }
      </Drawer >
    </div >
  );
};

export default DataTable;
