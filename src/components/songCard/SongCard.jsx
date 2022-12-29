import React from "react";
import AlbumImage from "./AlbumImage";
import AlbumInfo from "./AlbumInfo";
function SongCard({ trackData }) {
  return (
    <div className="songCard-body flex">
      <AlbumImage url={trackData?.album?.images[0]?.url} />
      <AlbumInfo trackData={trackData} />
    </div>
  );
}

export default SongCard;
