import React from "react";
import { useNavigate } from "react-router-dom";

function Dropdown() {
  const navigate = useNavigate();
  const logOut = () =>{
    window.localStorage.clear();
    navigate("/")
  }
  return (
    <div className=" flex flex-col dropDownProfile">
      <ul className=" flex flex-col gap-4 justify-center items-center">
        <li>User Profile</li>
        <li>User Stats</li>
        <li>Settings</li>
        <li onClick={logOut}>Log Out</li>
      </ul>
    </div>
  );
}

export default Dropdown;
