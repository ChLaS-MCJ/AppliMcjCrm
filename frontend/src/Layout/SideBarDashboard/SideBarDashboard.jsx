
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useCustomTheme } from '@/Utils/ThemeColor';

import logoIcon from '@/Assets/images/JustLogo.png';
import logoIconMobile from '@/Assets/images/logo-icon.png';
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  MenuOutlined,
  UserAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  IdcardOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { sideBarReducer } from '@/Redux/SideBar/Reducer';

const { Sider } = Layout;

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
  const { boxShadow } = useCustomTheme(useSelector(state => state.theme.isDarkMode));
  return (
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={onClick}
      style={{
        fontSize: '16px',
        width: '100%',
        position: 'absolute',
        boxShadow: boxShadow,
        borderRadius: '0',
        bottom: 0,
        height: 64,
      }}
    />
  );
}
function Sidebar({ collapsible, collapsed, onCollapse }) {
  const { colorBgContainer, boxShadow } = useCustomTheme(useSelector(state => state.theme.isDarkMode));
  const userRole = useSelector(state => state.UserStore.role_id);

  const items = [
    {
      key: 'Dashboard',
      icon: <DashboardOutlined />,
      label: <Link to={'/dashboard'}>Dashboard</Link>,
    },
    {
      key: 'clients',
      icon: <UserAddOutlined />,
      label: <Link to={'/clients'}>Clients</Link>,
    },
    {
      key: 'compagny',
      icon: <IdcardOutlined />,
      label: <Link to={'/compagny'}>Entreprises</Link>,
    },
    {
      key: 'association',
      icon: <ReconciliationOutlined />,
      label: <Link to={'/association'}>Associations</Link>,
    },
    {
      key: 'Employe',
      icon: <UserOutlined />,
      label: <Link to={'/employe'}>Employé</Link>,
    },

    userRole === 1 && {
      key: 'admin',
      icon: <TeamOutlined />,
      label: <Link to={'/admin'}>admin</Link>,
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible={collapsible}
      collapsed={collapsed}
      className="navigation"
      style={{
        overflow: 'auto',
        width: collapsed ? 'auto' : '400px',
        height: collapsed ? '100vh' : '95vh',
        position: 'fixed',
        left: collapsed ? '0' : '20px',
        top: collapsed ? '0' : '30px',
        bottom: collapsed ? '0' : '20px',
        borderRadius: '8px',
        boxShadow: boxShadow,
        background: colorBgContainer
      }}
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
  const { colorBgContainer, boxShadow } = useCustomTheme(useSelector(state => state.theme.isDarkMode));


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
        <Sidebar collapsible={true} collapsed={collapsed} onCollapse={toggleSidebar} style={{ background: colorBgContainer, boxShadow: boxShadow, }} />
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
