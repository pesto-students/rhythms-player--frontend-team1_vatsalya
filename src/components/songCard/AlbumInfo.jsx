import React from "react";

function AlbumInfo({ album }) {
  console.log(album);
  //   const artists = [];
  //     album.artists?.forEach((Element) => {
  //       artists.push(Element.name);
  //     });
  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="inline-block whitespace-no-wrap">
          <p>{album.name + " - "}</p>
        </div>
      </div>
      <div className="album-info">
        <p>
          {album?.name} is an {album?.album_type} by with {album?.total_track}
        </p>
      </div>
      <div className="album-release">
        <p>Release Date: {album?.release_date}</p>
      </div>
    </div>
  );
}

export default AlbumInfo;
