import axios from "axios";
import React, { useEffect, useState } from "react";
const musixMatchApiKey = `17dec0e1673916834f5044a23b8107d4`;
const format_url = `?format=json&callback=callback`;
function Lyrics({ trackData }) {
  console.log(trackData);
  const [lyrics, setLyrics] = useState(`You say you love me, I say you crazy

  We're nothing more than friends
  
  You're not my lover, more like a brother
  
  I known you since we were like ten, yeah
  
  
  [Refrain: Anne-Marie]
  
  Don't mess it up, talking that shit
  
  Only gonna push me away, that's it!
  
  When you say you love me, that make me crazy
  
  Here we go again
  
  
  [Pre-Chorus: Anne-Marie]
  
  Don't go look at me with that look in your eye
  
  You really ain't going away without a fight
  
  You can't be reasoned with, I'm done being polite
  
  I've told you one, two, three, four, five, six thousand times
  
  
  [Chorus: Anne-Marie]
  
  Haven't I made it obvious?
  
  Haven't I made it clear?
  
  Want me to spell it out for you?
  
  F-R-I-E-N-D-S
  
  Haven't I made it obvious?
  
  Haven't I made it clear?
  
  Want me to spell it out for you?
  
  F-R-I-E-N-D-S
  
  F-R-I-E-N-D-S
  
  
  [Verse 2: Anne-Marie]
  
  Have you got no shame? You looking insane
  
  Turning up at my door
  
  It's two in the morning, the rain is pouring
  
  Haven't we been here before?
  
  
  [Refrain: Anne-Marie]
  
  Don't mess it up, talking that shit
  
  Only gonna push me away, that's it!
  
  Have you got no shame? You looking insane
  
  Here we go again
  
  
  [Pre-Chorus: Anne-Marie]
  
  So don't go look at me with that look in your eye
  
  You really ain't going away without a fight
  
  You can't be reasoned with, I'm done being polite
  
  I've told you one, two, three, four, five, six thousand times
  
  
  [Chorus: Anne-Marie]
  
  Haven't I made it obvious? (Haven't I made it?)
  
  Haven't I made it clear? (Haven't I made it clear?)`);

  const artistName = trackData?.artists?.[0].name;
  const trackName = trackData?.name;
  useEffect(() => {
    console.log(artistName);
    console.log(trackName);
    async function getLyrics() {
      try {
        const response = await axios.get("http://localhost:3001/lyrics", {
          params: {
            artistName: artistName,
            trackName: trackName,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getLyrics();
  }, []);
  return <div>{lyrics}</div>;
}

export default Lyrics;
