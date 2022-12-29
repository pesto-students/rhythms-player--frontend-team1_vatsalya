import React from "react";

function ProgressBar({ percentage, audioRef }) {
  const moveSong = () => {
    ("move song not working");
  };
  return (
    <div className="flex items-center gap-3 mt-2 mx-4">
      <div className="text-sm opacity-80">
        {audioRef
          ? (audioRef.currentTime / 360).toFixed(2).replace(".", ":")
          : "0:00"}
        {/* {(audioRef.current.currentTime / 360).toFixed(2).replace(".", ":")} */}
      </div>
      <div className="relative  w-full h-2 rounded bg-white" onClick={moveSong}>
        <div
          id="progress-slider"
          className="absolute top-0 left-0  h-2  rounded-l-md bg-green-500"
          style={{
            width: `${Math.floor(
              (audioRef.currentTime / audioRef.duration) * 100
            )}%`,
          }}
        ></div>
      </div>
      <div className="text-sm opacity-80 ">
        {audioRef
          ? (audioRef.duration / 360).toFixed(2).replace(".", ":")
          : "0:00"}
      </div>
    </div>
  );
}

export default ProgressBar;
