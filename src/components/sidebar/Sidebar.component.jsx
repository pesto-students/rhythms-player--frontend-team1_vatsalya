import React from "react";
import {
  MdExplore,
  MdOutlinePlaylistAddCheck,
  MdOutlineBookmark,
  MdLoop,
  MdHistory,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="bg-secondary h-screen w-48 ">
      <div
        className="flex items-center text-black w-fill place-content-around h-10 relative top-10 hover:bg-sky-300 "
        onClick={() => navigate("/")}
      >
        <i>
          <MdExplore className="w-10 h-10 text-white" />
        </i>
        <p className="text-white text-xl ">Explore</p>
      </div>
      <div
        className="flex items-center text-black w-fill place-content-around h-10 relative top-10 my-3 hover:bg-sky-300 "
        onClick={() => navigate("/playlist")}
      >
        <i>
          <MdOutlinePlaylistAddCheck className="w-10 h-10 text-white " />
        </i>
        <p className="text-white text-xl  ">Playlist</p>
      </div>
      <div className="flex items-center text-black w-fill place-content-around h-10 relative top-10 my-3 hover:bg-sky-300 ">
        <i>
          <MdOutlineBookmark className="w-10 h-10 text-white" />
        </i>
        <p className="text-white text-xl">Favorites</p>
      </div>
      <div className="flex items-center text-black w-fill place-content-around h-10 relative top-10 my-3 hover:bg-sky-300 ">
        <i>
          <MdLoop className="w-10 h-10 text-white" />
        </i>
        <p className="text-white text-xl">Repeated</p>
      </div>
      <div className="flex items-center text-black w-fill place-content-around h-10 relative top-10 my-3 hover:bg-sky-300 ">
        <i>
          <MdHistory className="w-10 h-10 text-white" />
        </i>
        <p className="text-white text-xl">History</p>
      </div>
    </div>
  );
}

export default Sidebar;
