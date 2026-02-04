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

})();