import React, { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicRouter from '@/Router/AppRouter';

import PageLoader from '@/Components/PageLoader';

const App = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="loader"><PageLoader /></div>
            ) : (
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<PublicRouter />} />
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    );

}

export default App;
