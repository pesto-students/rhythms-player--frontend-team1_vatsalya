import React from "react";

function AlbumImage({
  url = "https://i.scdn.co/image/ab67616d0000b27365234917c3dc6c5714367508",
}) {
  console.log(url);
  return (
    <div className="albumImage flex">
      <img src={url} alt="track alt"></img>
      <div className="albumImage-shadow">
        <img src={url} alt="track alt" className="albumImage-shadow"></img>
      </div>
    </div>
  );
}

export default AlbumImage;
