import "./colorwindow.css";
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
        />
      </div>
    </div>
  );
}

export default ColorWindow;
