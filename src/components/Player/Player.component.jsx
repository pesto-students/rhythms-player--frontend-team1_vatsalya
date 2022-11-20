import { React, useState, useRef } from "react";
import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiFillFastForward,
  AiFillForward,
  AiFillFastBackward,
  AiFillBackward,
} from "react-icons/ai";
import {
  MdShuffle,
  MdPlaylistAdd,
  MdOutlineVolumeOff,
  MdOutlineVolumeUp,
} from "react-icons/md";
function Player({
  SetCurrentSong,
  currentSong,
  audioElem,
  setIsPlaying,
  isPlaying,
  setSongs,
  songs,
  setIsMuted,
}) {
  const [play, setPlay] = useState(true);
  const PlayPause = () => {
    // sets isPlaying to false if true or vice versa
    setIsPlaying(!isPlaying);
  };
  // to click on the progress bar and move forward and backward in the song
  const clickRef = useRef();
  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    let offset = e.nativeElement.offsetX;

    console.log(width, offset);
  };
  // play previous song
  const playPreviousSong = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == 0) {
      SetCurrentSong(songs[songs.length - 1]);
    } else {
      SetCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };
  // play next song
  const playNextSong = () => {
    const index = songs.findIndex((x) => x.title == currentSong.title);
    if (index == songs.length) {
      SetCurrentSong(songs[0]);
    } else {
      SetCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };
  // Mute Audio
  const muteAudio = () => {
    setIsMuted(true);
  };
  // unmuteAudio
  const unmuteAudio = () => {
    setIsMuted(false);
  };

  return (
    <div className="w-full h-40 relative z-10 bottom-[230px] bg-[#625e5e41]    ">
      <div className="flex">
        <div className="w-48 h-40  ">
          <img
            className=" h-36 w-36 rounded-lg m-2"
            src={currentSong.song_image}
          />
        </div>
        <div className=" w-full h-40 ">
          <div
            className="w-full h-2 bg-white rounded-md mx-4"
            onClick={checkWidth}
            ref={clickRef}
          >
            <div
              className="h-full rounded-md bg-red-400"
              style={{ width: `${parseInt(currentSong.progress)}%` }}
            ></div>
          </div>
          <div className="flex w-full h-[120px]">
            <div className=" flex">
              <div className="flex-col justify-evenly h-full w-36  flex-nowrap ml-2 text-lg font-medium text-white capitalize ">
                <div className="">{currentSong.title}</div>
                <div className="">{currentSong.Artist_name}</div>
              </div>
            </div>
            <div className="flex items-center justify-center h-full w-full place-content-around text-7xl">
              <AiFillBackward className="hover:text-white" />
              <AiFillFastBackward
                className="hover:text-white"
                onClick={playPreviousSong}
              />

              {/* play pause button change on click */}
              {isPlaying ? (
                <AiFillPauseCircle
                  onClick={PlayPause}
                  className="hover:text-white"
                />
              ) : (
                <AiFillPlayCircle
                  onClick={PlayPause}
                  className="hover:text-white"
                />
              )}

              <AiFillFastForward
                className="hover:text-white"
                onClick={playNextSong}
              />
              <AiFillForward className="hover:text-white" />
              <MdShuffle className="hover:text-white" />
              <MdPlaylistAdd className="hover:text-white" />
              <MdOutlineVolumeOff
                className="hover:text-white"
                onClick={muteAudio}
              />
              <MdOutlineVolumeUp
                className="hover:text-white"
                onClick={unmuteAudio}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
