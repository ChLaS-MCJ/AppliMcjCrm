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
import FormUpdateCompany from '@/Forms/Company/FormUpdateCompany';
import FormAddCompany from '@/Forms/Company/FormAddCompany';

import { CompanyService } from '@/Services/Company.service';

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

const DataTableCompany = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [addCompanyDrawerVisible, setAddCompanyDrawerVisible] = useState(false);

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

  const handleAddCompanySuccess = () => {
    refreshData();
    setDrawerVisible(false);
    setShowForm(false);
  };

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

  const handleToggleAddCompanyDrawer = () => {
    setAddCompanyDrawerVisible(!addCompanyDrawerVisible);
  };

  const handleDeleteCompany = async (companyId) => {
    try {
      const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer l'entreprise avec l'ID "${companyId}" ?`);
      if (!confirmDelete) return;

      await CompanyService.DeleteCompany(companyId);
      message.success('Entreprise supprimée avec succès!');
      setDrawerVisible(false);
      refreshData();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'entreprise :', error);
      message.error('Erreur lors de la suppression de l\'entreprise.');
    }
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const result = await CompanyService.GetAllCompany();
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
      const result = await CompanyService.GetAllCompany();
      setData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

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
              ...getColumnSearchProps('CompanyAdresses'),
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
                  ...getColumnSearchProps('societeVille'),
                },
                {
                  title: 'Code Postal',
                  dataIndex: ['CompanyAdresses', 0, 'company_codepostal'],
                  key: 'Code Postal',
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
          <a style={{ color: '#f4a54b' }} onClick={() => handleDetailsClick(record)}><MenuFoldOutlined /></a>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button type="dashed" className="btnAddcompany btn-orange" icon={<AppstoreAddOutlined />} onClick={handleToggleAddCompanyDrawer}>
        Ajouter une entreprise
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
              onClick={() => handleDeleteCompany(selectedRowData.id)}
            >
              Supprimer l'entreprise
            </Button>

            <h2>
              Identité de l'Entreprise
              <Button
                className={`btnupdatecompany ${showForm ? "btn-danger" : "btn-primary"}`}
                icon={<EditOutlined />}
                onClick={handleToggleForm}
              >
                {showForm ? "Fermer le formulaire" : "Modifier l'entreprise"}
              </Button>
            </h2>
            <Space direction="vertical">
              <div className='containerinfodrawer'>
                <div>
                  <ShopOutlined />
                  <strong>Nom :</strong> {selectedRowData.company_name}
                </div>
                <div>
                  <PhoneOutlined />
                  <strong>Téléphone :</strong> {selectedRowData.company_telephone}
                </div>
                <div>
                  <InfoCircleOutlined />
                  <strong>N°Siret :</strong> {selectedRowData.company_num_siret}
                </div>
                <div>
                  <InfoCircleOutlined />
                  <strong>CodeNaf :</strong> {selectedRowData.code_naf}
                </div>
              </div>
            </Space>

            <Divider />

            <h2>Adresse de l'Entreprise</h2>
            <Space direction="vertical">
              <div className='containerinfodrawer'>
                <div>
                  <EnvironmentOutlined />
                  <strong>Rue :</strong> {selectedRowData.CompanyAdresses[0].company_adresse}
                </div>
                <div>
                  <BankOutlined />
                  <strong>Pays :</strong> {selectedRowData.Country.nom_fr_fr}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Ville :</strong> {selectedRowData.CompanyAdresses[0].company_ville}
                </div>
                <div>
                  <EnvironmentOutlined />
                  <strong>Code Postal :</strong> {selectedRowData.CompanyAdresses[0].company_codepostal}
                </div>

                {showForm && (
                  <div className='ContainerCompanyForm'>
                    <FormUpdateCompany initialCompanyData={selectedRowData} onSuccess={handleAddCompanySuccess} />
                  </div>
                )}
              </div>
            </Space>

          </div>
        )
        }
      </Drawer >

      <Drawer
        title="Ajouter une entreprise"
        width={600}
        placement="right"
        closable={true}
        onClose={() => setAddCompanyDrawerVisible(false)}
        open={addCompanyDrawerVisible}
        className={isDarkMode ? 'dark-drawer' : 'light-drawer'}
      >
        <FormAddCompany onFinish={handleToggleAddCompanyDrawer} onSuccess={handleAddCompanySuccess} />
      </Drawer>
    </div >
  );
};

export default DataTableCompany;
