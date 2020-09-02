import React from "react";

const Square = (props) => {
  const { currentVal, onClick, xTurn } = props;
  return (
    <div
      className="square"
      style={{ color: currentVal === "X" ? "#33AFCA" : "#E24226" }}
      onClick={() => {
        onClick();
      }}
    >
      <div className="inner">{currentVal}</div>
    </div>
  );
};

export default Square;
