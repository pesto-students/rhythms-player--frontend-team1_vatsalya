import {
  MdExplore,
  MdOutlinePlaylistAddCheck,
  MdOutlineBookmark,
  MdLoop,
  MdHistory,
} from "react-icons/md";

const SidebarList = [
  {
    id: 1,
    icon: <MdExplore />,
    name: "Explore",
  },

  {
    id: 2,
    icon: <MdOutlineBookmark />,
    name: "Favorite",
  },
  {
    id: 3,
    icon: <MdLoop />,
    name: "Repeated",
  },
  {
    id: 4,
    icon: <MdOutlinePlaylistAddCheck />,
    name: "Playlist",
  },
  {
    id: 5,
    icon: <MdHistory />,
    name: "History",
  },
];

export { SidebarList };
