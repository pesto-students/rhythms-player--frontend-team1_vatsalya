import React from "react";
import { MainContainer } from "../MainContainer";
import { Outlet } from "react-router-dom";
function Rhythms() {
  return (
    <div>
      <div className="flex">
        <div className=" w-screen h-screen bg-[#4B4A4A]">
          <MainContainer />
        </div>
      </div>
    </div>
  );
}

export default Rhythms;
