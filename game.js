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
        const board = Gameboard.getBoard();

        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;

            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                return board[a] === "X" ? 1 : 2;
            }
        }

        if(!board.includes("")) {
            return 3;
        }

        return 0;
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

    const moved = gameController.markBoard(index, currentPlayer);

    gameController.nextTurn();
    showBoard();

    if (gameController.decideFate() !== "Game Ongoing"){
        document.getElementById("game-info").innerText = gameController.decideFate();
    }
  });

  resetBtn.addEventListener("click", () => {
    document.getElementById("game-info").innerText = "";
    Gameboard.reset();
    showBoard();
  })

  return { showBoard };
})();

const testPlayer = createPlayer("TEST", "X");