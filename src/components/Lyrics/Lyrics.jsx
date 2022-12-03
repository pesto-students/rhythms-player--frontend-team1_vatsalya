import axios from "axios";
import React, { useEffect, useState } from "react";
const musixMatchApiKey = `17dec0e1673916834f5044a23b8107d4`;
const format_url = `?format=json&callback=callback`;
function Lyrics({ trackData }) {
  const [lyrics, setLyrics] = useState("Lyrics not found");
  //  `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${trackName}&q_artist=${artistName}&apikey=${musixMatchApiKey}`
  const artistName = trackData[0].artists?.[0].name;
  const trackName = trackData[0]?.name;
  useEffect(() => {
    console.log(trackData[0]?.name);
    console.log(trackData[0].artists?.[0].name);

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${trackName}&q_artist=${artistName}&apikey=${musixMatchApiKey}`
      )
      .then((res) => {
        console.log(res.data);
        let lyrics = res.data?.message?.body?.lyrics?.lyrics_body;
        setLyrics({ lyrics });
      })
      .catch((err) => console.log(err));
  }, []);
  return <div>{lyrics}</div>;
}

export default Lyrics;
