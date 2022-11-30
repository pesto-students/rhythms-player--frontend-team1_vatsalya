import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Search(prop) {
  const [result, setResult] = useState("");
  useEffect(() => {
    const data = prop.searchData;
    const parsed = JSON.parse(data);
    setResult(parsed);
    console.log(parsed);
  }, []);
  return (
    <div className=" w-screen h-screen bg-red-700">
      {result.tracks?.items?.map((item, index) => {
        <p>{item.name}</p>;
      })}
    </div>
  );
}

export default Search;
