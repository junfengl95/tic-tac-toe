document.addEventListener('DOMContentLoaded', () => {

    const Gameboard = (function () {
        let board = ["", "", "", "", "", "", "", "", ""];

        const getBoard = () => board;
        const updateBoard = (index, marker) => {
            if (board[index] === "") {
                board[index] = marker;
                return true;
            }
            return false;
        };

        const resetBoard = () => {
            board = ["", "", "", "", "", "", "", "", ""];
        }

        return { getBoard, updateBoard, resetBoard };
    })();

    function createPlayer(symbol, name) {
        let score = 0;

        // method to update score
        const updateScore = () => {
            score++;
        }
        const getScore = () => score; // Implicit return

        const getSign = () => symbol;

        const getName = () => name;

        return { getSign, getName, updateScore, getScore }
    }

    const GameController = (function () {

    })();

    function game() {
        currentPlayer = null;
        isGameOver: false;

    }

    // Overlay 
    const closeOverlay = () => {
        document.getElementById('overlay').style.display = 'none';
    }

    const openOverlay = () => {
        document.getElementById('overlay').style.diplay = 'block';
    }

    const startButton = document.getElementById("start-game");
    const newGameBtn = document.getElementById("new-game");

    startButton.onclick = function (event) {
        event.preventDefault();
        console.log("submit button clicked")
        closeOverlay();

        const playerOneName = document.getElementById("player-1-name").value;
        const playerOneSymbol = document.getElementById("player-1-symbol").value;
        const playerTwoName = document.getElementById("player-2-name").value;
        const playerTwoSymbol = document.getElementById("player-2-symbol").value;

        playerOne = createPlayer(playerOneSymbol, playerOneName, 1);
        playerTwo = createPlayer(playerTwoSymbol, playerTwoName, 2);
    }

    newGameBtn.onclick = function (event) {
        console.log("new Game button clicked");
        openOverlay();
    }


})