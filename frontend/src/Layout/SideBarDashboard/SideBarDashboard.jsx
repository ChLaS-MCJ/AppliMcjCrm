
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import logoIcon from '@/Assets/images/JustLogo.png';
import logoIconMobile from '@/Assets/images/logo-icon.png';
import {
  CustomerServiceOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  MenuOutlined,
  CreditCardOutlined,
  UserAddOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { sideBarReducer } from '@/Redux/SideBar/Reducer'; // Assurez-vous d'avoir le bon chemin

const { Sider } = Layout;

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
function Logo({ collapsed, onClick }) {
  const logoSrc = collapsed ? logoIconMobile : logoIcon;
  const logoStyle = { height: collapsed ? '80%' : '100%' };

  return (
    <div className="logo" onClick={onClick}>
      <img src={logoSrc} alt="Logo" style={logoStyle} />
    </div>
  );
}
function SidebarContent({ items }) {
  return (
    <>
      <Menu items={items} mode="inline" theme="light" />
    </>
  );
}
function SidebarButton({ collapsed, onClick }) {
  return (
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={onClick}
      style={{
        fontSize: '16px',
        width: '100%',
        position: 'absolute',
        boxShadow: '0px 0px 20px 3px rgb(150, 190, 238, 0.15)',
        borderRadius: '0',
        bottom: 0,
        height: 64,
      }}
    />
  );
}
function Sidebar({ collapsible, collapsed, onCollapse }) {
  return (
    <Sider
      trigger={null}
      collapsible={collapsible}
      collapsed={collapsed}
      className="navigation"
      style={{
        overflow: 'auto',
        width: collapsed ? 'auto' : '400px',
        height: collapsed ? '100vh' : '90vh',
        position: 'fixed',
        left: collapsed ? '0' : '20px',
        top: collapsed ? '0' : '50px',
        bottom: collapsed ? '0' : '20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 20px 3px rgb(150, 190, 238, 0.15)',
      }}
      theme="light"
    >
      <Logo collapsed={collapsed} onClick={() => onCollapse(!collapsed)} />
      <SidebarContent items={items} />
      <SidebarButton collapsed={collapsed} onClick={() => onCollapse(!collapsed)} />
    </Sider>
  );
}
function MobileSidebar({ visible, onClose }) {
  return (
    <Drawer
      width={200}
      placement="left"
      closable={false}
      onClose={onClose}
      open={visible}
      rootClassName="mobile-sidebar-wraper"
    >
      <Sidebar collapsible={false} collapsed={false} onCollapse={() => onClose()} />
    </Drawer>
  );
}

export default function Navigation() {
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(true);
  let location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const dispatch = useDispatch();
  const collapsed = useSelector(state => state.SideBar.collapsed);

  useEffect(() => {
    if (location && currentPath !== location.pathname) setCurrentPath(location.pathname);
  }, [location, currentPath]);

  const toggleSidebar = () => {
    dispatch(sideBarReducer.actions.setCollapsed(!collapsed));
  };
  const showMobileSidebar = () => setMobileSidebarVisible(true);
  const hideMobileSidebar = () => setMobileSidebarVisible(false);

  return (
    <>
      <div className="sidebar-wraper">
        <Sidebar collapsible={true} collapsed={collapsed} onCollapse={toggleSidebar} />
      </div>
      <Button
        type="text"
        size="large"
        onClick={showMobileSidebar}
        className="mobile-sidebar-btn"
        style={{ marginLeft: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <MobileSidebar visible={mobileSidebarVisible} onClose={hideMobileSidebar} />
    </>
  );
}
