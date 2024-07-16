document.addEventListener('DOMContentLoaded', () => {

    function createPlayer(sign, name, id){
        let score = 0;

        // method to update score
        const updateScore = () => {
            score++;
        }

        const getScore = () => score; // Implicit return

        const getSign = () => sign;

        const getName = () => name;

        const getId = () => id;

        return {getSign, getName, getId, updateScore, getScore}
    }

    const Gameboard = {
        board: ["", "", "", "", "", "", "", "", ""],
        resetBoard() {
            this.board = ["", "", "", "", "", "", "", "", ""];
        },
    };


    // Dialog and form handling
    const dialog = document.getElementById('game-dialog');
    const form = document.getElementById('game-form')

    const buttons = document.querySelectorAll(".empty-cell");

    const updateDisplay = () => {
        buttons.forEach((button, index) => {
            button.textContent = Gameboard.board[index];
        });
    };


    // Overlay 
    const closeOverlay = () => {
        document.getElementById('overlay').style.display = 'none';
    }

    const openOverlay = () => {
        document.getElementById('overlay').style.diplay = 'block';
    }

    const submitBtn = document.getElementById("submit-button");

    submitBtn.onclick = function(event){
        event.preventDefault();

        closeOverlay();
    }

})