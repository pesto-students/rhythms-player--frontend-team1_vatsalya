import {
  MdExplore,
  MdOutlinePlaylistAddCheck,
  MdOutlineBookmark,
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
    icon: <MdOutlinePlaylistAddCheck />,
    name: "Playlist",
  },
];

export { SidebarList };
