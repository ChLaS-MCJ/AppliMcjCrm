import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import logoIcon from '@/Assets/images/JustLogo.png';
import { useNavigate } from 'react-router-dom';

import {
  CustomerServiceOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
  UserAddOutlined,
  FileOutlined,
} from '@ant-design/icons';

import "@/Assets/style/Layout/Header.css"
const { Sider } = Layout;

export default function Navigation() {
  return (
    <>
      <div className="sidebar-wraper">
        <Sidebar collapsible={false} />
      </div>
      <MobileSidebar />
    </>
  );
}

function Sidebar({ collapsible }) {
  let location = useLocation();

  const [currentPath, setCurrentPath] = useState(location.pathname);

  const navigate = useNavigate();

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to={'/dashboard'}>dashboard</Link>,
    },
    {
      key: 'lead',
      icon: <UserAddOutlined />,
      label: <Link to={'/lead'}>lead</Link>,
    },
    {
      key: 'offer',
      icon: <FileOutlined />,
      label: <Link to={'/offer'}>offer</Link>,
    },
    {
      key: 'customer',
      icon: <CustomerServiceOutlined />,
      label: <Link to={'/customer'}>customer</Link>,
    },
    {
      key: 'invoice',
      icon: <FileTextOutlined />,
      label: <Link to={'/invoice'}>invoice</Link>,
    },
    {
      key: 'quote',
      icon: <FileSyncOutlined />,
      label: <Link to={'/quote'}>quote</Link>,
    },
    {
      key: 'payment',
      icon: <CreditCardOutlined />,
      label: <Link to={'/payment'}>payment</Link>,
    },
    {
      key: 'employee',
      icon: <UserOutlined />,
      label: <Link to={'/employee'}>employee</Link>,
    },
    {
      key: 'admin',
      icon: <TeamOutlined />,
      label: <Link to={'/admin'}>admin</Link>,
    },

  ];

  useEffect(() => {
    if (location) if (currentPath !== location.pathname) setCurrentPath(location.pathname);
  }, [location, currentPath]);

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible}
      className="navigation"
      style={{
        overflow: 'auto',
        height: '90vh',
        position: 'fixed',
        left: '20px',
        top: '50px',
        bottom: '20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 20px 3px rgba(150, 190, 238, 0.15)',
      }}
      theme={'light'}
    >
      <div className="logo" onClick={() => navigate('/')} >
        <img src={logoIcon} alt="Logo" style={{ height: '100%' }} />

      </div>
      <Menu items={items} mode="inline" theme={'light'} />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ marginLeft: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={200}
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
        rootClassName="mobile-sidebar-wraper"
      >
        <Sidebar collapsible={false} />
      </Drawer>
    </>
  );
}
