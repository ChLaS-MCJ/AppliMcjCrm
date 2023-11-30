import React, { useState, useEffect } from 'react';
import { Avatar, Divider, Drawer, Card, Button } from 'antd';
import { DoubleLeftOutlined, UserOutlined, DoubleRightOutlined } from '@ant-design/icons';

import UpdateProfil from '@/Forms/UpdateProfil';
import { useSelector } from 'react-redux';
/**
 * Component for rendering the user profile.
 * @returns {JSX.Element} - The Profil component.
 */
const Profil = () => {
    const [open, setOpen] = useState(false);

    const StoreUser = useSelector(state => state.UserStore);

    /**
     * Handles opening the drawer.
     */
    const showDrawer = () => {
        setOpen(true);
    };

    /**
     * Handles closing the drawer.
     */
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card className="upper-container" style={{ width: '100%' }}>
                <div className="center-container">
                    <div className="image-container">
                        {StoreUser ? (
                            <Avatar
                                size={130}
                                className="last"
                                src={StoreUser.image}
                                icon={<UserOutlined />}
                                style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                            ></Avatar>
                        ) : (
                            <Avatar size={120} icon={<UserOutlined />} style={{ backgroundColor: "#f56a00" }} />
                        )}
                    </div>
                </div>
            </Card>
            <Divider />

            <p
                className="site-description-item-profile-p"
                style={{
                    marginBottom: 24,
                    marginTop: 50,
                }}
            >
                Profil de l'utilisateur
            </p>

            <Button className="btnmodif" onClick={showDrawer} type="dashed" icon={<DoubleLeftOutlined />}>
                Modifier
            </Button>

            <Drawer width={640} className="DrawerUpdateProfil" placement="right" closable={false} onClose={onClose} open={open}>
                <Button type="dashed" style={{ position: 'absolute', top: "10px", right: "20px" }} onClick={onClose} icon={<DoubleRightOutlined />} size={64} >Fermer</Button>
                <UpdateProfil />
            </Drawer>
        </>
    );
};

export default Profil;
