import axios from "axios";
import { TokenContext } from "../../context/spotify.token";
import React, { useEffect, useState, useContext } from "react";
import { API } from "../../config/APIConfig";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { UserContext } from "../../context/user.component";
function Favorite() {
  const { Token } = useContext(TokenContext); // taking token from the token context
  const [userLikedTracks, setUserLikedTracks] = useState([]); // backend data ! a list of all the song_id that the user have liked
  const { currentUser, setCurrentUser, userLiked, setsUserLiked } =
    useContext(UserContext);
  const [likedTrackDataFromSpotify, setLikedTrackDataFromSpotify] = useState(
    []
  );
  const addToLiked = (id) => {
    return setsUserLiked([...userLiked, id]);
  };
  const fetchTracks = (Ids) => {
    const IdsString = Ids.join();
    axios
      .get("https://api.spotify.com/v1/tracks", {
        params: {
          market: "IN",
          ids: IdsString,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + Token,
        },
      })
      .then((response) => {
        console.log(response.data?.tracks);
        setLikedTrackDataFromSpotify(response?.data?.tracks);
      });
  };
  useEffect(() => {
    // console.log("use effect was called ");

    const favUrl = `${API.BACKEND_BASE_URL}/liked-songs`;

    axios.get(favUrl).then((res) => {
      res.data.map((item) => {
        addToLiked(item.song_id);
      });
      const Ids = res.data.map((item) => item.song_id);
      fetchTracks(Ids);
    });
  }, []);
  // if (!likedTrackDataFromSpotify) return <div>No data found...</div>;
  return (
    <div className=" w-screen h-screen p-3   overflow-y-auto ">
      {likedTrackDataFromSpotify.map((track) => {
        return (
          <div className=" w-screen h-20 bg-slate-600/50 flex my-4 justify-between align-text-bottom text-white">
            <div>
              <img className="h-20 w-14" src={track.album.images[0].url}></img>
            </div>
            <div>{track.name}</div>
            <div>Popularity: {track.popularity}</div>
            <div>release Date : {track.album.release_date}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Favorite;
