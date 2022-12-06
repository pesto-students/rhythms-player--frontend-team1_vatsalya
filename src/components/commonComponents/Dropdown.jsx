import React from "react";

function Dropdown() {
  return (
    <div className=" flex flex-col dropDownProfile">
      <ul className=" flex flex-col gap-4 justify-center items-center">
        <li>User Profile</li>
        <li>User Stats</li>
        <li>Settings</li>
        <li>Log Out</li>
      </ul>
    </div>
  );
}

export default Dropdown;
