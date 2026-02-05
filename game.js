const Gameboard = (function() {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;
    const setMark = (index, mark) => {
        board[index] = mark;
    }
    const reset = () => board.fill('');

    return { getBoard, setMark, reset };
})();

const createPlayer = (name, mark) => {
    return (name, mark);
};

const gameController = (function() {
    // Validate currently doesn't work how I think it should work, right now it does nothing
    // TODO: fix validate logic!
    
    const validate = index => {
    if (Gameboard.getBoard(index) === "X" || Gameboard.getBoard(index)){
        throw new Error("Position taken!");
    }
};
    const equis = (index, mark) => {
        validate(index);
        return Gameboard.setMark(index, mark);
    };
    const o = (index, mark) => {
        validate(index);
        return Gameboard.setMark(index, mark);
    };

    return { equis, o };
})();

const testPlayer = createPlayer("TEST", "X");

gameController.equis(3, "X");
gameController.o(3, "O");
console.log(Gameboard.getBoard());