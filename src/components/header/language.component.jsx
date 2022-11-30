import React, { useState } from "react";

function Language() {
  const data = [
    { value: 1, name: "ENGLISH" },
    { value: 2, name: "HINDI" },
    { value: 3, name: "PUNJABI" },
    { value: 4, name: "GUJARATI" },
  ];
  return (
    <div className="flex flex-col  ">
      <select className="">
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Language;
