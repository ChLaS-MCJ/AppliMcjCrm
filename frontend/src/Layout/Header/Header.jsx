// HeaderContent.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown, Layout, Divider, Switch } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthService, UsersService } from '@/Services';
import { UserOutlined } from '@ant-design/icons';
import { themeSlice } from '@/Redux/Themes/Reducer';
import { userReducer } from '@/Redux/User/Reducer';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import WeatherSwitch from '@/Components/Weather/Weather';

const HeaderContent = () => {
  const { Header } = Layout;
  const dispatch = useDispatch();

  const StoreUser = useSelector(state => state.UserStore);
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const toggleTheme = () => {
    dispatch(themeSlice.actions.toggleTheme());
  };

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

  const navigate = useNavigate();

  const ProfileDropdown = () => {
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
        background: 'transparent',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: "center",
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
          className="last profileHead"
          src={StoreUser?.image ? StoreUser?.image : <UserOutlined />}
          style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            float: 'right',
          }}
          size={50}
        />
      </Dropdown>
      <Divider type="vertical" style={{
        height: "100%"
      }} />
      <Switch
        className='switchLightandDark'
        checked={isDarkMode}
        onChange={toggleTheme}
        checkedChildren={<FontAwesomeIcon icon={faMoon} />}
        unCheckedChildren={<FontAwesomeIcon icon={faSun} />}
      />

      <WeatherSwitch />

    </Header>
  );
};

export default HeaderContent;