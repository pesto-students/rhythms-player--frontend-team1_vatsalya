import React, { useEffect, useState } from "react";
import apiClient from "../api/spotifyApi";

function Avatar() {
  const [userProfile, setUserProfile] = useState(
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
  );
  useEffect(() => {
    apiClient.get("me").then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <img className=" rounded-full w-14 h-14 mr-6 " src={userProfile}></img>
      {/* <select className=" absolute  ">
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select> */}
    </div>
  );
}

export default Avatar;
