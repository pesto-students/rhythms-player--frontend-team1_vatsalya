import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
// import Rhythem from '../components/Rhythem/Rhythem.App.componenet';
// import { MainContainer } from "../components/MainContainer";
import Rhythms from "../components/app/Rthyms";
import { SideBar } from "../components/Sidebar/SideBar";
// import { Header } from "./components/Header";
import Favorite from "../components/Pages/Favorite";
import History from "../components/Pages/History";
import Repeated from "../components/Pages/Repeated";
import Playlist from "../components/Pages/Playlist";
// import { Routes, Route, Outlet } from "react-router-dom";
import Search from "../components/Pages/Search";
import { BrowserRouter } from "react-router-dom";
// import {SideBar} from "../components/Sidebar/SideBar";
import { Header } from "../components/Header";
import { useState } from "react";
import Player from "../components/Pages/Player";
import AudioPlayer from "../components/AudioPlayer.component";
// import AudioPlayer from "./components/AudioPlayer.component";
import GetToken from "../Spotify/Spotify.token";

const RouteConfig = () => {
  const [Data, setData] = useState("");
  function searchResult(result) {
    setData(result);
  }
  return (
    <BrowserRouter>
      <GetToken />
      <Header searchResult={searchResult} />

      <div className="flex">
        <SideBar />
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Rhythms />} />
            <Route path="/Favorite" element={<Favorite />} />
            <Route path="/History" element={<History />} />
            <Route path="/Repeated" element={<Repeated />} />
            <Route path="/Playlist" element={<Playlist />} />
            <Route path="/Search" element={<Search searchData={Data} />} />
            <Route path="/Player" element={<Player />} />
          </Routes>
        </div>
      </div>
      <AudioPlayer />
    </BrowserRouter>
  );
};

export default RouteConfig;
