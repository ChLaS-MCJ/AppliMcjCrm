import React, { useState } from 'react';
import { Avatar, Drawer, Card, Button, Typography, Descriptions, Divider, Tag } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined, MailOutlined, EnvironmentOutlined, PhoneOutlined, UserSwitchOutlined, IdcardOutlined, EditOutlined } from '@ant-design/icons';

import UpdateProfil from '@/Forms/Users/UpdateProfil';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const Profil = () => {
    const [open, setOpen] = useState(false);
    const StoreUser = useSelector(state => state.UserStore);

    let isdark = useSelector(state => state.theme.isDarkMode)

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };

        const dateObject = new Date(dateString);
        return dateObject.toLocaleString('fr-FR', options);
    };

    const getRoleLabel = () => {
        switch (StoreUser?.RoleId) {
            case 1:
                return "Utilisateur";
            case 2:
                return "Commercial";
            case 3:
                return "Admin";
            case 4:
                return "Super Admin";
            default:
                return "";
        }
    };

    const getRoleTagProps = () => {
        switch (StoreUser?.RoleId) {
            case 1:
                return { color: 'blue', backgroundcolor: 'cyan' };
            case 2:
                return { color: 'green', backgroundcolor: 'lightgreen' };
            case 3:
                return { color: 'red', backgroundcolor: 'lightcoral' };
            case 4:
                return { color: 'purple', backgroundcolor: 'lavender' };
            default:
                return {};
        }
    };
    const borderedItems = [
        {
            key: '1',
            label: "Nom",
            icon: <IdcardOutlined />,
            children: StoreUser?.nom,
        },
        {
            key: '2',
            label: "Prénom",
            icon: <IdcardOutlined />,
            children: StoreUser?.prenom,
        },
        {
            key: '3',
            label: "Pseudo",
            icon: <EditOutlined />,
            children: StoreUser?.pseudo,
        },
        {
            key: '4',
            label: "Genre",
            icon: <UserSwitchOutlined />,
            children: StoreUser?.genre,
        },
        {
            key: '5',
            label: "Adresse",
            icon: <EnvironmentOutlined />,
            children: StoreUser?.adresse,
        },
        {
            key: '6',
            label: "Téléphone",
            icon: <PhoneOutlined />,
            children: StoreUser?.phone,
        },
        {
            key: '7',
            label: "Création du compte",
            icon: <EditOutlined />,
            children: formatDate(StoreUser?.createdAt),
        },
        {
            key: '8',
            label: "Email",
            icon: <MailOutlined />,
            children: StoreUser?.email,
        },
    ];

    return (
        <>
            <Card className="upper-container" style={{ width: '100%' }}>
                <div className="center-container">
                    <div className="image-container" style={{ backgroundColor: isdark ? '#252525' : 'white', }}>
                        {StoreUser ? (
                            <Avatar
                                size={130}
                                className="last"
                                src={StoreUser?.image}
                                icon={<UserSwitchOutlined />}
                                style={{ color: '#f56a00', backgroundcolor: '#fde3cf' }}
                            ></Avatar>
                        ) : (
                            <Avatar size={120} icon={<UserSwitchOutlined />} style={{ backgroundcolor: "#f56a00" }} />
                        )}
                    </div>
                </div>
            </Card >
            <Divider style={{ marginTop: "20px" }} />

            <div className='containerTopProfil'>
                <Title level={3} >Profil de {StoreUser?.pseudo}</Title>
                {StoreUser?.RoleId && <Tag bordered={false}{...getRoleTagProps()}>{getRoleLabel()}</Tag>}
            </div>

            <Title level={5} className='profildescription'>{StoreUser?.description}</Title>

            <div>

                <Descriptions
                    bordered
                    size={"large"}
                    extra={<Button className="btnmodif" onClick={showDrawer} type="dashed" icon={<DoubleLeftOutlined />}>
                        Modifier
                    </Button>}
                >
                    {borderedItems.map(item => (
                        <Descriptions.Item
                            key={item.key}
                            label={
                                <div>
                                    {item.icon} {item.label}
                                </div>
                            }
                        >
                            {item.children}
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            </div>

            <Drawer width={640} className="DrawerUpdateProfil" placement="right" closable={false} onClose={onClose} open={open}>
                <Button type="dashed" style={{ position: 'absolute', top: "50px", right: "20px" }} onClick={onClose} icon={<DoubleRightOutlined />} size={64} >Fermer</Button>
                <UpdateProfil />
            </Drawer>
        </>
    );
};

export default Profil;