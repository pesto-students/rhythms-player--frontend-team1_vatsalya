import React from "react";
import axios from "axios";
import { API } from "../../config/APIConfig";
import swal from "sweetalert";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const GETPLAYLISTSONGSAPI = `${API.BACKEND_BASE_URL}/playlist/song/list`;
const DELETEPLAYLISTSONGAPI = `${API.BACKEND_BASE_URL}/playlist/song/delete`;
const PlaylistSongs = (props) => {
  const location = useLocation();
  const playlistId = location.state.playlistId;
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const getPlaylistSongs = () => {
    var config = {
      method: "get",
      url: `${GETPLAYLISTSONGSAPI}?playlistId=${playlistId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response?.data));
        setPlaylistSongs(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getPlaylistSongs();
  }, [playlistId]);

  const removeSongFromPlaylist = (playlistId, songId) => {
    const obj = {
      playlistId,
      songId,
    };
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(DELETEPLAYLISTSONGAPI, obj, {
        headers: headers,
      })
      .then((response) => {
        if (response?.status === 200) {
          swal("Removed Song From Playlist!", "", "success", {
            closeOnClickOutside: false,
            closeOnEsc: false,
          });
          getPlaylistSongs();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <>
      <div class="overflow-x-auto relative">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                {" "}
                Song{" "}
              </th>
              <th scope="col" class="py-3 px-6">
                {" "}
                Artist{" "}
              </th>

              <th scope="col" class="py-3 px-6">
                {" "}
                Action{" "}
              </th>
            </tr>
          </thead>
          {playlistSongs.length
            ? playlistSongs[0].song_name &&
              playlistSongs.map((ele, index) => (
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="py-4 px-6">{ele?.song_name}</td>
                    <td class="py-4 px-6">{ele?.artists}</td>
                    <td class="py-4 px-6">
                      <svg
                        className="w-6 h-6 "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          removeSongFromPlaylist(
                            ele?.playlist_id,
                            ele?.song_id
                          );
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              ))
            : null}
        </table>
      </div>
    </>
  );
};

export default PlaylistSongs;
