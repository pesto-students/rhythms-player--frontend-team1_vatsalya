import { createContext, useState } from "react";

// these are the actual value
export const CurrentSongContext = createContext({
  currentSong: [],
  setCurrentSong: () => null,
});

export const CurrentSongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState([]);
  const value = { currentSong, setCurrentSong };
  return (
    <CurrentSongContext.Provider value={value}>
      {children}
    </CurrentSongContext.Provider>
  );
};
