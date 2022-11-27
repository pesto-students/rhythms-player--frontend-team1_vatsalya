import React, { useState } from "react";

function Language() {
  const [currentLanguage, setCurrentLanguage] = useState("ENGLISH");
  return (
    <div className="flex flex-col  ">
      <div>{currentLanguage}</div>
      <ul className="flex flex-col gap-4">
        <li>ENGLISH</li>
        <li>HINDI</li>
        <li>PUNJABI</li>
        <li>GUJARATI</li>
      </ul>
    </div>
  );
}

export default Language;
