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
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const token = Token;
    console.log(location.state);
    if (location.state) {
      const track_id = location.state.id;
      async function getTrackData() {
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
        console.log(response.data);
        setTrackData(response.data?.tracks);
        setCurrentTrack(response.data?.tracks?.[0]);
      }
      getTrackData();
    }
  }, [location.state]);
  return (
    <div className="flex w-screen h-screen">
      <div className="right-player-body">
        <SongCard album={currentTrack.album} />
        <Queue trackData={trackData} setCurrentIndex={setCurrentIndex} />
      </div>
      <div className="left-player-body">
        {/* <Lyrics trackData={trackData} /> */}
      </div>
    </div>
  );
}

export default Player;
