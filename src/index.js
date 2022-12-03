import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/user.component";
// import { Auth0Provider } from "@auth0/auth0-react";
import { TokenProvider } from "./context/spotify.token";
import { CurrentSongProvider } from "./context/currentSong.context";
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  
      <CurrentSongProvider>
        <TokenProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </TokenProvider>
      </CurrentSongProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
