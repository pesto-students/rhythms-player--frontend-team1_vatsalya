import React from "react";

import { Albums } from "../album/album";
import { artists_list } from "../artists/Artist_list";
import Artists from "./artists.component";
import { categories } from "../constants";

function Main_area({ songs, SetCurrentSong }) {
  function play_this_song(id) {
    SetCurrentSong(songs[id - 1]);
  }
  return (
    <div className=" w-full h-auto overflow-y-auto ">
      <div className="w-full h-60  mt-6 bg-secondary/10 hover:bg-secondary/30  ">
        <ul className="flex w-full h-full overflow-x-scroll  flex-nowrap">
          {songs.map((item, index) => {
            return (
              <li
                key={item.song_id}
                className="w-40 h-50 rounded-md flex-col   mx-4 mt-2 hover:pointer-events-auto "
                onClick={() => play_this_song(item.song_id)}
              >
                <img
                  src={item.song_image}
                  className="rounded-md w-40 h-40"
                ></img>
                <div className=" text-start  text-white">
                  <p className=" text-lg font-medium truncate ">{item.title}</p>
                  <p>{item.Artist_name}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Artists artists={artists_list} />
      <div>
        <div className="w-full h-40  mt-6 bg-secondary/30  ">
          <ul className="flex w-full h-full overflow-y-scroll  flex-nowrap">
            {categories.items.map((item, index) => {
              return (
                <li key={item.id} className=" w-full aspect-auto ">
                  <img
                    src={item.icons[0].url}
                    className=" w-full aspect-auto"
                  ></img>
                  <div className=" text-center  text-white">
                    <p className=" text-lg font-medium truncate ">
                      {item.name}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Main_area;
