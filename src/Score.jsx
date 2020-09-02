import React from "react";

const Score = (props) => {
  const { placement, xTurn, winScore } = props;
  return (
    <div
      className={
        "score " +
        placement +
        ((xTurn && placement === "top") || (!xTurn && placement === "bottom")
          ? " active"
          : "")
      }
    >
      <div>Player: {placement === "top" ? "X" : "0"} </div>
      <div className="scorePlayer">
        {winScore}
        <br /> Win
      </div>
    </div>
  );
};

export default Score;
