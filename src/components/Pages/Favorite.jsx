import axios from "axios";
import { TokenContext } from "../../context/spotify.token";
import React, { useEffect, useState, useContext } from "react";
import { API } from "../../config/APIConfig";
import { arraySlice } from "three/src/animation/AnimationUtils";
function Favorite() {
  const token = useContext(TokenContext);
  const [fav, setFav] = useState();
  useEffect(() => {
    async function getfav() {
      const favUrl = `${API.BACKEND_BASE_URL}/liked-songs`;
      const res = await axios.get(favUrl);
      console.log(res);
      setFav(res.data);

      const Ids = [];
      fav.forEach((item) => {
        Ids.push(item.song_id);
      });

      console.log(Ids.join());
      const ids = Ids.join();
      const response = await axios.get("https://api.spotify.com/v1/tracks", {
        params: {
          market: "IN",
          ids: ids,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(response);
    }

    getfav();
  }, []);
  return <div className=" bg-orange-800">Favorite</div>;
}

export default Favorite;
