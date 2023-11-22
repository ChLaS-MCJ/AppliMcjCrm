import React, { useState } from 'react';

import { Layout, theme, Button } from 'antd';

import HeaderContent from '@/Layout/Header/Header';
import Navigation from '@/Layout/SideBarDashboard/SideBarDashboard';
const { Content, Footer, Sider } = Layout;
import useIsMobile from '@/hooks/useIsMobile';
export default function Dashboard() {

  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  console.log(isMobile)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>

      <Navigation />

      <Layout className="site-layout" style={{
        marginLeft: 220, overflow: 'auto',
        height: '90vh',
      }}>
        <HeaderContent />
        <Content style={{ margin: '25px auto 15px', overflow: 'initial', width: '100%', padding: '0 0px', maxWidth: 1200, }}>

          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer, }}>
            <p>content</p>
          </div>

        </Content>
        <Footer style={{ textAlign: 'center', zIndex: 1000 }}>Mcj-dev Crm ©2023</Footer>
      </Layout>

    </Layout>

  );
}
