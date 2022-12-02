import React from "react";
import { useEffect, useContext } from "react";
import Button_follow from "../commonComponents/Button_follow";
import { TokenContext } from "../../context/spotify.token";
import axios from "axios";
import { useState } from "react";
function Queue({ trackData, setCurrentIndex }) {
  console.log(trackData.tacks);
  console.log(trackData[0]?.artists?.[0]?.id);
  const { Token } = useContext(TokenContext);
  const Artist_id = trackData[0]?.artists?.[0]?.id;
  const [Queue, setQueue] = useState([]);
  useEffect(() => {
    const token = Token;

    async function getTopTracks() {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${Artist_id}/top-tracks`,
        {
          params: {
            market: "IN",
          },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      setQueue(response.data.tracks);
    }

    getTopTracks();
  }, []);
  return (
    <div className="queue-container flex">
      <div className="queue">
        <p className="font-bold text-xl mx-0 my-2 text-left text-white">
          More From :
        </p>
        <div className="queue-list">
          {Queue?.map((track) => {
            <div className="queue-item flex">
              <p className="track-name">{track?.name}</p>
              <p>0:30</p>
            </div>;
          })}
        </div>
      </div>
      {/* <Button_follow /> */}
    </div>
  );
}

export default Queue;
