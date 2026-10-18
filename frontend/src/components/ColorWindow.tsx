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
  const [redStatus, setRedStatus] = useState("");
  const [blueStatus, setBlueStatus] = useState("");
  const [greenStatus, setGreenStatus] = useState("");
  const [guessNumber, setGuessNumber] = useState(1);
  const [gameState, setGameState] = useState("inGame");

  const threshold = 6;
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
        setGuessNumber((current) => Math.min(current + 1, threshold));
        let allCorrect = true;
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
          if (data.feedback !== "correct") {
            allCorrect = false;
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
        if (allCorrect) {
          setGameState("won");
        } else if (guessNumber >= threshold) {
          setGameState("lost");
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
          RedStatus={redStatus}
          GreenStatus={greenStatus}
          BlueStatus={blueStatus}
          //TODO: pass status down to here?
        />
        {gameState === "won" ? (
          <div>YOU WIN!</div>
        ) : gameState === "lost" ? (
          <div>AWWWW YOU LOST!</div>
        ) : (
          <div>
            Current Guesses : {guessNumber} / {threshold}
          </div>
        )}

        {error && (
          <p
            role="alert"
            style={{
              color: "red",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default ColorWindow;
