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
  useEffect(() => {
    async function startGame() {
      try {
        const response = await fetch("/api/start", {
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
  useEffect(() => {
    async function evaluate() {
      try {
        const guesses = { red, green, blue };

        for (const channel of ["red", "green", "blue"] as const) {
          const response = await fetch(`/api/evaluate/${channel}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              [channel]: guesses[channel],
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error ?? "Could not evaluate the guess.");
          }

          console.log(channel, data.feedback);
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
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
