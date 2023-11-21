import React from 'react';
import { Layout, Row, Col } from 'antd';
/**
 * Renders a layout with two columns. The first column is hidden on small screens and displays the `sideContent` prop,
 * while the second column takes up the full width on small screens and displays the `children` prop.
 * @param {Object} props - The component props.
 * @param {React.Element} props.sideContent - The content to be displayed in the first column of the layout.
 * @param {React.Element} props.children - The content to be displayed in the second column of the layout.
 * @returns {React.Element} The rendered layout.
 */
export default function AuthLayout({ sideContent, children }) {
  return (
    <Layout>
      <Row>
        <Col
          xs={0}
          sm={0}
          md={11}
          lg={12}
          style={{
            minHeight: '100vh',
          }}
        >
          {sideContent}
        </Col>
        <Col
          xs={24}
          sm={24}
          md={13}
          lg={12}
          style={{ background: '#FFF', minHeight: '100vh' }}
        >
          {children}
        </Col>
      </Row>
    </Layout>
  );
}
