import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { artists_list } from "./Artist_list";
function ArtistPage({ artist }) {
  // let oi = artists_list[0];
  // const params = useParams();
  // const CurrentArtistId = params.artistId;
  // useEffect(() => {
  //   const _artist = artists_list.filter((item, index) => {
  //     console.log(CurrentArtistId);
  //     return item.artist_id === CurrentArtistId;
  //   });
  //   oi = _artist;
  // }, []);
  return (
    <div className=" w-full h-auto ">
      <div className="flex w-full h-60 text-white">
        <div className="flex items-center justify-center  w-48  ">
          <div className="flex-col">
            <img
              src={artist.artist_profile}
              className=" w-28 h-28 rounded-full justify-center "
              alt={artist.artist_name}
            ></img>
            <p className=" text-center text-white text-lg">
              {artist.artist_name}
            </p>
          </div>
        </div>
        <div className="w-full h-60 transform-cpu p-10 overflow-y-auto">
          {artist.artist_description}
        </div>
      </div>
      <div className=" w-full h-full  overflow-y-scroll  border-spacing-5 ">
        <ul>
          {artist.artist_songs.map((item, index) => {
            return (
              <div className=" w-full h-20 my-10 bg-slate-700/50 text-white">
                <li key={item.song_id} className="flex h-full w-full p-2  ">
                  <img
                    src={item.song_image}
                    className="rounded-md h-full mx-5  w-20"
                  ></img>
                  <div className=" mx-10">
                    <p>{item.title}</p>
                    <p>{item.Artist_name}</p>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ArtistPage;
