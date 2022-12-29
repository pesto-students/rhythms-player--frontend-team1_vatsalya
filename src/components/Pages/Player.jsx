import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import SongCard from "../songCard/SongCard";
import Queue from "../queue/Queue";
import Lyrics from "../Lyrics/Lyrics";
import axios from "axios";
import { TokenContext } from "../../context/spotify.token";
import { CurrentSongContext } from "../../context/currentSong.context";
function Player() {
  const location = useLocation();
  const { Token } = useContext(TokenContext); // token that was generated as the  app start
  const { currentSong, setCurrentSong } = useContext(CurrentSongContext); // for selecting song from the list of tracks
  const [trackData, setTrackData] = useState([]);

  useEffect(() => {
    const token = Token;

    // 
    console.log(location.state.data);

    if (location.state) {
      async function getTracksData() {
        const track_id = location.state.data.id;

        const response = await axios.get("https://api.spotify.com/v1/tracks", {
          params: {
            ids: track_id,
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data?.tracks, response.data.tracks);
        setTrackData(response.data.tracks);
      }
      getTracksData();
    }
  }, []);
  console.log("player out of effect", trackData);
  return (
    <div className="flex w-screen h-screen">
      <div className="right-player-body">
        <SongCard trackData={location.state.data} />
        <Queue trackData={trackData} />
      </div>
      <div className="left-player-body">
        <Lyrics trackData={location.state.data} />
      </div>
    </div>
  );
}

export default Player;
