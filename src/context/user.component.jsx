import { createContext, useState } from "react";
import axios from "axios";
import { API } from "../config/APIConfig";

export const UserContext = createContext({
  currentUser: [], // user id
  setCurrentUser: () => null, // sets the current user id once he logs in first fetch the user is from master table
  userPlaylist: [], // these are the name and is of the playlist of the user
  setPlaylist: () => null, // it runs and set the user playlist name and id
  userLiked: [], // these are the song id of songs user liked
  setsUserLiked: () => null, // this gets the data of songs user like
  addPlaylistToPlayListArray: () => null,
  getUserPlaylist: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userPlaylist, setPlaylist] = useState([]);
  const addPlaylistToPlayListArray = (PlaylistName) => {
    createPlaylist(PlaylistName);
  }; // ?
  const [userLiked, setsUserLiked] = useState([]);
  const getUserPlaylist = () => {
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
        userPlaylist(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const value = {
    currentUser,
    setCurrentUser,
    userPlaylist,
    setPlaylist,
    getUserPlaylist,
    userLiked,
    setsUserLiked,
    addPlaylistToPlayListArray,
  };

  const createPlaylist = (playlistName) => {
    var data = JSON.stringify({
      name: playlistName,
    });

    var config = {
      method: "post",
      url: `${API.BACKEND_BASE_URL}/playlists`,
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
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
