const Gameboard = (function() {
    const board = ['', '', '','', '', '', '', '', ''];

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
};
    const markBoard = (index, mark) => {
        validate(index);
        return Gameboard.setMark(index, mark);
    };

    const decideFate = () => {
    }

    return { markBoard, decideFate };
})();

const testPlayer = createPlayer("TEST", "X");

// gameController.markBoard(3, "O");
// gameController.markBoard(3, "X");
// console.log(Gameboard.getBoard());