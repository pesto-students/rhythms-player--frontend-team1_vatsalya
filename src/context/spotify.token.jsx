import { createContext, useState } from "react";

// these are the actual value
export const TokenContext = createContext({
  Token: null,
  setToken: () => null,
});

export const TokenProvider = ({ children }) => {
  const [Token, setToken] = useState(null);
  const value = { Token, setToken };
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};
