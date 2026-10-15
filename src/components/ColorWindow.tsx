import "./colorwindow.css";
import Answer from "./Answer";
interface ColorWindowProps {
  Red: number;
  Green: number;
  Blue: number;
}
function ColorWindow({ Red, Green, Blue }: ColorWindowProps) {
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
              backgroundColor: `rgb(${Red}, ${Green}, ${Blue})`,
              width: "300px",
              height: "300px",
            }}
          ></div>
        </div>

        <Answer></Answer>
      </div>
    </div>
  );
}

export default ColorWindow;
