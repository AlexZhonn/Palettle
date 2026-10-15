import "./Answer.css";
interface AnswerProps {
  red: string;
  green: string;
  blue: string;
  onRedChange: (value: string) => void;
  onGreenChange: (value: string) => void;
  onBlueChange: (value: string) => void;
}
function Answer({
  red,
  green,
  blue,
  onRedChange,
  onGreenChange,
  onBlueChange,
}: AnswerProps) {
  return (
    <div className="answer">
      <label>
        # Red
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
        />
      </label>

      <label>
        # Green
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
        />
      </label>

      <label>
        # Blue
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
        />
      </label>
    </div>
  );
}

export default Answer;
