import { React, useState, useRef, useEffect } from "react";
import Header from "../header/header.component";
import Main_area from "../Main/Main_area.component";
import Player from "../Player/Player.component";
import Sidebar from "../sidebar/Sidebar.component";
import { songsdata } from "../audio/Audio";
import { Routes, route, Route, Router } from "react-router-dom";
import ArtistPage from "../artists/Artist.page";
import { artists_list } from "../artists/Artist_list";
import Playlist_Page from "../Main/Playlist_Page.component";
import { Albums } from "../album/album";

function Rhythem() {
  const [songs, setSongs] = useState(songsdata);
  const [isPlaying, setIsPlaying] = useState(false); //for play and pause button
  const [currentSong, SetCurrentSong] = useState(songsdata[0]); //to change song
  const [isMuted, setIsMuted] = useState(false);
  const audioElem = useRef();
  useEffect(() => {
    //it play and pause the current song
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isPlaying]);

  // useEffect(() => {
  //   if (!isMuted) {
  //     audioElem.controls = muted;
  //   }
  // }, [isMuted]);

  const onPlaying = () => {
    // while the song is playing get these info
    const duration = audioElem.current.duration;
    const currentTime = audioElem.current.currentTime;
    SetCurrentSong({
      ...currentSong,
      progress: (currentTime / duration) * 100,
      length: duration,
    });
  };
  // artist and set artist
  const [artist, setArtist] = useState(artists_list[0]);
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              <Main_area
                songs={songs}
                setSongs={setSongs}
                currentSong={currentSong}
                SetCurrentSong={SetCurrentSong}
              />
            }
          />

          <Route path="/artist" element={<ArtistPage artist={artist} />} />
          <Route path="/playlist" element={<Playlist_Page Albums={Albums} />} />
        </Routes>
      </div>
      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} />
      <Player
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioElem={audioElem}
        currentSong={currentSong}
        SetCurrentSong={SetCurrentSong}
        setIsMuted={setIsMuted}
      />
    </div>
  );
}

export default Rhythem;
