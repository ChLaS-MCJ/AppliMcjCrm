import React, { useState, useEffect, useRef } from 'react';

import { Layout, theme } from 'antd';

import HeaderContent from '@/Layout/Header/Header';
import Navigation from '@/Layout/SideBarDashboard/SideBarDashboard';
const { Content, Footer } = Layout;

import { useSelector } from 'react-redux';
import useIsMobile from '@/hooks/useIsMobile';
export default function Dashboard() {

  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const isCollapsed = useSelector(state => state.SideBar.collapsed);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, [contentRef]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const isMobile = useIsMobile();

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>

      <Navigation />

      <Layout className="site-layout" style={{
        marginLeft: isMobile ? '0' : (isCollapsed ? '80px' : '220px'),
        overflow: 'auto',
        height: '90vh',
      }}>
        <HeaderContent />
        <Content className="site-layout" style={{ padding: '10px 20px', minHeight: 360, borderRadius: '8px', }}>

          <div className="contentmain" style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
            <p>long content</p>
            {
              // indicates very long content
              Array.from({ length: 34 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? 'more' : '...'}
                  <br />
                </React.Fragment>
              ))
            }
          </div>

        </Content>

      </Layout>
      <Footer style={{
        position: contentHeight > '100vh' ? 'relative' : 'fixed',
        bottom: contentHeight > '100vh' ? 'auto' : 0,
      }}>
        Mcj-dev Crm ©2023
      </Footer>
    </Layout>

  );
}
