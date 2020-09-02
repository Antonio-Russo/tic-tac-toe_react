import React from "react";
import Board from "./Board";

const Game = (props) => {
  const { mode } = props;
  return (
    <div className="game">
      Tic Tac Toe
      <Board mode={mode} />
    </div>
  );
};

export default Game;
