const board = document.querySelectorAll("button");
const boardEl = document.querySelector("#board");
const resetBtn = document.getElementById("resetBtn");

const Gameboard = (function() {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getBoardIndex = (index) => board[index];
    const getBoard = () => board;
    const setMark = (index, mark) => {
        board[index] = mark;
    }
    const reset = () => board.fill('');

    return { getBoard, setMark, reset, getBoardIndex };
})();

const createPlayer = (name, mark) => {
    return (name, mark);
};

const gameController = (function() {
    const validate = index => {
    if (Gameboard.getBoardIndex(index) === "X" || Gameboard.getBoardIndex(index) === "O"){
        throw new Error("Position taken!");
    }
}
    const getState = () => {
        if (Gameboard.getBoardIndex(0) === "X" && Gameboard.getBoardIndex(1) === "X" && Gameboard.getBoardIndex(2) == "X"){
            return 1;
        } else if (Gameboard.getBoardIndex(3) === "X" && Gameboard.getBoardIndex(4) === "X" && Gameboard.getBoardIndex(5) == "X"){
            return 1;
        } else if (Gameboard.getBoardIndex(6) === "X" && Gameboard.getBoardIndex(7) === "X" && Gameboard.getBoardIndex(8) == "X"){
            return 1;
        } else if (Gameboard.getBoardIndex(0) === "X" && Gameboard.getBoardIndex(3) === "X" && Gameboard.getBoardIndex(6) == "X"){
            return 1;
        } else if (Gameboard.getBoardIndex(1) === "X" && Gameboard.getBoardIndex(4) === "X" && Gameboard.getBoardIndex(7) == "X"){
            return 1;
        } else if (Gameboard.getBoardIndex(2) === "X" && Gameboard.getBoardIndex(5) === "X" && Gameboard.getBoardIndex(8) == "X"){
            return 1;
        } else if (Gameboard.getBoardIndex(0) === "X" && Gameboard.getBoardIndex(4) === "X" && Gameboard.getBoardIndex(8) == "X"){
            return 1;
        } else if (Gameboard.getBoardIndex(2) === "X" && Gameboard.getBoardIndex(4) === "X" && Gameboard.getBoardIndex(6) == "X"){
            return 1;
        } else if (Gameboard.getBoardIndex(0) === "O" && Gameboard.getBoardIndex(1) === "O" && Gameboard.getBoardIndex(2) == "O"){
            return 2;
        } else if (Gameboard.getBoardIndex(3) === "O" && Gameboard.getBoardIndex(4) === "O" && Gameboard.getBoardIndex(5) == "O"){
            return 2;
        } else if (Gameboard.getBoardIndex(6) === "O" && Gameboard.getBoardIndex(7) === "O" && Gameboard.getBoardIndex(8) == "O"){
            return 2;
        } else if (Gameboard.getBoardIndex(0) === "O" && Gameboard.getBoardIndex(3) === "O" && Gameboard.getBoardIndex(6) == "O"){
            return 2;
        } else if (Gameboard.getBoardIndex(1) === "O" && Gameboard.getBoardIndex(4) === "O" && Gameboard.getBoardIndex(7) == "O"){
            return 2;
        } else if (Gameboard.getBoardIndex(2) === "O" && Gameboard.getBoardIndex(5) === "O" && Gameboard.getBoardIndex(8) == "O"){
            return 2;
        } else if (Gameboard.getBoardIndex(0) === "O" && Gameboard.getBoardIndex(4) === "O" && Gameboard.getBoardIndex(8) == "O"){
            return 2;
        } else if (Gameboard.getBoardIndex(2) === "O" && Gameboard.getBoardIndex(4) === "O" && Gameboard.getBoardIndex(6) == "O"){
            return 2;
        } else {
            if (!Gameboard.getBoard().includes("")){
                return 3;
            }
            return 0;
        }
    }

    let current = "X";
    const getCurrentPlayerMarker = () => current;
    const nextTurn = () => {
        current = current === "X" ? "O" : "X";
    }

    const markBoard = (index, mark) => {
        validate(index);
        return Gameboard.setMark(index, mark);
    }

    const decideFate = () => {
        gameState = getState();

        switch (gameState) {
            case 0:
                return "Game Ongoing";
            case 1:
                return "X wins";
            case 2:
                return "O wins";
            case 3:
                return "Tie";
        }
    }

    return { markBoard, decideFate, getCurrentPlayerMarker, nextTurn };
})();

const displayController = (() => {
  const showBoard = () => {
    const board = Gameboard.getBoard();

    boardEl.querySelectorAll(".cell").forEach((cellEl) => {
      const i = Number(cellEl.dataset.index);
      cellEl.textContent = board[i];
    });
  };

  boardEl.addEventListener("click", (e) => {
    if (gameController.decideFate() !== "Game Ongoing") {
        boardEl.classList.add('no-hover');
        return;
    }
    const cellEl = e.target.closest(".cell");
    if (!cellEl) return;

    const index = Number(cellEl.dataset.index);
    const currentPlayer = gameController.getCurrentPlayerMarker();

    const moved = Gameboard.setMark(index, currentPlayer);

    gameController.nextTurn();
    showBoard();
    gameController.decideFate();
  });

  resetBtn.addEventListener("click", () => {
    Gameboard.reset();
    showBoard();
  })

  return { showBoard };
})();

const testPlayer = createPlayer("TEST", "X");

/* Gameboard
   0  1  2  x  o  x
   3  4  5  o  x  o
   6  7  8  o  x  o
*/
displayController.showBoard();