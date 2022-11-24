import React from "react";
import { BsSearch } from "react-icons/bs";
function SearchBar() {
  return (
    <div className=" bg-white object-contain rounded-full ">
      <div className=" flex items-baseline">
        <input
          type="search"
          placeholder="search music"
          className="rounded-full drop-shadow-md border-none w-45 h-7 outline-none text-black p-4   text-base"
        ></input>
        {/* <BsSearch className=" h-6 " /> */}
      </div>
    </div>
  );
}

export default SearchBar;
