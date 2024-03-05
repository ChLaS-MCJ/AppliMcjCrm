import React, { useState } from 'react';
import { Tabs } from 'antd';
import ClientDelAdmin from './ElementDelAdmin/ClientDelAdmin';
import CompanyDelAdmin from './ElementDelAdmin/CompanyDelAdmin';
const ElementDelAdmin = () => {

    const items = [
        {
            key: '1',
            label: 'Clients',
            children: <ClientDelAdmin />,
        },
        {
            key: '2',
            label: 'Entreprises',
            children: <CompanyDelAdmin />,
        },
        {
            key: '3',
            label: 'Associations',
            children: "",
        },
        {
            key: '4',
            label: 'Employé',
            children: "",
        },
    ];

    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                tabPosition='left'
                style={{
                    height: "100%",
                }}
                items={items}
            />
        </div>
    );
};

export default ElementDelAdmin;