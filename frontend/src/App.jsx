import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

import PublicRouter from '@/Router/AppRouter';
import { useSelector } from 'react-redux';

import 'antd/dist/reset.css';

const App = () => {
    const { defaultAlgorithm, darkAlgorithm } = theme;

    const isDarkMode = useSelector(state => state.theme.isDarkMode);
    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<PublicRouter />} />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;