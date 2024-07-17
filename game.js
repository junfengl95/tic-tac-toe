(() => {
    document.addEventListener('DOMContentLoaded', () => {

        const buttons = document.querySelectorAll('.empty-cell');
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                gameControllerModule.playRound(index);
            });
        });

        const newGameButton = document.getElementById('new-game');
        const startForm = document.getElementById('form');
        newGameButton.addEventListener('click', () => {
            gameboardModule.resetGameboard();
            gameControllerModule.resetGame();
            startForm.reset();
            displayOverlay();
        });

        const newRound = document.getElementById('new-round');
        newRound.addEventListener('click', () => {
            gameboardModule.resetGameboard();
            gameControllerModule.resetGame();
            gameControllerModule.displayMessage(`New Round Started. ${gameControllerModule.getCurrentPlayer().name}'s turn`);
        });

        
        startForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const playerOneName = document.getElementById('player-1-name').value;
            const playerTwoName = document.getElementById('player-2-name').value;

            gameControllerModule.startGame(playerOneName, playerTwoName);
            gameControllerModule.updateScoreBoard();
            hideOverlay();
        });
    });

    // overlay control
    const displayOverlay = () => {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
    };

    const hideOverlay = () => {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
    };

    const gameboardModule = (() => {
        let gameboard = Array(9).fill("");

        const getGameboard = () => gameboard;
        const resetGameboard = () => {
            gameboard.fill("");
            updateBoardUI();
        };

        const markSpot = (index, marker) => {
            if (gameboard[index] === ""){
                gameboard[index] = marker;
                updateBoardUI();
                return true;
            } else {
                return false;
            }
        };

        const updateBoardUI = () => {
            const buttons = document.querySelectorAll(".empty-cell");
            buttons.forEach((button, index) => {
                button.textContent = gameboard[index];
                button.classList.remove('marker-x', 'marker-o'); // Remove existing classes
                if (gameboard[index] === 'X'){
                    button.classList.add('marker-x');
                } else if (gameboard[index] === "O"){
                    button.classList.add('marker-o');
                }
            });
        };

        return { getGameboard, resetGameboard, markSpot, updateBoardUI }
    })();

    const gameControllerModule = (() => {
        
        let players = [];
        let isGameOver= false;

        const startGame = (playerOneName, playerTwoName) => {
            const player1 = createPlayer(playerOneName, "X");
            const player2 = createPlayer(playerTwoName, "O");
            players = [player1, player2];
            isGameOver = false;
            currentPlayerIndex = 0;
            updateScoreBoard();
            displayMessage(`${players[currentPlayerIndex].name}'s turn`)
        };

        const createPlayer = (name, marker) => {
            let score = 0;

            const updateScore = () => {score++;};

            const getScore = () => score;

            return { name, marker, getScore, updateScore };
        };

        const switchPlayer = () => {
            currentPlayerIndex = (currentPlayerIndex + 1) % 2;
            displayMessage(`${players[currentPlayerIndex].name}'s turn`)
        };

        const getCurrentPlayer = () => players[currentPlayerIndex];

        const displayMessage = (message) => {
            const messageElement = document.getElementById('message');
            messageElement.textContent = message;
        };

        const playRound = (index) => {
            if (isGameOver) return;

            if (gameboardModule.markSpot(index, players[currentPlayerIndex].marker)){
                if (checkWinner()){
                    displayMessage(`${players[currentPlayerIndex].name} wins`);
                    players[currentPlayerIndex].updateScore();
                    updateScoreBoard();
                    isGameOver = true;
                } else if (isTie()){
                    displayMessage(`It is a tie`);
                    isGameOver = true;
                } else {
                    switchPlayer();
                }
            } else {
                displayMessage('Spot already taken');
            }
        };

        // Method to check for a win 
        const checkWinner = () =>{
            const board = gameboardModule.getGameboard();
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
                return condition.every(index => board[index] === players[currentPlayerIndex].marker);
            })
        };

        const isTie = () => {
            return gameboardModule.getGameboard().every(cell => cell !== "");
        };

        const resetGame = () => {
            isGameOver = false;
            currentPlayerIndex = 0;
        };

        const updateScoreBoard = () => {
            const scoreboard = document.querySelector('.scoreboard');
            scoreboard.innerHTML = `
            <p>${players[0].name}: ${players[0].getScore()} </p>
            <p>${players[1].name}: ${players[1].getScore()} </p> `;
        };

        return {
            startGame, 
            playRound,
            switchPlayer,
            getCurrentPlayer,
            displayMessage,
            resetGame,
            updateScoreBoard,
        };
    })();

})();