import React, { Fragment, useEffect, useState } from "react";
import Score from "./Score";
import Square from "./Square";

const Board = () => {
  const initialBoard = [...Array(9)].fill(null);
  const [squares, setSquares] = useState(initialBoard);
  const [xTurn, setXTurn] = useState(true);
  const [winSet, setWinSet] = useState([0, 0]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // row win
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // col win
      [0, 4, 8],
      [2, 4, 6], //diagonals win
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[b] &&
        squares[c] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // x or 0
      }
    }
    return null;
  };

  useEffect(() => {
    let cloneWinSet = [...winSet];
    let winner = calculateWinner(squares);
    if (!winner) return;
    if (winner === "X") cloneWinSet[0] = cloneWinSet[0] + 1;
    else cloneWinSet[1] = cloneWinSet[1] + 1;
    setWinSet(cloneWinSet);
  }, [squares]);

  const handleClickMove = (index) => {
    const cloneBoard = [...squares];

    const winnerDeclared = Boolean(calculateWinner(cloneBoard));
    const squareFilled = Boolean(cloneBoard[index]);
    if (winnerDeclared || squareFilled) return;

    cloneBoard[index] = xTurn ? "X" : "0";
    setSquares(cloneBoard);
    setXTurn(!xTurn);
  };

  return (
    <Fragment>
      <div className="board">
        <Score placement="top" xTurn={xTurn} winScore={winSet[0]} />

        {[...Array(3)].map((e, k) => (
          <div className="row" id={"ROWK_" + k} key={"row_" + k}>
            {[...Array(3)].map((e, i) => (
              <Square
                onClick={() => {
                  handleClickMove(3 * k + i);
                }}
                currentVal={squares[3 * k + i]}
                key={"square_" + i + k}
              />
            ))}
          </div>
        ))}
        <Score placement="bottom" xTurn={xTurn} winScore={winSet[1]} />
      </div>
    </Fragment>
  );
};

export default Board;
