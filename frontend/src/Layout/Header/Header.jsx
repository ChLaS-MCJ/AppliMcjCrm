import { Link } from 'react-router-dom';
import { Avatar, Dropdown, Layout } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
export default function HeaderContent() {

  const { Header } = Layout;

  const srcImgProfile = null;

  const ProfileDropdown = () => {
    const navigate = useNavigate();
    return (
      <div className="profileDropdown" onClick={() => navigate('/profile')}>
        <Avatar
          size="large"
          className="last"
          src={srcImgProfile}
          style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        >
        </Avatar>
        <div className="profileDropdownInfo">
          <p>
            chalas maxime
          </p>
          <p>mcj.dev@gmail.com</p>
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
        <Link to={'/profile'}>
          <DropdownMenu text={"profile_settings"} />
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
        display: ' flex',
        flexDirection: ' row-reverse',
        justifyContent: ' flex-start',
        gap: ' 15px',
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
        {/* <Badge dot> */}
        <Avatar
          className="last"
          src={srcImgProfile}
          style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            float: 'right',
          }}
          size="large"
        >
          CHALAS
        </Avatar>
        {/* </Badge> */}
      </Dropdown>

    </Header>
  );
}
