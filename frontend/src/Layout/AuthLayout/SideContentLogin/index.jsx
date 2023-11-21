import React from 'react';
import { Space, Layout, Divider } from 'antd';
import { Typography } from 'antd';

import logo from '@/Assets/images/logo.png';
import logo1 from '@/Assets/images/logo1.png';
import logo2 from '@/Assets/images/logo2.png';
import logo3 from '@/Assets/images/logo3.png';
import logo4 from '@/Assets/images/logo4.png';

const { Content } = Layout;
const { Title, Text } = Typography;

/**
 * Renders a side content section with a title, features, and logos.
 * @returns {JSX.Element} The rendered side content.
 */
export default function SideContent() {
  return (
    <Content className="sideContent" style={{ padding: '150px 30px 30px', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ width: '100%' }}>
        <img src={logo} alt="Logo" style={{ margin: '0 auto 40px', display: 'block' }} />
        <div className="space40"></div>
        <Title level={3}>Gérez votre entreprise avec :</Title>
        <div className="space20"></div>
        <ul className="list-checked">
          <li className="list-checked-item">
            <Space direction="vertical">
              <Text strong>Outil tout-en-un</Text>
              <Text>Élaborez, administrez vos prospects et faites progresser votre entreprise de manière intégrale.</Text>
            </Space>
          </li>
          <li className="list-checked-item">
            <Space direction="vertical">
              <Text strong>Ajoutez & gérez facilement vos services.</Text>
              <Text>Il regroupe vos tâches, projets, échéanciers, fichiers, et plus encore.</Text>
            </Space>
          </li>
        </ul>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={logo1} alt="Logo1" style={logoStyle} />
          <img src={logo2} alt="Logo2" style={logoStyle} />
          <img src={logo3} alt="Logo3" style={logoStyle} />
          <img src={logo4} alt="Logo4" style={logoStyle} />
        </div>
      </div>
    </Content>
  );
}

const logoStyle = {
  margin: '0 15px',
  display: 'block',
  float: 'left',
  width: '48px',
  filter: 'grayscale(1)',
  mixBlendMode: 'multiply',
  opacity: '0.8',
};
