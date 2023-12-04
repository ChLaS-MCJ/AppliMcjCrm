import React from 'react';
import { Layout } from 'antd';
import { useCustomTheme } from '@/Utils/ThemeColor';
const { Footer } = Layout;

/**
 * Represents the footer content of a web page.
 * @returns {JSX.Element} The JSX element representing the footer content.
 */
export default function FooterContent({ themeType }) {

  const { colorBgContainer, boxShadow } = useCustomTheme(themeType);

  return (
    <Layout.Footer style={{ textAlign: 'center', background: colorBgContainer, boxShadow: boxShadow }}>Mcj-Dev ©2023 Created by Mcj-Dev</Layout.Footer>
  )

}

