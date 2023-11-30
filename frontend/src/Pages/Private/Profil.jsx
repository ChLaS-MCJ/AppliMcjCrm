import React, { useState, useEffect } from 'react';
import { Avatar, Divider, Drawer, Card, Button } from 'antd';
import { DoubleLeftOutlined, UserOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { AuthService } from '@/Services';
import profilUser from "@/Assets/Images/MOI.jpg";
import UpdateProfil from '@/Forms/UpdateProfil';
const Profil = ({ }) => {

    const [open, setOpen] = useState(false);
    const [ProfilUser, setProfilUser] = useState({});
    console.log(ProfilUser)
    useEffect(() => {
        const tokenInfo = AuthService.getTokenInfo();
        setProfilUser(tokenInfo);
    }, []);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card className="upper-container" style={{ width: '100%' }}>
                <div className="center-container">
                    <div className="image-container">
                        {ProfilUser.image ? (
                            <Avatar
                                size={130}
                                className="last"
                                src={ProfilUser.image}
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