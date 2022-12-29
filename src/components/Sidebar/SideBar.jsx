import React, { useEffect } from "react";
import { SidebarList } from "./SideBarList";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const Navigate = useNavigate();
  function _navigate(id) {
    switch (id) {
      case 1:
        Navigate("/Home");
        break;
      case 2:
        Navigate("/Favorite");
        break;

      case 3:
        Navigate("/Playlist");
        break;
      default:
        Navigate("/");
    }
  }
  useEffect(() => {
    const _list = document
      .querySelector(".menuContainer ul")
      .querySelectorAll("li");
    function changeMenuActive() {
      _list.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }
    _list.forEach((n) => {
      n.addEventListener("click", changeMenuActive);
    });
  }, []);
  return (
    <div className="  w-fit  h-full min-h-screen bg-zinc-600  px-4 max-sm:w-20 lg:w-fit  ">
      <div className="menuContainer">
        <ul>
          {SidebarList.map((item) => (
            <li key={item.id} onClick={() => _navigate(item.id)}>
              <a href="#">
                <i>{item.icon}</i>
                <span className="max-sm:hidden ">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { SideBar };
