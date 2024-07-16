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

    function createPlayer(marker, name) {
        let score = 0;

        // method to update score
        const updateScore = () => {
            score++;
        }
        const getScore = () => score; // Implicit return

        const getMarker = () => { return marker };

        const getName = () => name;

        return { getMarker, getName, updateScore, getScore }
    };

    const GameController = (function () {
        let players = [];
        let currentPlayerIndex = 0;
        let isGameOver = false; // reassign after each game ends

        const startGame = (player1, player2) => {
            players = [player1, player2];
            currentPlayerIndex = 0;
            isGameOver = false;
            Gameboard.resetBoard();
            DisplayController.updateCell();
            DisplayController.setMessage(`${players[currentPlayerIndex].getName()}'s turn`)
        };

        const playRound = (index) => {
            if (isGameOver) return;

            if (Gameboard.updateBoard(index, players[currentPlayerIndex].getMarker())) {
                DisplayController.updateBoard();
                if (checkWinner()) {
                    DisplayController.setMessage(`${players[currentPlayerIndex].getName()} wins`);
                    players[currentPlayerIndex].updateScore();
                    isGameOver = true;
                } else if (isTie()) {
                    DisplayController.setMessage(`It's a tie!`);
                    isGameOver = true;
                } else {
                    currentPlayerIndex = (currentPlayerIndex + 1) % 2;
                    DisplayController.setMessage(`${players[currentPlayerIndex].getName()}'s turn`);
                }
            }
        };

        const checkWinner = () => {
            const board = Gameboard.getBoard();
            const winConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            return winConditions.some(condition => {
                combination.every(index => board[index] === players[currentPlayerIndex].getMarker());
            });
        };

        const isTie = () => {
            return Gameboard.getBoard().every(cell => cell !== "");
        };

        return { startGame, playRound };

    })();

    // Display Controller
    const DisplayController = (function () {
        const boardElement = document.getElementById("gameboard");
        const cells = document.querySelectorAll(".cell-empty");
        const messageElement = document.getElementById("message");

        cells.forEach((cell, index) => {
            cell.addEventListener("click", function(){
                if (!GameController.isGameOver()) {
                    if (GameController.playRound(index)){
                        updateCell(index);
                    }
                }
            });
        });

        const updateCell = (index) => {
            const marker = Gameboard.getBoard()[index];
            cells[index].textContent = marker;
            cells[index].disabled = true; //Disable the button
        }

        // const updateBoard = () => {
        //     const board = Gameboard.getBoard();
        //     Array.from(boardElement.children).forEach((cell, index) => {
        //         cell.textContent = board[index];
        //     })
        // };

        const setMessage = (message) => {
            messageElement.textContent = message;
        }

        return { updateCell, setMessage };

    }());

    

    const form = document.getElementById("form");
    

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Form submitted")
    
        const playerOneName = document.getElementById("player-1-name").value;
        const playerOneMarker = document.getElementById("player-1-marker").value;
        const playerTwoName = document.getElementById("player-2-name").value;
        const playerTwoMarker = document.getElementById("player-2-marker").value;

        playerOne = createPlayer(playerOneMarker, playerOneName);
        playerTwo = createPlayer(playerTwoMarker, playerTwoName);
        
        console.log("Player 1:", playerOne.getName(), playerOne.getMarker());
        console.log("Player 2:", playerTwo.getName(), playerTwo.getMarker());

        GameController.startGame(playerOne, playerTwo);
        closeOverlay();
        form.reset();
    });

    const newGameBtn = document.getElementById("new-game");

    newGameBtn.onclick = function (event) {
        event.preventDefault();
        console.log("new Game button clicked");
        openOverlay();
    };

    const cells = document.querySelectorAll(".empty-cell");

    cells.forEach(cell => {
        cell.addEventListener("click", function() {
            const index = Array.from(cells).indexOf(cell);
            GameController.playRound(index);
        });
    });

    // Overlay 
    const closeOverlay = () => {
        document.getElementById('overlay').style.display = 'none';
    }

    const openOverlay = () => {
        document.getElementById('overlay').style.diplay = 'block';
    }


})