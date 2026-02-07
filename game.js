const output = document.getElementById('output');

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

    const markBoard = (index, mark) => {
        validate(index);
        return Gameboard.setMark(index, mark);
    }

    const decideFate = () => {
        if (getState() === 0){
            return ("Game is still ongoing");
        } else if(getState() === 1){
            throw new Error("X wins");
        } else if(getState() === 2){
            throw new Error("O wins");
        } else if (getState() === 3){
            throw new Error("Tie Game!");
        }
    }

    return { markBoard, decideFate };
})();

const displayController = (function() {

})();

const testPlayer = createPlayer("TEST", "X");

/* Gameboard
   0  1  2  x  o  x
   3  4  5  o  x  o
   6  7  8  o  x  o
*/
output.addEventListener("click", function() {
    output.textContent = "X";
    gameController.markBoard(0, "X");
    console.log(Gameboard.getBoard());
});