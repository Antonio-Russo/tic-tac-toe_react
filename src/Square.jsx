import React from "react";

const Square = (props) => {
  const { currentVal, onClick } = props;
  return (
    <div
      className="square"
      style={{ color: currentVal === "X" ? "#33AFCA" : "#E24226" }}
      onClick={onClick}
    >
      <div className="inner">
        {typeof currentVal === "string" ? currentVal : ""}
      </div>
    </div>
  );
};

export default Square;
