import React, { useEffect, useContext } from "react";
import { UserContext } from "../../context/user.component";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
function AlbumInfo({ album }) {
  console.log(album);
  const artists = new Array();
  useEffect(() => {
    album?.album?.artists?.forEach((Element) => {
      artists.push(Element.name);
    });
  }, []);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const addToFav = (id) => {
    // const fav =
    console.log("click" + id);
    setCurrentUser(id);
    console.log(currentUser);
  };
  const [liked, setLiked] = useState(false);
  // console.log(typeof artists);
  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="inline-block whitespace-no-wrap">
          <p>{album.name + artists.join()}</p>
        </div>
      </div>
      <div className="album-info">
        {album?.name} is a {album?.album?.album_type} album by{" "}
        {album.album.artists[0].name}
      </div>
      <div className="album-release flex justify-between">
        <p>Release Date: {album?.album?.release_date}</p>
        <button onClick={() => setLiked(!liked)}>
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
