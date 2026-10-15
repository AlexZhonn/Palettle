import "./colorwindow.css";
import { useEffect } from "react";
import { useState } from "react";
import Answer from "./Answer";
interface ColorWindowProps {
  Red: Number;
  Green: Number;
  Blue: Number;
}
function ColorWindow({ Red, Green, Blue }: ColorWindowProps) {
  const [red, setRed] = useState("");
  const [green, setGreen] = useState("");
  const [blue, setBlue] = useState("");
  const [error, setError] = useState("");
  const [redStatus, setRedStatus] = useState(0);
  const [blueStatus, setBlueStatus] = useState(0);
  const [greenStatus, setGreenStatus] = useState(0);
  useEffect(() => {
    async function evaluate() {
      try {
        const guesses = { red, green, blue };

        for (const channel of ["red", "green", "blue"] as const) {
          const value = guesses[channel];
          if (!/^\d{1,3}$/.test(value) || Number(value) > 255) {
            setError(`Enter a whole number from 0 to 255 for ${channel}.`);
            return;
          }
        }
        setError("");

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

          if (channel === "red") {
            setRedStatus(data.feedback);
          }

          if (channel === "green") {
            setGreenStatus(data.feedback);
          }
          if (channel === "blue") {
            setBlueStatus(data.feedback);
          }
        }
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error
            ? error.message
            : "Could not evaluate the guess.",
        );
      }
    }
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "Enter") {
        evaluate();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [red, green, blue]);
  return (
    <div className="color-window">
      <div className="window-dec">
        <div className="dots">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
      </div>

      <div className="window">
        <div className="color">
          <div
            style={{
              backgroundColor: `rgb(${Number(Red)}, ${Number(Green)}, ${Number(Blue)})`,
              width: "300px",
              height: "300px",
            }}
          ></div>
        </div>

        <Answer
          red={red}
          green={green}
          blue={blue}
          onRedChange={setRed}
          onGreenChange={setGreen}
          onBlueChange={setBlue}
          //TODO: pass status down to here?
        />
        {error && <p role="alert">{error}</p>}
      </div>
    </div>
  );
}

export default ColorWindow;
