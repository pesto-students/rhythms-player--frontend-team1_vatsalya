import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
// import Rhythem from '../components/Rhythem/Rhythem.App.componenet';
import { MainContainer } from "../components/MainContainer";

const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<MainContainer />} />
    </Routes>
  );
};

export default RouteConfig;
