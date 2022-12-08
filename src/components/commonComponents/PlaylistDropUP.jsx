import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/user.component";
import axios from "axios";
import { API } from "../../config/APIConfig";
import { CurrentSongContext } from "../../context/currentSong.context";
import { CurrentIndex } from "../../context/songIndex.context";
function PlaylistDropUP() {
  const [playListName, setPlaylistName] = useState("");
  const {
    addPlaylistToPlayListArray,
    userPlaylist,
    getUserPlaylist,
    setPlaylist,
  } = useContext(UserContext);
  const createPlaylist = () => {
    console.log(playListName);
    addPlaylistToPlayListArray(playListName);
    getUserPlaylist();
  };
  const list = [...userPlaylist];
  useEffect(() => {
    var data = JSON.stringify({
      userId: "3",
    });

    var config = {
      method: "get",
      url: `${API.BACKEND_BASE_URL}/playlists`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setPlaylist(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const { currentSong } = useContext(CurrentSongContext);
  const { currentIndex } = useContext(CurrentIndex);
  const setSongToPlaylist = (playlistId) => {
    const track = [...currentSong];
    console.log(track[currentIndex].id);
    var data = JSON.stringify({
      song_id: track[currentIndex].id,
      playlist_id: playlistId,
    });

    var config = {
      method: "post",
      url: "http://localhost:3001/api//v1/playlists/songs",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="dropUp w-fit h-fit text-sm p-2 ">
      <ul className=" m-1">
        {list.map((item) => {
          return (
            <li
              onClick={() => {
                setSongToPlaylist(item.id);
              }}
              key={item.id}
              className="text-center m-1 rounded-md text-xl border-2 border-transparent hover:border-white  hover:text-white cursor-pointer"
            >
              {item.name}
            </li>
          );
        })}
      </ul>
      <div className="w-fit h-fit">
        <input
          type="text"
          className="p-2 m-1 rounded"
          placeholder="add new playlist"
          onChange={(e) => setPlaylistName(e.target.value)}
        ></input>
        <button
          className="w-fit h-fit border-double p-2 border-2 bg-red-400 rounded-md m-2 text-white"
          onClick={() => createPlaylist()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default PlaylistDropUP;
