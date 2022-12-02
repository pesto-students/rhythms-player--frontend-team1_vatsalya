import axios from "axios";
import React, { useEffect, useState } from "react";
const musixMatchApiKey = `&apikey=17dec0e1673916834f5044a23b8107d4`;
const format_url = `?format=json&callback=callback`;
function Lyrics({ trackData }) {
  const [lyrics, setLyrics] = useState("Lyrics not found");
  console.log(trackData);
  const artistName = trackData.album?.artist?.[0].name;
  const trackName = trackData.album?.name;
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${trackName}&q_artist=${artistName}apikey=${musixMatchApiKey}`
      )
      .then((res) => {
        let lyrics = res.data.message.body.lyrics;
        setLyrics({ lyrics });
      })
      .catch((err) => console.log(err));
  }, []);
  return <div>{lyrics}</div>;
}

export default Lyrics;
