import React, { useState, useContext, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import { TokenContext } from "../context/spotify.token";
import Language from "./commonComponents/Language.component";
import Dropdown from "./commonComponents/Dropdown";
function Header({ searchResult }) {
  const { Token } = useContext(TokenContext);
  const userName = window.localStorage.getItem("userName");
  const type = ["album", "artist", "playlist", "track"];
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(searchInput, 2000);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    async function fetchData(e) {
      const token = Token;
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: debouncedSearch,
          type: "track,artist",
          market: "IN",
          limit: "20",
          offset: "0",
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      searchResult(JSON.stringify(response?.data));
      setSearchInput(" ");
      navigate("/search");
    }
    if (debouncedSearch) {
      fetchData();
    }
  }, [debouncedSearch]);
  return (
    <div className="flex p-2 w-screen h-24 bg-[rgb(43,42,42)] justify-between">
      <div className="flex items-center justify-between w-screen">
        <div className=" flex">
          <div className=" w-10 h-10 bg-white rounded-full flex justify-center content-center">
            <Link to="/home">
              {" "}
              <svg
                className=""
                width="35"
                height="35"
                viewBox="0 0 288 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34 220C29.5351 220 25.1138 218.903 20.9888 216.772C16.8637 214.642 13.1155 211.519 9.95835 207.581C6.80116 203.644 4.29674 198.97 2.58808 193.826C0.879424 188.682 2.49463e-07 183.168 2.49463e-07 177.6V156.4C2.49464e-07 145.155 3.58212 134.37 9.95835 126.419C16.3346 118.467 24.9826 114 34 114V114L34 220Z"
                  fill="#6C63FF"
                />
                <path
                  d="M254 114C258.465 114 262.886 115.097 267.011 117.227C271.136 119.358 274.884 122.481 278.042 126.419C281.199 130.356 283.703 135.03 285.412 140.174C287.121 145.318 288 150.832 288 156.4V177.6C288 183.168 287.121 188.682 285.412 193.826C283.703 198.97 281.199 203.644 278.042 207.581C274.884 211.519 271.136 214.642 267.011 216.773C262.886 218.903 258.465 220 254 220V220V114H254Z"
                  fill="#6C63FF"
                />
                <path
                  d="M272 160H266.542C266.542 75.4519 210.224 6.66666 141 6.66666C71.7763 6.66666 15.4583 75.4519 15.4583 160H10C10 71.7757 68.7664 0 141 0C213.234 0 272 71.7757 272 160Z"
                  fill="#6C63FF"
                />
              </svg>
            </Link>
          </div>
          <h2 className=" text-center mx-4  font-bold text-white text-3xl max-sm:text-xl max-sm:hidden">
            <Link to="/home"> Rhythms </Link>
          </h2>
        </div>

        <div className=" text-slate-300 w-60 h-10  relative my-2 flex overflow-hidden rounded-xl shadow-gray-900 max-sm:w-28">
          <input
            type="text"
            placeholder="Search..."
            className=" w-full h-full outline-none border-none bg-slate-600 px-10 text-gray-50 font-medium "
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <i className=" absolute top-3 left-2 text-zinc-900  w-10 h-10 text-center  ">
            <BsSearch />
          </i>
        </div>
        {/* <div>
          <Language />
        </div> */}
        <div className="pr-8" onClick={() => setOpen(!open)}>
          <label className="mx-4 my-4 font-bold text-white text-xl max-sm:text-x">
            {" "}
            {userName}{" "}
          </label>
          <img
            src="https://picsum.photos/20"
            className="avatar w-16 h-16 "
          ></img>
        </div>
        {open ? <Dropdown /> : ""}
      </div>

      {/* <User/> */}
    </div>
  );
}

export { Header };
