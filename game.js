const board = document.querySelectorAll("button");
const boardEl = document.querySelector("#board");
const resetBtn = document.getElementById("resetBtn");
const form = document.getElementById("player-form");
const cancelBtn = document.querySelector("#cancel");
const dialog = document.querySelector("#start-dialog");

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
  return { name, mark };
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
  let players = [];
  let currentPlayerIndex = 0;

  const setPlayers = (p1, p2) => {
    players = [p1, p2];
    currentPlayerIndex = 0;
  };

  const getPlayers = () => [...players];
  const getCurrentPlayer = () => players[currentPlayerIndex];

  const switchTurn = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const showBoard = () => {
    const board = Gameboard.getBoard();

    boardEl.querySelectorAll(".cell").forEach((cellEl) => {
      const i = Number(cellEl.dataset.index);
      cellEl.textContent = board[i];
    });
  };

  boardEl.addEventListener("click", (e) => {
    if (gameController.decideFate() !== "Game Ongoing") {
      boardEl.classList.add("no-hover");
      return;
    }

    const cellEl = e.target.closest(".cell");
    if (!cellEl) return;
    
    if (players.length !== 2) return;

    const index = Number(cellEl.dataset.index);
    const player = getCurrentPlayer();

    try {
      gameController.markBoard(index, player.mark);
    } catch (err) {
      return;
    }

    showBoard();

    const fate = gameController.decideFate();
    if (fate !== "Game Ongoing") {
      document.getElementById("game-info").innerText =
        fate === "Tie" ? "It's a tie!" : `${player.name} wins! (${player.mark})`;
      boardEl.classList.add("no-hover");
      return;
    }

    switchTurn();
  });

  resetBtn.addEventListener("click", () => {
    document.getElementById("game-info").innerText = "";
    boardEl.classList.remove("no-hover");
    Gameboard.reset();
    showBoard();
    currentPlayerIndex = 0;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const playerOneName =
      document.querySelector("#player1-name").value.trim() || "Player X";
    const playerTwoName =
      document.querySelector("#player2-name").value.trim() || "Player O";

    const p1 = createPlayer(playerOneName, "X");
    const p2 = createPlayer(playerTwoName, "O");

    setPlayers(p1, p2);

    form.reset();
    dialog.close();
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#start-game")) return;
    dialog.showModal();
  });

  cancelBtn.addEventListener("click", () => dialog.close());

  showBoard();

  return { showBoard, getPlayers, getCurrentPlayer };
})();
