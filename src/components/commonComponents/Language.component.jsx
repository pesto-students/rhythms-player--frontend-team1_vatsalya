import React from "react";

function Language() {
  return (
    <div className=" flex flex-col custom-select w-60">
      <select className=" flex flex-col gap-4 justify-center items-center">
        <option value="0">English</option>
        <option value="1">Hindi</option>
        <option value="2">Punjabi</option>
        <option value="3">Tamil</option>
      </select>
      ;
    </div>
  );
}

export default Language;
