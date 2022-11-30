import "./App.css";

import Spotify from "./components/audio/Spotify";
function App() {
  return (
    <div className="App">
      {/* if log in  check then render  */}
      <Spotify />
    </div>
  );
}

export default App;
