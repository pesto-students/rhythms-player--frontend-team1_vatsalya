import React from "react";
import { useState } from "react";

// get user data for the current status of follow button

function Button_follow() {
  const [follow, setFollow] = useState();
  const [isFollowing, setIsFollowing] = useState(true);
  const changeStatus = () => {
    if (isFollowing) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  };
  const styles = {
    color: {
      "background-color": isFollowing ? "#9494b8" : "#00ff00",
    },
  };
  return (
    <div>
      <button
        className=" w-20 h-fit p-2 rounded-2xl text-black"
        style={styles.color}
        onClick={changeStatus}
      >
        {isFollowing ? "unfollow" : "follow"}
      </button>
    </div>
  );
}

export default Button_follow;
