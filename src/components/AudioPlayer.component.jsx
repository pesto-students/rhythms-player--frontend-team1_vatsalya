import React, { useContext, useState, useEffect, useRef } from "react";
import { CurrentSongContext } from ".././context/currentSong.context";
// import { TokenContext } from ".././context/spotify.token";
import { UserContext } from "../context/user.component";
import { CurrentIndex } from "../context/songIndex.context";
import ProgressBar from "./commonComponents/ProgressBar";
import { useNavigate } from "react-router-dom";
import PlaylistDropUP from "./commonComponents/PlaylistDropUP";

import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiFillFastForward,
  AiFillForward,
  AiFillFastBackward,
  AiFillBackward,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
function AudioPlayer() {
  const { addPlaylistToPlayListArray, userPlaylist, getUserPlaylist } =
    useContext(UserContext);
  const { currentIndex, setCurrentIndex } = useContext(CurrentIndex);
  // currenSong is a list of objects
  const { currentSong, setCurrentSong } = useContext(CurrentSongContext);
  let total = [...currentSong];
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const Navigate = useNavigate();
  let audioSrc = total[currentIndex]?.preview_url;
  const audioRef = useRef(new Audio(total[currentIndex]?.preview_url));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;
  const [open, setOpen] = useState(false);
  const [playListName, setPlaylistName] = useState("");
  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const handlePrev = () => {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(total.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  // start a timer to check if the song has ended
  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };
  // handle play
  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying) {
        // audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
      if (isPlaying) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  // handel ending of song and playing next song
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);
  //cleanup
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  const [fullScreen, setFullscreen] = useState(false);

  const Expand_handler = (currentSongDetails) => {
    console.log(currentSongDetails);
    // setFullscreen(!fullScreen);
    // navigate to player page

    Navigate("/Player", { state: { data: currentSongDetails } });

    // setFullscreen(!fullScreen);
  };
  const showPlaylist = () => {
    setOpen(!open);
    // getUserPlaylist();
  };
  const createPlaylist = () => {
    console.log(playListName);
    // addPlaylistToPlayListArray(playListName);
  };

  return (
    <div className=" w-screen h-40 absolute bottom-0 flex">
      <div className="h-full w-60 ">
        <img
          className="card-image h-full"
          src={total[currentIndex]?.album?.images?.[0].url}
        ></img>
      </div>
      <div className="w-screen h-full bg-[rgba(42,40,51,0.6)] ">
        <div className="w-full h-10">
          <ProgressBar percentage={trackProgress} audioRef={audioRef.current} />
        </div>
        <div className="h-full w-full  flex">
          <div className=" h-40 w-3/4  relative">
            <div className="flex items-center justify-center h-full w-full  text-6xl absolute bottom-5 ">
              <AiFillFastBackward
                className="hover:text-white "
                onClick={handlePrev}
              />

              {/* play pause button change on click */}
              <div onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  <AiFillPauseCircle className="hover:text-white text-7xl" />
                ) : (
                  <AiFillPlayCircle className="hover:text-white text-7xl" />
                )}
              </div>
              <AiFillFastForward
                className="active:ring-10 ring-primary/30   hover:text-white "
                onClick={handleNext}
              />
            </div>
          </div>

          <div className=" h-32 w-1/4 flex items-center justify-around text-4xl  ">
            <MdPlaylistAdd
              className="hover:text-white relative"
              onClick={() => showPlaylist()}
            />
            {open ? <PlaylistDropUP /> : ""}

            <div
              onClick={() => {
                Expand_handler(currentSong[currentIndex]);
              }}
            >
              {fullScreen ? (
                <AiOutlineFullscreenExit className="hover:text-white" />
              ) : (
                <AiOutlineFullscreen className="hover:text-white" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
