document.addEventListener('DOMContentLoaded', () => {
    const Gameboard = {
        board: ["", "", "", "", "", "", "", "", ""],


        //Method to display board
        displayBoard() {
            console.log(`${this.board[0]} | ${this.board[1]} | ${this.board[2]}`);
            console.log("---------");
            console.log(`${this.board[3]} | ${this.board[4]} | ${this.board[5]}`);
            console.log("---------");
            console.log(`${this.board[6]} | ${this.board[7]} | ${this.board[8]}`);
        },

        resetBoard() {
            this.board = ["", "", "", "", "", "", "", "", ""];
        },

    };

    const Player = (name, marker) => {
        return { name, marker };
    };

    const Game = {
        player1: Player("Player 1", "X"),
        player2: Player("Player 2", "O"),
        currentPlayer: null,
        isGameOver: false,

        // Method to start the game
        startGame() {
            this.currentPlayer = this.player1;
            this.isGameOver = false;
            Gameboard.resetBoard();
            Gameboard.displayBoard();
            this.playTurn();
        },

        // Method to play a turn
        playTurn() {
            if (this.isGameOver) return;

            const position = prompt(`${this.currentPlayer.name}'s turn (${this.currentPlayer.marker}). Enter position (0-8):`)
            if (Gameboard.board[position] === "") {
                Gameboard.board[position] = this.currentPlayer.marker;
                Gameboard.displayBoard();
                if (this.checkWin(this.currentPlayer.marker)) {
                    console.log(`${this.currentPlayer.name} wins!`);
                    this.isGameOver = true;
                } else if (this.checkTie()) {
                    console.log("It is a tie");
                    this.isGameOver = true;
                } else {
                    this.switchPlayer();
                    this.playTurn();
                }
            } else if (Gameboard.board[position] !== "") {
                prompt(`The position is already filled ${this.currentPlayer.name}'s turn (${this.currentPlayer.marker}). Enter position (0-8):`);
                this.playTurn();
            } else {
                this.isGameOver = true;
            }
        },

        // Method to switch players
        switchPlayer() {
            this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
        },

        // Method to check for a win 
        checkWin(marker) {
            const winConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ]

            return winConditions.some(condition => {
                return condition.every(index => Gameboard.board[index] === marker);
            })
        },

        checkTie() {
            return Gameboard.board.every(cell => cell !== ""); // All cells been filled
        }
    }

    Game.startGame();

});
