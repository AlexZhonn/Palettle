import "./Answer.css";
import Arrow from "./Arrow";
interface AnswerProps {
  red: string;
  green: string;
  blue: string;
  onRedChange: (value: string) => void;
  onGreenChange: (value: string) => void;
  onBlueChange: (value: string) => void;
  RedStatus: string;
  GreenStatus: string;
  BlueStatus: string;
}
function Answer({
  red,
  green,
  blue,
  onRedChange,
  onGreenChange,
  onBlueChange,
  RedStatus,
  GreenStatus,
  BlueStatus,
}: AnswerProps) {
  return (
    <div className="answer">
      <label>
        Red
        <div className="inputs-arrows">
          <input
            type="text"
            inputMode="numeric"
            value={red}
            onChange={(event) => {
              const value = event.target.value;

              if (
                value === "" ||
                (/^\d{1,3}$/.test(value) && Number(value) <= 255)
              ) {
                onRedChange(value);
              }
            }}
            disabled={RedStatus === "correct"}
            style={
              RedStatus === "correct"
                ? {
                    background: "green",
                  }
                : {
                    background: "white",
                  }
            }
          />
          {RedStatus === "increase" ? (
            <Arrow direction={true}></Arrow>
          ) : RedStatus === "decrease" ? (
            <Arrow direction={false}></Arrow>
          ) : null}
        </div>
      </label>

      <label>
        Green
        <div className="inputs-arrows">
          <input
            type="text"
            inputMode="numeric"
            value={green}
            onChange={(event) => {
              const value = event.target.value;

              if (
                value === "" ||
                (/^\d{1,3}$/.test(value) && Number(value) <= 255)
              ) {
                onGreenChange(value);
              }
            }}
            disabled={GreenStatus === "correct"}
            style={
              GreenStatus === "correct"
                ? {
                    background: "green",
                  }
                : {
                    background: "white",
                  }
            }
          />
          {GreenStatus === "increase" ? (
            <Arrow direction={true}></Arrow>
          ) : RedStatus === "decrease" ? (
            <Arrow direction={false}></Arrow>
          ) : null}
        </div>
      </label>

      <label>
        Blue
        <div className="inputs-arrows">
          <input
            type="text"
            inputMode="numeric"
            value={blue}
            onChange={(event) => {
              const value = event.target.value;

              if (
                value === "" ||
                (/^\d{1,3}$/.test(value) && Number(value) <= 255)
              ) {
                onBlueChange(value);
              }
            }}
            disabled={BlueStatus === "correct"}
            style={
              BlueStatus === "correct"
                ? {
                    background: "green",
                  }
                : {
                    background: "white",
                  }
            }
          />
          {BlueStatus === "increase" ? (
            <Arrow direction={true}></Arrow>
          ) : RedStatus === "decrease" ? (
            <Arrow direction={false}></Arrow>
          ) : null}
        </div>
      </label>
    </div>
  );
}

export default Answer;
