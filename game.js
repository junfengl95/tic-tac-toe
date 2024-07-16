document.addEventListener('DOMContentLoaded', () => {

    const Gameboard = {
        board: ["", "", "", "", "", "", "", "", ""],
        resetBoard() {
            this.board = ["", "", "", "", "", "", "", "", ""];
        },
    };

    const buttons = document.querySelectorAll(".empty-cell");

    const updateDisplay = () => {
        buttons.forEach((button, index) => {
            button.textContent = Gameboard.board[index];
        });
    };

    const Player = (name, marker) => {
        return { name, marker };
    };

    const Game = {
        player1: Player("Player 1", "X"),
        player2: Player("Player 2", "O"),
    }

})