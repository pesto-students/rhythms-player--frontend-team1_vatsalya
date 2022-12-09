import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { CurrentSongContext } from "../../context/currentSong.context";
import { CurrentIndex } from "../../context/songIndex.context";

function Search({ searchData }) {
  const { currentSong, setCurrentSong } = useContext(CurrentSongContext);
  const { currentIndex, setCurrentIndex } = useContext(CurrentIndex);

  const [result, setResult] = useState([]);
  useEffect(() => {
    const data = searchData;
    const parsed = JSON.parse(data);
    setResult(parsed.tracks);
    // console.log(
    //   parsed.tracks.items.map((item) => {
    //     return item.name;
    //   })
    // );
  }, [searchData]);
  const playTrack = (item, index) => {
    console.log(item);
    setCurrentSong([...currentSong, item]);
    setCurrentIndex(currentSong.length);
    // console.log(result.items[index]);
  };
  return (
    <div className=" w-[90vw] h-[90vh] grid grid-col-6 grid-flow-col grid-rows-3 gap-2 overflow-y-scroll">
      {result?.items?.map((item, index) => {
        return (
          <div className="card mt-2" key={item.id}>
            <img className="card-image" src={item.album?.images[0].url}></img>
            <p className="card-title  truncate">{item.name}</p>
            <p className=" card-subTitle">
              {item?.artists[0]?.external_urls?.name}
            </p>
            <div className="card-fade " onClick={() => playTrack(item, index)}>
              <BsFillPlayCircleFill className=" text-green-500 w-[50px] h-[50px]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Search;
