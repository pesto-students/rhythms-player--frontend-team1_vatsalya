import React, { useEffect, useState, useContext } from "react";
import { TokenContext } from "../context/spotify.token";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { CurrentSongContext } from "../context/currentSong.context";
import { CurrentIndex } from "../context/songIndex.context";
//main container responsible for fetching
// 1) List of latest songs
// 2) A list of artists
// 3) Navigating to the respective artist page if clicked on it !NOT WORKING YET
// 4) Navigating to the Players Page if clicked on the Track !WORKING BUT NOT NEEDED
function MainContainer() {
  const [tracks, setTracks] = useState(null); // list of tracks
  const { Token } = useContext(TokenContext); // token that was generated as the  app start
  const { currentIndex, setCurrentIndex } = useContext(CurrentIndex);
  const { currentSong, setCurrentSong } = useContext(CurrentSongContext);

  const Navigate = useNavigate();
  // Wildcards for random search
  let random_wildcards = [
    "%a%",
    "b%",
    "%ca",
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
    "%j%",
    "%k",
    "k%",
    "%w%",
  ];
  useEffect(() => {
    // 1) List of  songs
    let wildcard =
      random_wildcards[Math.floor(Math.random() * random_wildcards.length)];
    // selecting a random letter from the random wild cards
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
      const res = response.data?.tracks?.items;
      if (currentSong.length == 0) {
        setCurrentSong(res);
      }
      // setting current song context for the very first time
      setTracks(response.data?.tracks?.items);
    }

    fetchData();
  }, [Token]);
  const [artistList, setArtistList] = useState(null);
  // getting random artist list
  useEffect(() => {
    // 2) A list of artists
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
  // Albums list
  const [albumList, setAlbumList] = useState(null);
  useEffect(() => {
    // 2) A list of artists
    let random_album =
      random_wildcards[Math.floor(Math.random() * random_wildcards.length)];
    // calling spotify search with random  random search param
    async function fetchData(e) {
      let token = Token;
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: random_album,
          type: "album",
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
      const res = response.data;
      console.log(res);
      setAlbumList(response.data?.albums?.items);
    }
    fetchData();
  }, [Token]);
  // 4) Navigating to the Players Page if clicked on the Track !WORKING BUT NOT NEEDED
  const playTrack = (track) => {
    // console.log(id);
    setCurrentSong([...currentSong, track]);
    setCurrentIndex(currentSong.length);
    console.log(currentSong); // setting current song by sending the id of the track
    // Navigate("/Player", { state: { id: id } });
  };
  // 3) Navigating to the respective artist page if clicked on it !NOT WORKING YET
  const artistPage = (id) => {
    Navigate("/artist_page", { state: { id: id } });
  };

  return (
    <div className=" w-screen h-screen relative overflow-y-scroll">
      <div
        className="w-screen h-fit grid      grid-flow-col
        grid-col-1  grid-gap-1   items-center pt-5  my-10 bg-[rgb(64,63,63)] overflow-auto"
      >
        {tracks?.map((track) => {
          return (
            <div
              className=" card"
              key={track.id}
              onClick={() => playTrack(track)}
            >
              <img
                className="card-image"
                src={track.album?.images[0].url}
              ></img>
              <p className="card-title  truncate">{track.name}</p>
              <p className=" card-subTitle">{track?.artists[0]?.name}</p>
              <div className="card-fade">
                <BsFillPlayCircleFill className=" text-green-500 w-[50px] h-[50px]" />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="w-screen h-44     
        grid      grid-flow-col
        grid-col-1 grid-gap-2 items-center pt-5 px-2 my-10 bg-[rgb(64,63,63)] overflow-x-scroll"
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
      <div
        className="w-screen h-fit     
        grid      grid-flow-col
        grid-col-1  grid-gap-1  items-center pt-5  my-10 bg-[rgb(64,63,63)] overflow-auto"
      >
        {albumList?.map((album) => {
          return (
            <div
              className="card"
              key={album.id}
              onClick={() => playTrack(album.id)}
            >
              <img className="card-image" src={album?.images[0].url}></img>
              <p className="card-title  truncate">{album.name}</p>
              <p className=" card-subTitle">{album?.artists[0]?.name}</p>
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
