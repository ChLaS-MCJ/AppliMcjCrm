import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown, Layout, Divider } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthService, UsersService } from '@/Services';
import { UserOutlined } from '@ant-design/icons';
import { userReducer } from '@/Redux/User/Reducer'; // Assurez-vous d'avoir le bon chemin
import { useDispatch, useSelector } from 'react-redux';


/**
 * Component for rendering the header content including user profile information.
 * @returns {JSX.Element} - The HeaderContent component.
 */
const HeaderContent = () => {

  const { Header } = Layout;
  const dispatch = useDispatch();

  const StoreUser = useSelector(state => state.UserStore);

  /**
   * Fetches the user profile information on component mount.
   */
  useEffect(() => {
    const tokenInfo = AuthService.getTokenInfo();

    const getInfoProfile = async () => {
      try {
        const response = await UsersService.getUserProfile(tokenInfo.id);

        dispatch(userReducer.actions.setUserData(response.data));
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    getInfoProfile();
  }, []);
  /**
   * Component for rendering the user profile dropdown.
   * @returns {JSX.Element} - The ProfileDropdown component.
   */
  const ProfileDropdown = () => {
    const navigate = useNavigate();
    return (
      <div className="profileDropdown" onClick={() => navigate('/profil')}>
        <Avatar
          size="large"
          className="last"
          src={StoreUser?.image}
          icon={<UserOutlined />}
          style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        ></Avatar>
        <div className="profileDropdownInfo">
          <p>{`${StoreUser?.nom} ${StoreUser?.prenom}`}</p>
          <p>{StoreUser?.email}</p>
        </div>
      </div>
    );
  };

  /**
   * Component for rendering a menu item in the dropdown.
   * @param {Object} props - The component props.
   * @param {string} props.text - The text to display.
   * @returns {JSX.Element} - The DropdownMenu component.
   */
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
        style={{ width: '280px', float: 'right' }}
      >
        <Avatar
          className="last"
          src={StoreUser?.image ? StoreUser?.image : <UserOutlined />}
          style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            float: 'right',
          }}
          size={50}
        />

      </Dropdown>
      <Divider type="vertical" />
    </Header>
  );
};

export default HeaderContent;
