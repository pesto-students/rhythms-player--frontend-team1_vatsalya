import { React, useState, useRef, useEffect } from "react";
import Header from "../header/header.component";
import Main_area from "../Main/Main_area.component";
import Player from "../Player/Player.component";
import Sidebar from "../sidebar/Sidebar.component";
import { songsdata } from "../audio/Audio";
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
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <Main_area />
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
