import { useEffect, useState } from "react";
import "./App.css";
import "./components/ColorWindow";
import ColorWindow from "./components/ColorWindow";
function App() {
  const [color, setColor] = useState([]);
  useEffect(() => {}, []);

  return (
    <div className="page">
      <div className="title">
        <h1>Palettle</h1>
        <ColorWindow Red={0} Green={0} Blue={0}></ColorWindow>
      </div>
    </div>
  );
}

export default App;
