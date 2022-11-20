import React from "react";
import Logo from "./Logo.component";
import SearchBar from "./SearchBar.component";

function Header() {
  return (
    <div className="w-full h-20 bg-slate-800  text-4xl text-blue-50  flex space-x-10 items-center">
      <Logo />
      <SearchBar />
    </div>
  );
}

export default Header;
