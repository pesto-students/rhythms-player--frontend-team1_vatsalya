import React from "react";
import {
  MdExplore,
  MdOutlinePlaylistAddCheck,
  MdOutlineBookmark,
  MdLoop,
  MdHistory,
} from "react-icons/md";
import "./Side_bar_btn.css";
const list = [
  {
    logo: <MdExplore />,
    title: "Explore",
    id: 1,
  },
  {
    logo: <MdOutlinePlaylistAddCheck />,
    title: "Playlist",
    id: 2,
  },
  {
    logo: <MdOutlineBookmark />,
    title: "Favorites",
    id: 3,
  },
  {
    logo: <MdLoop />,
    title: "Repeated",
    id: 4,
  },
  {
    logo: <MdHistory />,
    title: "History",
    id: 5,
  },
];
function Side_btn() {
  return (
    <div className="flex flex-nowrap justify-evenly items-center">
      <ul>
        {list.map((item, index) => {
          return (
            <li className="btn" key={index}>
              {item.logo} {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Side_btn;
