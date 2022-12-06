import React, { useEffect, useContext } from "react";
import { UserContext } from "../../context/user.component";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import { API } from "../../config/APIConfig";
import axios from "axios";
function AlbumInfo({ trackData }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(trackData);

  // console.log(favArr);
  const artists = new Array();
  // collecting artist names
  useEffect(() => {
    trackData?.album?.artists?.forEach((Element) => {
      artists.push(Element.name);
    });
  }, []);
  const likeUrl = `${API.BACKEND_BASE_URL}/like-song`;
  const [liked, setLiked] = useState(false);
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const trackId = trackData?.id;
  console.log(trackId);
  const setToLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      axios.post(likeUrl, { song_id: trackId });
    }
    console.log("click");
    // console.log(currentUser);
  };

  // console.log(typeof artists);
  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="inline-block whitespace-no-wrap">
          <p>{trackData.name + artists.join()}</p>
        </div>
      </div>
      <div className="album-info">
        {trackData?.name} is a {trackData?.album?.album_type} album by{" "}
        {trackData.album.artists[0].name}
      </div>
      <div className="album-release flex justify-between">
        <p>Release Date: {trackData?.album?.release_date}</p>
        <button onClick={() => setToLike()}>
          {!liked ? (
            <AiOutlineHeart className="w-10 h-10 " />
          ) : (
            <AiFillHeart className=" text-red-500 w-10 h-10" />
          )}
        </button>
      </div>
    </div>
  );
}

export default AlbumInfo;
