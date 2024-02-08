import { useState } from "react";

// If you have extra time or want to practice your new React skills,
// here are some ideas for improvements that you could make to the tic-tac-toe game,
// listed in order of increasing difficulty:

// 1. Remove history buttons from the move history list. ✔️
// 2. For the current move only, show “You are at move #…” instead of a button. ✔️
// 3. Rewrite Board to use two loops to make the squares instead of hardcoding them. (in my project)
// 4. Add a toggle button that lets you sort the moves in either ascending
// or descending order. ✔️
// 5. When someone wins, highlight the three squares that caused the win ✔️
// (and when no one wins, display a message about the result being a draw). ✔️
// 6. Display the location for each move in the format (row, col) in the move
// history list.

function Square({ value, onSquareClick, winner }) {
  return (
    <button
      className={`square ${winner ? "winner-box" : ""}`}
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let winnerBoxes = [];
  let status;
  if (winner) {
    status = `Winner: ${winner[0]}`;
    winnerBoxes = winner.slice(1);
  } else if (!squares.includes(null)) {
    status = "Draw!!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <div
        className="status"
        style={{
          backgroundColor: status == "Draw!!" ? "red" : "",
        }}>
        {status}
      </div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          winner={winnerBoxes.includes(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          winner={winnerBoxes.includes(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          winner={winnerBoxes.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          winner={winnerBoxes.includes(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          winner={winnerBoxes.includes(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          winner={winnerBoxes.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          winner={winnerBoxes.includes(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          winner={winnerBoxes.includes(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          winner={winnerBoxes.includes(8)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); //used to get the turns & current board
  const [isAscending, setIsAscending] = useState(true); //used to sort the moves
  const [movesList, setMovesList] = useState([]); //used to get the moves
  const xIsNext = currentMove % 2 === 0; // returns true or false
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    if (history) {
      let index;
      let moveObj;
      if (history.length >= 2) {
        const lastTwoBoards = history.slice(-2);
        const lastBoard = lastTwoBoards[0];
        const secondLastBoard = lastTwoBoards[1];
        index = diffIndexes(secondLastBoard, lastBoard)[0];
        moveObj = getRowAndColumn(index);
        setMovesList([...movesList, moveObj]);
      } else if (history.length == 1) {
        index = history[0].findIndex((v) => v !== null);
        moveObj = getRowAndColumn(index);
        setMovesList([...movesList, moveObj]);
      }
    }
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    console.log(`################`);
    console.log(moves);
    setCurrentMove(nextMove);
    const moves = movesList.slice(0, nextMove);
    console.log(moves);
    setMovesList(moves);
  }

  function toggleOrder() {
    setIsAscending(!isAscending);
  }

  function diffIndexes(a, b) {
    let indexes = [];
    a.forEach((v, i) => {
      if (v !== b[i]) {
        indexes.push(i);
      }
    });
    return indexes;
  }

  function getRowAndColumn(index) {
    let row;
    let col;
    // if index between 0 & 2 row = 1, between 3 & 5 row = 2, between 6 & 8 row = 3
    if (index >= 0 && index <= 2) {
      row = 1;
    } else if (index >= 3 && index <= 5) {
      row = 2;
    } else if (index >= 6 && index <= 8) {
      row = 3;
    }
    // if index is 0 or 3 or 6 col = 1, if index is 1 or 4 or 7 col = 2, if index is 2 or 5
    // or 8 col = 3
    if (index == 0 || index == 3 || index == 6) {
      col = 1;
    } else if (index == 1 || index == 4 || index == 7) {
      col = 2;
    } else if (index == 2 || index == 5 || index == 8) {
      col = 3;
    }
    return { row, col };
  }

  // function getMoveDescription(history) {
  //   const lastTwoBoards = history.slice(-2);
  //   const lastBoard = lastTwoBoards[0];
  //   const secondLastBoard = lastTwoBoards[1];
  //   const index = diffIndexes(secondLastBoard, lastBoard)[0];
  //   const moveObj = getRowAndColumn(index);
  //   setMovesList([...movesList, moveObj]);
  // }

  const moves = isAscending
    ? history.slice(0, currentMove + 1).map((squares, move) => {
        let description;
        if (move > 0) {
          description = `Go to move: row ${movesList[move]?.row}, col ${movesList[move]?.col}`;
        } else {
          description = "Go to game start";
        }

        return move == currentMove ? (
          <p key={move}>You are at move {move}</p>
        ) : (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
      })
    : history
        .slice(0, currentMove + 1)
        .map((squares, move) => {
          let description;
          if (move > 0) {
            description = "Go to move #" + move;
          } else {
            description = "Go to game start";
          }

          return move == currentMove ? (
            <p key={move}>You are at move {move}</p>
          ) : (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
          );
        })
        .reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>
          <button type="button" onClick={toggleOrder}>
            Toggle Buttons Order
          </button>
        </div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;
}
