import { createContext, useState } from "react";

// these are the actual value
export const UserContext = createContext({
  currentUser: {
    userName: "",
    userFav: [],
    userHistory: [],
    userPlaylist: [],
  },
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
