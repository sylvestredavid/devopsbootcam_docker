import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "../pages/HomePage/HomePage";
import 'antd/dist/antd.css';
const App: React.FC = () => {

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
