import React, { useState } from "react";
import "./App.css";
import Game from "./Game";
import Mode from "./Mode";

function App() {
  const [mode, setMode] = useState(null);
  return (
    <div className="App">
      {mode ? <Game mode={mode} /> : <Mode setMode={setMode} />}
    </div>
  );
}

export default App;
