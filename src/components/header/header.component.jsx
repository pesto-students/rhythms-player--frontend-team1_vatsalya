import React from "react";
import Avatar from "./avatar";
import Logo from "./Logo.component";
import SearchBar from "./SearchBar.component";
import User from "../user/user";
import Language from "../header/language.component";
import LoginButton from "./Login_btn";
import SignupButton from "./signup";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
function Header() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div className="w-full h-20 bg-slate-800    flex space-x-10 items-center justify-between">
      <Logo />
      <SearchBar />
      <Language />
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}

      <Avatar user={User} />
    </div>
  );
}

export default Header;
