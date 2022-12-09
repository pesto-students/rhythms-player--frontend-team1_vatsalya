import axios from "axios";
import { TokenContext } from "../../context/spotify.token";
import React, { useEffect, useState, useContext } from "react";
import { API } from "../../config/APIConfig";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { UserContext } from "../../context/user.component";
function Playlist() {
  const { Token } = useContext(TokenContext); // taking token from the token context

  const { currentUser, setCurrentUser, userPlaylist, setPlaylist } =
    useContext(UserContext);
  const [tracksDataFromSpotify, setTracksDataFromSpotify] = useState([]);
  const [Songs, setSongs] = useState([]);
  const getPlaylist = () => {
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
  };

  const fetchSongFromBackend = (playlist_id) => {
    console.log(playlist_id);
    var data = JSON.stringify({
      playlist_id: "23",
    });

    var config = {
      method: "get",
      url: "http://localhost:3001/api/v1/playlists/playlistId/songs",
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

  // useEffect(() => {
  //   // getPlaylist();
  //   userPlaylist.map((item) => {
  //     console.log(item.id);
  //     return fetchPlaylistDataFromBackEnd(item.id);
  //   });
  // }, []);

  // if (!likedTrackDataFromSpotify) return <div>No data found...</div>;
  return userPlaylist.length ? (
    <div className=" w-screen h-screen   flex flex-wrap ">
      <div className=" flex w-screen h-40 bg-secondary ">
        {userPlaylist.map((item) => {
          return (
            <div
              className=" w-40 h-10 rounded-md bg-slate-400 border-l-4 text-center font-extrabold  m-10 border-transparent border-4 hover:border-white"
              key={item.id}
              onClick={() => fetchSongFromBackend(item.id)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    "You don't have a playlist yet"
  );
}

export default Playlist;
