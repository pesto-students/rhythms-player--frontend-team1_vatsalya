import "./App.css";
// import { MainContainer } from "./components/MainContainer";
// import { SideBar } from "./components/Sidebar/SideBar";
// import { Header } from "./components/Header";
// import Favorite from "./components/Pages/Favorite";
// import History from "./components/Pages/History";
// import Repeated from "./components/Pages/Repeated";
// import Playlist from "./components/Pages/Playlist";
// import { Routes, Route, Outlet } from "react-router-dom";
// import Search from "./components/Pages/Search";
// import { useState } from "react";
// import Player from "./components/Pages/Player";
// import AudioPlayer from "./components/AudioPlayer.component";
import RouteConfig from "./routes/RouteConfig";

function App() {
  return (
    <div className="App">
      <RouteConfig />
    </div>
  );
}

export default App;
