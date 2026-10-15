import InputBox from "./InputBox";
import "./Answer.css";
function Answer() {
  return (
    <div>
      <div className="eyebrows">
        <div># Red</div>
        <div># Green</div>
        <div># Blue</div>
      </div>
      <div className="inputs">
        <InputBox />
        <InputBox />
        <InputBox />
      </div>
    </div>
  );
}

export default Answer;
