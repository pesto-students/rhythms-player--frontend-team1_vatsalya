// import React, { createContext, useState } from "react";
// // const [currentIndex, setCurrentIndex] = useState(0);
// export const currentIndexContext = createContext({
//   currentIndex: null,
//   setCurrentIndex: () => null,
// });

// export const currentIndexProvider = ({ children }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const value = { currentIndex, setCurrentIndex };
//   return (
//     <currentIndexContext.Provider value={value}>
//       {children}
//     </currentIndexContext.Provider>
//   );
// };
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
