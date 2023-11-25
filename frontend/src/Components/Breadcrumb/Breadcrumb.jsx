import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

/**
 * Generates a breadcrumb navigation based on the current URL path.
 * 
 * @returns {JSX.Element} The breadcrumb component.
 */
const AppBreadcrumb = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const breadcrumbItems = pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const breadcrumbItem = {
            href: url,
            title: snippet,
        };

        return breadcrumbItem;
    });

    return (
        <Breadcrumb
            style={{ paddingLeft: '20px' }}
            separator="/"
            items={[
                {
                    href: '/dashboard',
                    title: <HomeOutlined />,
                },
                ...breadcrumbItems,
            ]}
        />
    );
};

export default AppBreadcrumb;
