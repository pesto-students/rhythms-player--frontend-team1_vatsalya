import React from "react";
import { useEffect, useContext } from "react";
import Button_follow from "../commonComponents/Button_follow";
import { TokenContext } from "../../context/spotify.token";
import axios from "axios";
import { useState } from "react";
import { LoadingManager } from "three";
function Queue({ trackData }) {
  console.log("Q track data", trackData);
  // console.log(trackData?.album?.artists?.[0].id);
  const { Token } = useContext(TokenContext);
  // const Artist_id = "6LEG9Ld1aLImEFEVHdWNSB";
  const [Queue, setQueue] = useState([]);
  // console.log("using nav:" + location.state);
  useEffect(() => {
    // console.log("using nav use effect:" + location.state);
    const token = Token;
    const Artist_id =
      trackData.length > 0 ? trackData[0].album.artists[0].id : undefined;
    // const Artist_id = trackData[0].album?.artists?.[0].id;

    // console.log(Artist_id);
    async function getTracksList() {
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
      console.log(Queue);
    }
    if (Artist_id) getTracksList();
  }, [trackData]);

  return (
    <div className="queue-container flex">
      <div className="queue">
        <p className="font-bold text-xl mx-0 my-2 text-left text-white">
          More From :
        </p>

        <div className="queue-list">
          {Queue.length
            ? Queue?.map((track) => {
                return (
                  <div className="queue-item flex">
                    <p className="track-name">{track?.name}</p>
                    <p>
                      {Math.floor(track?.duration_ms / 36000)
                        .toFixed(2)
                        .replace(".", ":")}
                    </p>
                  </div>
                );
              })
            : "Loading..."}
        </div>
      </div>
      {/* <Button_follow /> */}
    </div>
  );
}

export default Queue;
