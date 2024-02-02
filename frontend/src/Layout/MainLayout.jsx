import React, { useState, useEffect, useRef } from 'react';

import { Layout } from 'antd';

import { useCustomTheme } from '@/Utils/ThemeColor';

import HeaderContent from '@/Layout/Header/Header';
import Navigation from '@/Layout/SideBarDashboard/SideBarDashboard';
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import { Outlet } from 'react-router-dom';
const { Content, Footer } = Layout;

import { useSelector } from 'react-redux';
import useIsMobile from '@/hooks/useIsMobile';

export default function MainLayout() {

  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const isCollapsed = useSelector(state => state.SideBar.collapsed);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, [contentRef]);

  const isMobile = useIsMobile();

  const { colorBgContainer, boxShadow } = useCustomTheme(useSelector(state => state.theme.isDarkMode));

  return (
    <Layout style={{ minHeight: '100vh', background: colorBgContainer }} hasSider>

      <Navigation />

      <Layout className="site-layout" style={{
        marginLeft: isMobile ? '0' : (isCollapsed ? '80px' : '220px'),
        overflow: 'auto',
        height: '94vh',
        background: colorBgContainer,

      }}
      >
        <HeaderContent />
        <Breadcrumb />
        <Content className="site-layout" style={{ padding: '10px 20px', minHeight: 360, borderRadius: '8px', }}>
          <div className="contentmain" style={{ padding: 24, minHeight: "100%", textAlign: 'center', boxShadow: boxShadow, }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Footer style={{
        position: contentHeight > '100vh' ? 'relative' : 'fixed',
        bottom: contentHeight > '100vh' ? 'auto' : 0,
        background: colorBgContainer,
        boxShadow: boxShadow,
      }}>
        Mcj-dev Crm ©2023
      </Footer>
    </Layout>
  );
}
