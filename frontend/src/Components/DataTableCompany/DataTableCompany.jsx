import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Table, Input, Button, Space, Drawer, Divider } from 'antd';

import {
  SearchOutlined,
  MenuFoldOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ShopOutlined,
  InfoCircleOutlined,
  BankOutlined,
} from '@ant-design/icons';

import { useSelector } from 'react-redux';
import FormUpdateCompany from '@/Forms/FormUpdateCompany';
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

const DataTableCompany = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

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

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const fetchData = () => {
    setLoading(true);

    fetch(`https://randomuser.me/api?${qs.stringify(getRandomUserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        const formattedData = results.map((user, index) => ({
          key: index,
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
            total: 50, // Remplacez cela par le total réel des données sur le serveur
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

            <h2>Identité de l'Entreprise</h2>
            <Space direction="vertical">
              <div className='containerinfodrawer'>
                <div>
                  <ShopOutlined />
                  <strong>Nom :</strong> {selectedRowData.societeNom}
                </div>
                <div>
                  <PhoneOutlined />
                  <strong>Téléphone :</strong> {selectedRowData.societeTel}
                </div>
                <div>
                  <InfoCircleOutlined />
                  <strong>N°Siret :</strong> {selectedRowData.numSiret}
                </div>
              </div>
            </Space>

            <Divider />

            <h2>Adresse de l'Entreprise</h2>
            <Space direction="vertical">
              <div className='containerinfodrawer'>
                <div>
                  <EnvironmentOutlined />
                  <strong>Rue :</strong> {selectedRowData.societeRue}
                </div>
                <div>
                  <BankOutlined />
                  <strong>Pays :</strong> {selectedRowData.societePays}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Ville :</strong> {selectedRowData.societeVille}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Code Postal :</strong> {selectedRowData.societeCodePostal}
                </div>
                <Button type="primary" onClick={handleToggleForm}>
                  Modifier l'entreprise
                </Button>
                {showForm && (
                  <div>
                    <FormUpdateCompany />
                  </div>
                )}
              </div>
            </Space>
          </div>
        )
        }
      </Drawer >
    </div >
  );
};

export default DataTableCompany;
