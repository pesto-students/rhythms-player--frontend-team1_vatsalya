import React, { useState, useEffect, useContext } from "react";

import { TokenContext } from "../context/spotify.token";

import axios from "axios";
const CLIENT_ID = `0608dec1b99d4c6cb506c7ac2e9c65d8`;
const CLIENT_SECRET = `e668bbcae3a94182845d632c7c75b4c5`;
function Spotify() {
  const { Token, setToken } = useContext(TokenContext);

  useEffect(() => {
    const localToken = window.localStorage.getItem("token");
    // console.log("local token" + localToken);
    if (!localToken) {
      //Api to retrieving token
      axios("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        },
        data: "grant_type=client_credentials",
      })
        .then((tokenresponse) => {
          console.log(tokenresponse.data);

          setToken(tokenresponse?.data?.access_token);
          window.localStorage.setItem(
            "token",
            tokenresponse?.data?.access_token
          );
        })
        .catch((error) => console.log(error));
    } else {
      setToken(localToken);
    }
    // return () => {
    //   setToken(null);
    //   localStorage.removeItem("token");
    // };
  }, []);

  return <div></div>;
}

export default Spotify;
