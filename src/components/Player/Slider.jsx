import React from "react";

function Slider({ currentSong, audioElem }) {
  const moveSong = () => {
    ("move song not working");
  };
  return (
    <div className="flex items-center gap-5 mt-2">
      <div className="text-sm opacity-80">
        {(audioElem?.current.currentTime / 360).toFixed(2).replace(".", ":")}
      </div>
      <div className="relative  w-full h-2 rounded bg-white" onClick={moveSong}>
        <div
          id="progress-slider"
          className="absolute top-0 left-0  h-2  rounded-l-md bg-gray-600"
          style={{ width: `${parseInt(currentSong.progress)}%` }}
        ></div>
        <input type="range" className="slider"></input>
      </div>
      <div className="text-sm opacity-80 ">
        {(currentSong.length / 360).toFixed(2).replace(".", ":")}
      </div>
    </div>
  );
}

export default Slider;
