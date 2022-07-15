import React from "react";
import Timer from "./Timer";

const StopWatch = (props) => {
  return (
    <>
      <div className="text-white stop-watch">
        <Timer time={props.time} />
      </div>
      <div className="text-white time">
        My best time:{props.highScore / 1000}s!
      </div>
    </>
  );
};

export default StopWatch;
