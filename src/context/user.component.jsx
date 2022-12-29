import { createContext, useState } from "react";
import axios from "axios";
import { API } from "../config/APIConfig";
import swal from "sweetalert";
const CREATEPLAYLISTAPI = `${API.BACKEND_BASE_URL}/playlist/create`;
export const UserContext = createContext({
  currentUser: [], // user id
  setCurrentUser: () => null, // sets the current user id once he logs in first fetch the user is from master table
  userPlaylist: [], // these are the name and is of the playlist of the user
  setPlaylist: () => null, // it runs and set the user playlist name and id
  userLiked: [], // these are the song id of songs user liked
  setsUserLiked: () => null, // this gets the data of songs user like
  addPlaylistToPlayListArray: () => null,
  getUserPlaylist: () => null,
  createPlaylist: () => null
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userPlaylist, setPlaylist] = useState([]);
  const currentUserId = window.localStorage.getItem("userId");

  const addPlaylistToPlayListArray = (PlaylistName) => {
    createPlaylist(PlaylistName);
  }; 
  const [userLiked, setsUserLiked] = useState([]);
  const getUserPlaylist = () => {
    var config = {
      method: "get",
      url: `${API.BACKEND_BASE_URL}/playlist/list?userId=${currentUserId}`,
      headers: {
        "Content-Type": "application/json",
      }
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response?.data));
        setPlaylist(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const createPlaylist = (playlistName) => {
    var data = {
      userId: currentUserId,
      playlistName
    };
    
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(CREATEPLAYLISTAPI, data, {
        headers: headers,
      })
      .then((response) => {
        if (response?.status === 200) {
          swal("Playlist was successfully created!", "", "success", {
            closeOnClickOutside: false,
            closeOnEsc: false,
          });
        }
        getUserPlaylist();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        swal("Playlist Creation Failed", "Please Try Again", "error", {
          closeOnClickOutside: false,
          closeOnEsc: false,
        });
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
    createPlaylist
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
