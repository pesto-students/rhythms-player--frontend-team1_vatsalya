import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/user.component";
import axios from "axios";
import { API } from "../../config/APIConfig";
import { CurrentSongContext } from "../../context/currentSong.context";
import { CurrentIndex } from "../../context/songIndex.context";
import swal from "sweetalert";
const ADDSONGTOPLAYLISTAPI = `${API.BACKEND_BASE_URL}/playlist/song/add`;
const ADDARTISTINFOFORPLAYLISTSONGAPI = `${API.BACKEND_BASE_URL}/playlist/song/artist/add`;
function PlaylistDropUP() {
  const [playListName, setPlaylistName] = useState("");
  const currentUserId = window.localStorage.getItem("userId");
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
    var config = {
      method: "get",
      url: `${API.BACKEND_BASE_URL}/playlist/list?userId=${currentUserId}`,
      headers: {
        "Content-Type": "application/json",
      },
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
  const addSongToPlaylist = (playlistId) => {
    setSongToPlaylist(playlistId);
    var artistsArr = currentSong[currentIndex].artists;
    const data = {
      playlistId,
      songName: currentSong[currentIndex].name,
      songUUID: currentSong[currentIndex].id,
      href: currentSong[currentIndex].href,
      previewURL: currentSong[currentIndex].preview_url,
      durationMS: currentSong[currentIndex].duration_ms,
    };
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(ADDSONGTOPLAYLISTAPI, data, {
        headers: headers,
      })
      .then((response) => {
        if (response?.status === 200) {
          swal("Song added to playlist!", "", "success", {
            closeOnClickOutside: false,
            closeOnEsc: false,
          });

          artistsArr = artistsArr.map(function (ele) {
            ele.playlistId = playlistId;
            ele.songId = response?.data[0].songID;
            ele.songhref = ele.href;
            ele.songuri = ele.uri;
            return ele;
          });
          AddPlaylistSongArtistInfo(artistsArr);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const AddPlaylistSongArtistInfo = async (artistsArr) => {
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    };
    for (var i = 0; i < artistsArr.length; i++) {
      try {
        let response = await axios.post(
          ADDARTISTINFOFORPLAYLISTSONGAPI,
          artistsArr[i],
          {
            headers: headers,
          }
        );
        if (response.status === 500) {
          console.log("no email found");
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.log("no email found ", i);
      }
      console.log("axios request done");
    }
  };
  return (
    <div className="dropUp w-fit h-fit text-sm p-2 right-[5rm]">
      <ul className=" m-1">
        {list.map((item) => {
          return (
            <li
              onClick={() => {
                addSongToPlaylist(item?.playlist_id);
              }}
              key={item?.playlist_id}
              className="text-center text-white m-1 rounded-md text-xl border-2 border-transparent hover:border-white  hover:text-white cursor-pointer"
            >
              {item?.playlist_name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PlaylistDropUP;
