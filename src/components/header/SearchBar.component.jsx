import React from "react";
import { BsSearch } from "react-icons/bs";
function SearchBar() {
  return (
    <div className=" flex items-baseline">
      <input className="rounded-md drop-shadow-md border-none w-45 h-7 outline-none text-black p-4   text-base"></input>
      <BsSearch className=" h-7 " />
    </div>
  );
}

export default SearchBar;
