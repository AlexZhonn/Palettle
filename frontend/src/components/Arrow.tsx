import "./Arrow.css";
interface ArrowProps {
  direction: boolean;
}

function Arrow({ direction }: ArrowProps) {
  return (
    <div>
      {direction ? (
        <div className="up">
          <img src={"./arrow_up.png"} />
        </div>
      ) : (
        <div className="down">
          <img src={"./arrow_down.png"} />
        </div>
      )}
    </div>
  );
}

export default Arrow;
