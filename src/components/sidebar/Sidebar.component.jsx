import React from "react";
import {
  MdExplore,
  MdOutlinePlaylistAddCheck,
  MdOutlineBookmark,
  MdLoop,
  MdHistory,
} from "react-icons/md";
import Side_btn from "./Side_bar_btn.component";

function Sidebar() {
  return (
    <div className="bg-secondary h-screen w-40 ">
      {/* <div className="flex items-center text-black w-fill place-content-around h-10 relative top-10 hover:bg-sky-300 ">
        <i>
          <MdExplore className="w-10 h-10" />
        </i>
        <p className="text-white text-lg ">Explore</p>
      </div>
      <div className="flex items-center text-black w-fill place-content-around h-10 relative top-10 my-3 hover:bg-sky-300 ">
        <i>
          <MdOutlinePlaylistAddCheck className="w-10 h-10 " />
        </i>
        <p className="text-white text-lg  ">Playlist</p>
      </div>
      <div className="flex items-center text-black w-fill place-content-around h-10 relative top-10 my-3 hover:bg-sky-300 ">
        <i>
          <MdOutlineBookmark className="w-10 h-10" />
        </i>
        <p className="text-white text-lg">Favorites</p>
      </div>
      <div className="flex items-center text-black w-fill place-content-around h-10 relative top-10 my-3 hover:bg-sky-300 ">
        <i>
          <MdLoop className="w-10 h-10" />
        </i>
        <p className="text-white text-lg">Repeated</p>
      </div>
      <div className="flex items-center text-black w-fill place-content-around h-10 relative top-10 my-3 hover:bg-sky-300 ">
        <i>
          <MdHistory className="w-10 h-10" />
        </i>
        <p className="text-white text-lg">History</p>
      </div> */}
      <Side_btn />
    </div>
  );
}

export default Sidebar;
