import React, { useEffect, useContext } from "react";
import { UserContext } from "../../context/user.component";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import { API } from "../../config/APIConfig";
import axios from "axios";
function AlbumInfo({ trackData }) {
  const { currentUser, setCurrentUser, userLiked, setsUserLiked } =
    useContext(UserContext);

  const artists = new Array();
  // collecting artist names
  const trackId = trackData?.id;
  useEffect(() => {
    trackData?.album?.artists?.forEach((Element) => {
      artists.push(Element.name);
    });
  }, []);
  const likeUrl = `${API.BACKEND_BASE_URL}/like-song`;
  const unlikeUrl = `${API.BACKEND_BASE_URL}/unlike`;

  const [liked, setLiked] = useState(
    [...userLiked].find((item) => item == trackId)
  );
  // const { currentUser, setCurrentUser } = useContext(UserContext);

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
  var data = JSON.stringify({
    song_id: trackId,
  });

  var config = {
    method: "delete",
    url: unlikeUrl,
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Access-Control-Request-Headers":
        "access-control-allow-origin,content-type",
      "Access-Control-Request-Method": "POST",
      Connection: "keep-alive",
      Origin: "http://localhost:3000",
      Referer: "http://localhost:3000/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
      "Content-Type": "application/json",
    },
    data: data,
  };
  function unlikeThisSong() {
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //########################################################
  console.log(trackId);
  const setToLike = () => {
    console.log(typeof [...userLiked].find((item) => item == trackId));
    if (liked) {
      setLiked(false);
      unlikeThisSong();
    } else {
      axios.post(likeUrl, { song_id: trackId });
      setLiked(true);
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
