import React from "react";

function Avatar(props) {
  const default_profile =
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80";
  return (
    <div>
      <img
        className=" rounded-full w-14 h-14 mr-6 "
        src={props.user.profile ? props.user.profile : default_profile}
      ></img>
    </div>
  );
}

export default Avatar;
