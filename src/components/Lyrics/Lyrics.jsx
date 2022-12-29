import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../config/APIConfig";
function Lyrics({ trackData }) {
  console.log(trackData);
  const [lyrics, setLyrics] = useState("");

  const artistName = trackData?.artists?.[0].name;
  const trackName = trackData?.name;
  useEffect(() => {
    console.log(artistName);
    console.log(trackName);

    var config = {
      method: "get",
      url: `${API.BACKEND_BASE_URL}/lyrics`,
      headers: {
        "Content-Type": "text/plain",
      },
      data: {
        name: trackName,
        artistName: artistName,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.message.body);
        const lyricsData = response.data.message?.body?.lyrics?.lyrics_body;

        setLyrics(lyricsData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [lyrics]);
  return lyrics.length ? (
    <div className=" w-3/5 h-fit place-content-center mx-20">
      <div className="mx-10 w-2/5 h-3/5  p-10  font-bold text-2xl text-white">
        {lyrics}
      </div>
    </div>
  ) : (
    "lyrics not found...."
  );
}

export default Lyrics;
