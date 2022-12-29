import axios from "axios";
import { TokenContext } from "../../context/spotify.token";
import React, { useEffect, useState, useContext } from "react";
import { API } from "../../config/APIConfig";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { UserContext } from "../../context/user.component";
import { Link } from "react-router-dom";
const UPDATEPLAYLISTAPI = `${API.BACKEND_BASE_URL}/playlist/update`;
function Playlist() {
  const { Token } = useContext(TokenContext); // taking token from the token context
  const currentUserId = window.localStorage.getItem("userId");
  const [currentPlaylistId, setCurrentPlaylistId] = useState(0);

  const {
    currentUser,
    setCurrentUser,
    userPlaylist,
    setPlaylist,
    getUserPlaylist,
    createPlaylist,
  } = useContext(UserContext);
  const [tracksDataFromSpotify, setTracksDataFromSpotify] = useState([]);
  const [Songs, setSongs] = useState([]);
  const fetchPlaylistDataFromBackEnd = (playlist_id) => {
    var data = JSON.stringify({
      playlist_id: playlist_id,
    });

    var config = {
      method: "get",
      url: `${API.BACKEND_BASE_URL}/playlists/playlistId/songs`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setSongs(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getUserPlaylist();
  }, []);
  useEffect(() => {
    userPlaylist.map((item) => {
      console.log(item.id);
      return fetchPlaylistDataFromBackEnd(item.id);
    });
  }, [userPlaylist]);
  const toggleModal = () => {
    const targetEl = document.getElementById("createPlaylistModal");
    if (targetEl.classList.contains("hidden")) {
      targetEl.classList.remove("hidden");
    } else {
      targetEl.classList.add("hidden");
      // document.getElementById("createPlaylistModal").reset();
    }
  };

  const toggleEditPlaylistModal = () => {
    const targetEl = document.getElementById("editPlaylistModal");
    if (targetEl.classList.contains("hidden")) {
      targetEl.classList.remove("hidden");
    } else {
      targetEl.classList.add("hidden");
      // document.getElementById("editPlaylistModal").reset();
    }
  };

  const fnCreatePlaylist = () => {
    const playlistName = document.getElementById("playlistNameInput").value;
    if (playlistName) {
      createPlaylist(playlistName);
    }
  };

  const editPlayList = (playlistId, type) => {
    const target = userPlaylist.filter((el) => el.playlist_id == playlistId);
    var playlistName = target[0]?.playlist_name;
    setCurrentPlaylistId(target[0].playlist_id);
    document.getElementById("editPlaylistNameInput").value = playlistName;
    if (playlistName) {
      if (type == "0") fnUpdatePlaylist(playlistId, playlistName, type);
      else {
        toggleEditPlaylistModal();
      }
    }
  };
  // const deletePlaylist = (playlistId,playlistName, isActive) => {
  //   fnUpdatePlaylist(playlistId,playlistName, isActive);
  // };
  const fnUpdatePlaylist = (playlistId, playlistName, isActive) => {
    debugger;
    playlistName = document.getElementById("editPlaylistNameInput").value;
    var data = {
      userId: parseInt(currentUserId),
      playlistId,
      playlistName,
      isActive,
    };
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(UPDATEPLAYLISTAPI, data, {
        headers: headers,
      })
      .then((response) => {
        debugger;
        getUserPlaylist();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  // if (!likedTrackDataFromSpotify) return <div>No data found...</div>;
  return (
    <>
      <button
        className="mx-20 my-10 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        data-modal-toggle="createPlaylistModal"
        onClick={toggleModal}
      >
        Create Playlist
      </button>
      <div
        id="createPlaylistModal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed content-center hidden w-full p-4 inset-y-3/4 inset-x-1/2 top-1/2"
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="createPlaylistModal"
              onClick={toggleModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Create Playlist
              </h3>
              <form className="space-y-6" action="#" id="createPlaylistForm">
                <div>
                  <label
                    htmlFor="playlistName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="playlist"
                    id="playlistNameInput"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Playlist Name"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={fnCreatePlaylist}
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {userPlaylist.length > 0 ? (
        <div className=" w-screen h-screen m-10 p-5 flex flex-wrap ">
          {userPlaylist.map((item) => {
            return (
              <div
                className=" w-1/5 h-1/5 mx-10 my-10 rounded-md bg-slate-400 border-l-4 flex items-center justify-center font-extrabold  "
                key={item?.playlist_id}
                onClick={() => console.log(item?.playlist_id)}
              >
                <Link
                  to="/PlaylistSongs"
                  state={{ playlistId: item?.playlist_id }}
                >
                  {" "}
                  <label className="text-center mx-10 my-10">
                    {item?.playlist_name}
                  </label>
                </Link>

                <svg
                  className="w-6 h-6 mx-5 my-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    editPlayList(item?.playlist_id, 1);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <svg
                  className="w-6 h-6 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    editPlayList(item?.playlist_id, 0);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            );
          })}

          <div
            id="editPlaylistModal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed content-center hidden w-full p-4 inset-y-3/4 inset-x-1/2 top-1/2"
          >
            <div className="relative w-full h-full max-w-md md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="editPlaylistModal"
                  onClick={toggleEditPlaylistModal}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    Edit Playlist
                  </h3>
                  <form
                    className="space-y-6"
                    action="#"
                    id="createPlaylistForm"
                  >
                    <div>
                      <label
                        htmlFor="editPlaylistName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="editPlaylistName"
                        id="editPlaylistNameInput"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Playlist Name"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => {
                        fnUpdatePlaylist(currentPlaylistId, "", 1);
                      }}
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <label className="text-center text-white mx-20 my-20 ">
          {" "}
          You don't have a playlist yet{" "}
        </label>
      )}
    </>
  );
}

export default Playlist;
