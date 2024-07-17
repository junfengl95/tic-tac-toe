(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('.empty-cell');
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const currentPlayer = gameControllerModule.getCurrentPlayer();
                const marker = currentPlayer.marker;

                if (gameboardModule.markSpot(index, marker)){
                    gameControllerModule.switchPlayer();
                } else {
                    gameControllerModule.displayMessage('Spot already taken!');
                }
            });
        });

        const newGameButton = document.getElementById('new-game');
        newGameButton.addEventListener('click', () => {
            gameboardModule.resetGameboard();
            gameControllerModule.displayMessage('New Game Started.');
        });

        const startForm = document.getElementById('form');
        startForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const playerOneName = document.getElementById('player-1-name').value;
            const playerTwoName = document.getElementById('player-2-name').value;

            gameControllerModule.startGame(playerOneName, playerTwoName);

            const overlay = document.getElementById('overlay');
            overlay.style.display = 'none';
        });
    });

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
            });
        };

        return { getGameboard, resetGameboard, markSpot, updateBoardUI }
    })();

    const gameControllerModule = (() => {
        let currentPlayer;
        let players = [];

        const startGame = (playerOneName, playerTwoName) => {
            const player1 = createPlayer(playerOneName, "X");
            const player2 = createPlayer(playerTwoName, "O");
            players = [player1, player2];

            currentPlayer = players[0];
            displayMessage(`${currentPlayer.name}'s turn`)
        };

        const createPlayer = (name, marker) => {
            return { name, marker };
        };

        const switchPlayer = () => {
            currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
            displayMessage(`${currentPlayer.name}'s turn`)
        };

        const getCurrentPlayer = () => currentPlayer;

        const displayMessage = (message) => {
            const messageElement = document.getElementById('message');
            messageElement.textContent = message;
        };

        return {
            startGame, 
            switchPlayer,
            getCurrentPlayer,
            displayMessage,
        };
    })();

})();