import React from "react";
import AlbumImage from "./AlbumImage";
import AlbumInfo from "./AlbumInfo";
function SongCard({ album }) {
  return (
    <div className="songCard-body flex">
      <AlbumImage url={album?.album?.images[0]?.url} />
      <AlbumInfo album={album} />
    </div>
  );
}

export default SongCard;
