import React from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';

import UtilisateurAdmin from '@/Components/Admin/UtilisateurAdmin';
import ElementDelAdmin from '@/Components/Admin/ElementDelAdmin';
import ExportAdmin from '@/Components/Admin/ExportAdmin';
import ImportAdmin from '@/Components/Admin/ImportAdmin';

const Admin = () => {
    const userRole = useSelector(state => state.UserStore.role_id);

    const items = [
        {
            key: '1',
            label: 'Utilisateur',
            children: <UtilisateurAdmin />,
        },
        {
            key: '2',
            label: 'Élément supprimé',
            children: <ElementDelAdmin />,
        },
        {
            key: '3',
            label: 'Exportation',
            children: <ExportAdmin />,
        },
        {
            key: '4',
            label: 'Importation',
            children: <ImportAdmin />,
        },
    ];

    return (
        <div>
            {userRole !== undefined && userRole !== 1 ? (
                <p>Vous n'avez rien à faire ici</p>
            ) : (
                <Tabs defaultActiveKey="1" items={items} />
            )}
        </div>
    );
};

export default Admin;
