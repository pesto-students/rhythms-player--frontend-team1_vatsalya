import "./App.css";
import { MainContainer } from "./components/MainContainer";
import { SideBar } from "./components/Sidebar/SideBar";
import { Header } from "./components/Header";
import Favorite from "./components/Pages/Favorite";
import History from "./components/Pages/History";
import Repeated from "./components/Pages/Repeated";
import Playlist from "./components/Pages/Playlist";
import { Routes, Route, Outlet } from "react-router-dom";
import Search from "./components/Pages/Search";
import { useState } from "react";
import Player from "./components/Pages/Player";

function App() {
  const [Data, setData] = useState("");
  function searchResult(result) {
    setData(result);
  }

  return (
    <div className="App">
      <Header searchResult={searchResult} />
      <div className="flex">
        <SideBar />
        <Routes>
          <Route index path="/" element={<MainContainer />} />
          <Route exact path="/Favorite" element={<Favorite />} />
          <Route exact path="/History" element={<History />} />
          <Route exact path="/Repeated" element={<Repeated />} />
          <Route exact path="/Playlist" element={<Playlist />} />
          <Route path="/Search" element={<Search searchData={Data} />} />
          <Route exact path="/Player" element={<Player />} />
        </Routes>
      </div>
      <div className="background"></div>
    </div>
  );
}

export default App;
