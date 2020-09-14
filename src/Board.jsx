import React, { Fragment, useEffect, useState } from "react";
import Score from "./Score";
import Square from "./Square";

const Board = (props) => {
  const { mode } = props;
  const initialBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //[...Array(9)].fill(null);
  const [squares, setSquares] = useState(initialBoard);
  const [xTurn, setXTurn] = useState(true);
  const [winSet, setWinSet] = useState([0, 0]);

  const winning = (board, player) => {
    if (
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    ) {
      return true;
    } else {
      return false;
    }
  };

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

  const avail = (reboard) => {
    return reboard.filter((s) => s !== "X" && s !== "O");
  };

  const declarationType = (stringDec) => {
    setTimeout(() => {
      alert(stringDec);
      setSquares([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      return;
    }, 500);
  };

  useEffect(() => {
    let cloneWinSet = [...winSet];
    let winner = calculateWinner(squares);
    if (!winner) return;
    if (winner === "X") cloneWinSet[0] = cloneWinSet[0] + 1;
    else cloneWinSet[1] = cloneWinSet[1] + 1;
    if (winner) {
      declarationType(!xTurn ? "Player X WIN" : "Player 0 WIN");
    } else if (avail(squares).length === 0) {
      declarationType("TIE");
    }
    setWinSet(cloneWinSet);
  }, [squares]);

  async function handleClickMoveAI(index) {
    const cloneBoard = [...squares];
    if (cloneBoard[index] !== "X" && cloneBoard[index] !== "O") {
      cloneBoard[index] = "X";
      const winnerDeclared = Boolean(calculateWinner(cloneBoard));
      if (winnerDeclared) {
        declarationType("YOU WIN");
      } else if (avail(cloneBoard).length === 0) {
        declarationType("TIE");
      } else {
        var newindex = minMaxMove(cloneBoard, "O").index;
        cloneBoard[newindex] = "O";
        const winnerAIDeclared = Boolean(calculateWinner(cloneBoard));
        if (winnerAIDeclared) {
          declarationType("YOU LOSE");
        } else if (avail(cloneBoard).length === 0) {
          declarationType("TIE");
        }
      }
    }

    return cloneBoard;
  }

  const handleClickMove = (index) => {
    const cloneBoard = [...squares];

    const winnerDeclared = Boolean(calculateWinner(cloneBoard));
    const squareFilled = typeof cloneBoard[index] !== "number";
    if (winnerDeclared || squareFilled) return;
    cloneBoard[index] = xTurn ? "X" : "0";
    setSquares(cloneBoard);
    setXTurn(!xTurn);
  };

  const handleClick = (currentIndex) => {
    handleClickMoveAI(currentIndex).then((newBoard) => {
      setSquares(newBoard);
      setXTurn(true);
    });
  };

  const minMaxMove = (reboard, player) => {
    let array = avail(reboard);
    if (winning(reboard, "X")) {
      return {
        score: -10,
      };
    } else if (winning(reboard, "O")) {
      return {
        score: 10,
      };
    } else if (array.length === 0) {
      return {
        score: 0,
      };
    }

    let moves = [];
    let g;
    for (let i = 0; i < array.length; i++) {
      var move = {};
      move.index = reboard[array[i]];
      reboard[array[i]] = player;

      if (player === "O") {
        g = minMaxMove(reboard, "X");
        move.score = g.score;
      } else {
        g = minMaxMove(reboard, "O");
        move.score = g.score;
      }
      reboard[array[i]] = move.index;
      moves.push(move);
    }

    var bestMove;
    let bestScore;
    if (player === "O") {
      bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  };

  return (
    <Fragment>
      <div className="board">
        <Score placement="top" xTurn={xTurn} winScore={winSet[0]} />

        {[...Array(3)].map((e, k) => (
          <div className="row" id={"ROWK_" + k} key={"row_" + k}>
            {[...Array(3)].map((e, i) => (
              <Square
                onClick={(e) => {
                  let currentIndex = 3 * k + i;
                  mode === "A"
                    ? handleClick(currentIndex)
                    : handleClickMove(currentIndex);
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
