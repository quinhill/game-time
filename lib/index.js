const Game = require('./Game.js');
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(context, canvas.width, canvas.height);




window.addEventListener('keyup', function(e) {
  game.paddle.move(e, canvas.width);
}); 



game.gameLoop();


// canvas.addEventListener('click', startGame);

// function startGame() {
//   canvas.removeEventListener('click', startGame)
// }