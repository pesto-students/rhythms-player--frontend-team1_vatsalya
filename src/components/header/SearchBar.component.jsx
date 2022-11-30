import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { SearchHistory } from "../api/SearchHistory";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

function SearchBar() {
  const type = "track";
  const [searchInput, setSearchInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState();
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(searchInput, 1000);
  useEffect(() => {
    async function fetchData(e) {
      setLoading(true);
      const token = window.localStorage.getItem("token");
      // const search = e.target.value;

      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: {
          q: debouncedSearch,
          type: type,
          market: "IN",
          limit: "10",
          offset: "0",
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      setData(response.data);
      navigate("search");
    }
    if (debouncedSearch) {
      fetchData();
    }
  }, [debouncedSearch]);

  return (
    <div className=" bg-white w-80  rounded-full flex ">
      <input
        type="search"
        placeholder="search music"
        className="  border-none w-full h-7 outline-none text-black p-4   text-base rounded-full"
        onChange={(e) => setSearchInput(e.target.value)}
      ></input>
      <BsSearch className=" h-6 relative mx-2 font-bold" />
    </div>
  );
}

export default SearchBar;
