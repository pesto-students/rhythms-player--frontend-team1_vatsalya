import React, { useEffect, useState, useContext } from "react";
import { TokenContext } from "../context/spotify.token";
import axios from "axios";

import { BsFillPlayCircleFill } from "react-icons/bs";

function MainContainer() {
  const type = "track";
  const [tracks, setTracks] = useState(null);
  const { Token } = useContext(TokenContext);
  useEffect(() => {
    // Wildcards for random search
    let random_wildcards = [
      "%a%",
      "b%",
      "%c",
      "%e%",
      "e%",
      "%d",
      "%i%",
      "i%",
      "%i",
      "%o%",
      "o%",
      "%o",
      "%u%",
      "u%",
      "%u",
    ];
    let wildcard =
      random_wildcards[Math.floor(Math.random() * random_wildcards.length)];
    const token = Token;
    async function fetchData(e) {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: wildcard,
          type: "track",
          market: "IN",
          limit: "10",
          offset: "0",
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const res = response.data.tracks.items;
      console.log(res);
      setTracks(response.data?.tracks?.items);
    }

    fetchData();
  }, [Token]);
  const playTrack = (id) => {};

  return (
    <div className="max-h-screen  w-screen bg-neutral-600/70">
      <div
        className="w-screen h-fit     
          flex items-center pt-5  my-10 bg-gray-600/50 "
      >
        {tracks?.map((track) => {
          return (
            <div
              className="card"
              key={track.id}
              onClick={() => playTrack(track.id)}
            >
              <img className="card-image" src={track.album.images[0].url}></img>
              <p className="card-title  truncate">{track.name}</p>
              <p className=" card-subTitle">
                {track?.artists[0]?.external_urls?.name}
              </p>
              <div className="card-fade">
                <BsFillPlayCircleFill className=" text-green-500 w-[50px] h-[50px]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MainContainer };
