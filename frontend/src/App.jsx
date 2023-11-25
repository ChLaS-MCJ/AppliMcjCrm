import React, { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicRouter from '@/Router/AppRouter';

const App = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<PublicRouter />} />
                </Routes>
            </BrowserRouter>

        </div>
    );

}

export default App;
