const Game = require('./Game.js');
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(context, canvas.width, canvas.height);
const resetButton = document.getElementById('reset-button');
const startScreen = document.getElementById('start-picture')

window.addEventListener('keydown', function(e) {
  game.paddle.erase(context)
  game.paddle.move(e, canvas.width);
  game.paddle.draw(context)
}); 

canvas.addEventListener('click', startGame);
canvas.addEventListener('click', level)
resetButton.addEventListener('click', resetGame);



function level() {
  if (game.level > 1 && game.levelWon === true) {
    game.levelWon = false;
    game.newLevel();
  } 
}

startGameImage();

function startGameImage() {
  canvas.style.backgroundImage = "url('../assets/breakout_1.jpg')"
}

function startGame() {
  canvas.style.backgroundImage = "url('../assets/game-background.jpg')"
  game.startGame();
}


function resetGame() {
  window.location.reload(true);
}