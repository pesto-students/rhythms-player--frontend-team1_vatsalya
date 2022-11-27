import React from "react";
import Avatar from "./avatar";
import Logo from "./Logo.component";
import SearchBar from "./SearchBar.component";
import User from "../user/user";
import Language from "../header/language.component";
function Header() {
  return (
    <div className="w-full h-20 bg-slate-800  text-4xl text-blue-50  flex space-x-10 items-center justify-between">
      <Logo />
      <SearchBar />
      <button className=" border-2 border-white p-2 rounded-md w-fit h-10 font-normal text-lg bg-white text-black">
        ENGLISH
      </button>
      <Avatar user={User} />
    </div>
  );
}

export default Header;
