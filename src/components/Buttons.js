import React from "react";

const Buttons = (props) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-danger rounded-0"
        onClick={() => {
          props.handleReset();
        }}
      >
        {"Reset"}
      </button>
    </>
  );
};

export default Buttons;
