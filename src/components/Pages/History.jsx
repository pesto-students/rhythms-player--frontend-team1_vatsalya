import React, { useEffect, useState, useContext } from "react";
import { TokenContext } from "../../context/spotify.token";
import { API } from "../../config/APIConfig";
import axios from "axios";

function History() {
  const { Token } = useContext(TokenContext); // taking token from the token context
  const [TrackDataFromSpotify, setTrackDataFromSpotify] = useState([]);
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
        console.log(response.data);
        setTrackDataFromSpotify(response?.data?.tracks);
      });
  };
  useEffect(() => {
    console.log("use effect was called ");
    const historyUrl = `${API.BACKEND_BASE_URL}/getHistory`;
  });
  return <div className=" bg-amber-400">History</div>;
}

export default History;
