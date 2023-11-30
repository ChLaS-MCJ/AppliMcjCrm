// HeaderContent.jsx

import { Link } from 'react-router-dom';
import { Avatar, Dropdown, Layout } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthService } from '@/Services';
import { UserOutlined } from '@ant-design/icons';

export default function HeaderContent() {
  const [ProfilUser, setProfilUser] = useState({});
  const [initial, setinitial] = useState("");
  const { Header } = Layout;

  useEffect(() => {
    const tokenInfo = AuthService.getTokenInfo();
    setProfilUser(tokenInfo);
    setinitial(tokenInfo.nom.charAt(0) + tokenInfo.prenom.charAt(0))
  }, []);

  const ProfileDropdown = () => {
    const navigate = useNavigate();
    return (
      <div className="profileDropdown" onClick={() => navigate('/profil')}>
        <Avatar
          size="large"
          className="last"
          src={ProfilUser.image}
          icon={<UserOutlined />}
          style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        ></Avatar>
        <div className="profileDropdownInfo">
          <p>{ProfilUser.nom + " " + ProfilUser.prenom}</p>
          <p>{ProfilUser.email}</p>
        </div>
      </div>
    );
  };

  const DropdownMenu = ({ text }) => {
    return <span style={{}}>{text}</span>;
  };

  const items = [
    {
      label: <ProfileDropdown className="headerDropDownMenu" />,
      key: 'ProfileDropdown',
    },
    {
      type: 'divider',
    },
    {
      icon: <SettingOutlined />,
      key: 'settingProfile',
      label: (
        <Link to={'/profil'}>
          <DropdownMenu text={'Modification profil'} />
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      icon: <LogoutOutlined />,
      key: 'logout',
      label: <Link to={'/logout'}>Déconnexion</Link>,
    },
  ];

  return (
    <Header
      style={{
        padding: '20px',
        background: '#f9fafc',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        gap: '15px',
      }}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
        placement="bottomRight"
        stye={{ width: '280px', float: 'right' }}
      >
        {ProfilUser.image ? (
          <Avatar
            className="last"
            src={ProfilUser.image}
            style={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
              float: 'right',
            }}
            size="large"
          />
        ) : (
          <Avatar
            className="last"
            style={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
              float: 'right',
            }}
            size="large"
          >
            {initial}
          </Avatar>
        )}
      </Dropdown>
    </Header>
  );
}

