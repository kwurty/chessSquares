const correct = document.getElementById("correct");
const wrong = document.getElementById("wrong");
const timer = document.getElementById("timer");
const startButton = document.getElementById("startgame");
const overlay = document.getElementsByClassName("overlay");
const nextSquare = document.getElementById("nextsquare");
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const game = {
    correct: 0,
    wrong: 0,
    highscore: 0,
    timer: 0,
    running: false,
    currentsquare: null
}
const message = document.getElementById("message");
const squares = document.getElementsByClassName("square");

for (square of squares) {
    square.addEventListener("click", (e) => {
        console.log('clicked', e.target.id)
        checkSquare(e.target.id);
    });
}

generateSquare = () => {
    let square = `${files[Math.floor(Math.random() * files.length)]}${Math.floor(Math.random() * (9 - 1) + 1)}`;
    game.currentsquare = square;
    overlay[0].style.display = "block";
    nextSquare.innerText = game.currentsquare;
    setTimeout(() => { overlay[0].style.display = "none"; }, 1000);
}

runGame = () => {
    if (game.timer < 1) {
        clearInterval(runGame); // Clear the interval to stop the loop
        game.running = false;
        triggerAlert("Game Over!");
    } else {
        game.timer -= 1;
        timer.innerText = game.timer;
    }
}

startGame = () => {
    game.timer = 60
    game.running = true;
    generateSquare();
    setInterval(runGame, 1000);
}

checkSquare = (square) => {
    if (game.running) {
        String(square) == String(game.currentsquare) ? isCorrect() : isIncorrect()
    }
}

isIncorrect = () => {
    game.wrong += 1;
    wrong.innerText = game.wrong;
    triggerAlert("Incorrect");
    generateSquare();
}

isCorrect = () => {
    game.correct += 1;
    correct.innerText = game.correct;
    generateSquare();
}

triggerAlert = (message) => {

}

