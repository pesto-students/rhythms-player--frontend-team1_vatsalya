import React, { useEffect, useState, useContext } from "react";
import { TokenContext } from "../context/spotify.token";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillPlayCircleFill } from "react-icons/bs";

function MainContainer() {
  const [tracks, setTracks] = useState(null); // list of tracks
  const { Token } = useContext(TokenContext); // token that was generated as the  app start
  const Navigate = useNavigate();
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
  useEffect(() => {
    let wildcard =
      random_wildcards[Math.floor(Math.random() * random_wildcards.length)]; // selecting a random letter from the random wild cards
    const token = Token;
    // get random tracks
    async function fetchData(e) {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: wildcard,
          type: "track",
          market: "IN",
          limit: "20",
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
  const [artistList, setArtistList] = useState(null);
  // getting random artist list
  useEffect(() => {
    let random_artist =
      random_wildcards[Math.floor(Math.random() * random_wildcards.length)];
    // calling spotify search with random  random search param
    async function fetchData(e) {
      let token = Token;
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: random_artist,
          type: "artist",
          market: "IN",
          limit: "20",
          offset: "0",
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const res = response.data.artists;
      // console.log(res.items);
      setArtistList(response.data?.artists?.items);
    }
    fetchData();
  }, [Token]);
  // play selected track
  const playTrack = (id) => {
    Navigate("/Player", { state: { id: id } });
  };
  // navigate to selected user page
  const artistPage = (id) => {
    Navigate("/artist_page", { state: { id: id } });
  };

  return (
    <div className="max-h-screen  w-screen bg-neutral-600/70">
      <div
        className="w-screen h-fit     
          flex items-center pt-5  my-10 bg-gray-600/50 overflow-auto"
      >
        {tracks?.map((track) => {
          return (
            <div
              className="card"
              key={track.id}
              onClick={() => playTrack(track.id)}
            >
              <img
                className="card-image"
                src={track.album?.images[0].url}
              ></img>
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

      <div
        className="w-screen h-44     
          flex items-center pt-5 px-2 my-10 bg-gray-600/50 overflow-auto "
      >
        {artistList?.map((artist) => {
          return (
            <div
              className="cont"
              key={artist.id}
              onClick={() => artistPage(artist.id)}
            >
              <div className="avatar relative">
                <img src={artist.images[0].url}></img>
              </div>
              <p className="avatar-name ">{artist.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MainContainer };
