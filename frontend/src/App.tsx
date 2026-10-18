import { useState, useEffect } from "react";
import "./App.css";
import "./components/ColorWindow";
import ColorWindow from "./components/ColorWindow";
interface Color {
  red: number;
  green: number;
  blue: number;
}

function App() {
  const [color, setColor] = useState<Color | null>(null);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.API_BASE_URL;
  useEffect(() => {
    async function startGame() {
      try {
        console.log(API_URL);
        const response = await fetch(`${API_URL}/api/start`, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(
            `Could not load the color (HTTP ${response.status}).`,
          );
        }

        const data = await response.json();
        console.log(data);
        setColor(data);
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error ? error.message : "Could not load the color.",
        );
      }
    }

    startGame();
  }, []);

  return (
    <div className="page">
      <div className="title">
        <h1>Palettle</h1>
        {error ? (
          <p role="alert">{error}</p>
        ) : color ? (
          <ColorWindow Red={color.red} Green={color.green} Blue={color.blue} />
        ) : (
          <p>Loading color...</p>
        )}
      </div>
    </div>
  );
}

export default App;
