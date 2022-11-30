import React, { useEffect } from "react";
import { useParams, userParams } from "react-router-dom";

function Playlist_Page({ Albums }) {
  const current_album_id = useParams();
  return (
    <div className="w-full h-auto ">
      <ul className="playlist-body">
        {Albums.map((item, index) => {
          return (
            <li
              key={item.album_id}
              className="w-40 h-60 rounded-md flex-col   mx-4 mt-4 hover: "
            >
              <img src={item.album_cover} className="playlist-image"></img>
              <div className=" text-center  text-white">
                <p className=" text-lg font-medium truncate ">
                  {item.album_title}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Playlist_Page;
