import { createContext, useState } from "react";

// these are the actual value
export const CurrentIndex = createContext({
  currentIndex: 0,
  setCurrentIndex: () => null,
});

export const CurrentIndexProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const value = { currentIndex, setCurrentIndex };
  return (
    <CurrentIndex.Provider value={value}>{children}</CurrentIndex.Provider>
  );
};
