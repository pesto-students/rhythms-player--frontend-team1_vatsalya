import React, { useContext, useState, useEffect, useRef } from "react";
import { CurrentSongContext } from ".././context/currentSong.context";
import { TokenContext } from ".././context/spotify.token";
import ProgressBar from "./commonComponents/ProgressBar";
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
function AudioPlayer() {
  const { Token } = useContext(TokenContext);
  // currenSong is a list of objects
  const { currentSong, setCurrentSong } = useContext(CurrentSongContext);
  let total = [...currentSong];
  //   const total = temp.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  // controls states
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  let audioSrc = total[currentIndex]?.preview_url;
  const audioRef = useRef(new Audio(total[currentIndex]?.preview_url));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const handlePrev = () => {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(total - 1);
    } else {
      currentIndex(currentIndex - 1);
    }
  };

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
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);
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

  const PlayPause = () => {
    // sets isPlaying to false if true or vice versa

    setIsPlaying(!isPlaying);
  };
  return (
    <div className=" w-screen h-40 absolute bottom-10 flex">
      <div className="h-full w-60 bg-black"></div>
      <div className="w-screen h-full  ">
        <div className="w-full h-10">
          <ProgressBar percentage={trackProgress} audioRef={audioRef.current} />
        </div>
        <div className="h-full w-full  flex">
          <div className=" h-32 w-3/4">
            <div className="flex items-center justify-center h-full w-full  text-6xl ">
              <AiFillBackward
                className="hover:text-white"
                // onClick={skipBackward}
              />
              <AiFillFastBackward
                className="hover:text-white "
                onClick={handlePrev}
              />

              {/* play pause button change on click */}
              {isPlaying ? (
                <AiFillPauseCircle
                  onClick={PlayPause}
                  className="hover:text-white text-7xl"
                />
              ) : (
                <AiFillPlayCircle
                  onClick={PlayPause}
                  className="hover:text-white text-7xl"
                />
              )}
              <AiFillFastForward
                className="active:ring-10 ring-primary/30   hover:text-white "
                onClick={handleNext}
              />
              <AiFillForward className="hover:text-white" />
              <div
                className="flex text-5xl justify-between "
                // onClick={skipForward}
              ></div>
            </div>
          </div>
          <div className=" h-32 w-1/4 flex items-center justify-around text-4xl ">
            <MdShuffle className="hover:text-white" />
            <MdPlaylistAdd className="hover:text-white" />
            <MdOutlineVolumeOff
              className="hover:text-white"
              //   onClick={muteAudio}
            />
            <MdOutlineVolumeUp
              className="hover:text-white"
              //   onClick={unmuteAudio}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
