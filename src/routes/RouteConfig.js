import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
// import Rhythem from '../components/Rhythem/Rhythem.App.componenet';

const RouteConfig = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/player' element={<Rhythem />} /> */}
        </Routes>
    )
}

export default RouteConfig