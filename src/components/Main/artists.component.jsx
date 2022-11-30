import React from "react";
import { useNavigate } from "react-router-dom";
function Artists({ artists }) {
  const navigate = useNavigate();

  const filter = (id) => {
    const artist = artists.filter((item, index) => {
      return item.artist_id == id;
    });

    navigate("artist");
  };
  const artist_page = () => {};
  return (
    <div className="w-full h-30 bg-secondary/50 my-20">
      <ul className="flex ">
        {artists.map((item, index) => {
          return (
            <li
              key={item.artist_id}
              className="flex-col items-center   justify-center m-2"
              onClick={() => filter(item.artist_id)}
              // onClick={() => navigate("artist")}
            >
              <img
                className="w-20 h-20 rounded-full"
                src={item.artist_profile}
                alt="image"
              ></img>
              <p className=" text-cyan-50 font-semibold capitalize text-center">
                {item.artist_name}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Artists;
