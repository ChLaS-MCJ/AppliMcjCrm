import React, { useState } from 'react';
import { Tabs } from 'antd';

const ElementDelAdmin = () => {

    const items = [
        {
            key: '1',
            label: 'Clients',
            children: "",
        },
        {
            key: '2',
            label: 'Entreprises',
            children: "",
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