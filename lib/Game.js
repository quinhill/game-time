const Block = require('./Block.js');
const Paddle = require('./Paddle.js');
const Ball = require('./Ball.js');

class Game {
  constructor(context, canvasHeight, canvasWidth) {
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.context = context; 
    this.blocks = []
    this.gameLoop = this.gameLoop.bind(this)
    this.paddle = new Paddle(170, 550, 130, 10)
    this.ball = new Ball(100, 534, 15, 5, 5)
    this.level = 1;
    this.levelWon = false;
    this.score = 0;
  }

  startGame(context) {
    this.paddle.draw(this.context)
    this.fillBlocksArray();
    this.drawBlocks(this.context)
    this.ball.inPlay = true;
    this.gameLoop();
  }

  newLevel(context){
    this.context.clearRect(0,0, this.canvasWidth, this.canvasHeight)
    this.fillBlocksArray();
    this.drawBlocks(this.context)
    this.reloadBall(this.ball);
    this.paddle.width = this.paddle.width -10;
    this.ball.dx = this.ball.dx += 5;
    this.ball.dy = this.ball.dy += 5;
    this.gameLoop()
  }

  reloadBall(ball){
    this.ball.inPlay = true
    this.ball.x = 100
    this.ball.y = 534
    // console.log(ball.x)
  }
  win(blocks) {
    if (this.blocks.length === 0){
      this.levelWon = true;
      this.ball.inPlay = false;
      this.level += 1;
    }
  }

transition() {
  if (this.levelWon === true){
    this.updateLevel();
  }
}

updateLevel() {
  this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  this.context.font = '50px Rammetto One';
  this.context.fillText('NEXT LEVEL', 100, 250)
}

  nextLevel(context) {
    this.paddle.draw(this.context)
    this.fillBlocksArray();
    this.drawBlocks(this.context)
    this.gameLoop();
  }

  addScore() {
    this.score += 50;
  }

  displayScore() {
    var scoreNumber = document.getElementById("score-number")

    scoreNumber.innerText = this.score;
  }

  // addLevel() {
  //   this.level += 1;
  // }

  displayLevel() {
    var levelNumber = document.getElementById("level-number")

    levelNumber.innerText = this.level;
  }  

  // gameOver(ball) {
  //   if(ball.y >= 600 - ball.radius)
  // }

  fillBlocksArray() {
    for(let x = 10;  x < 500; x +=50){
      for(let y = 5; y < 50; y +=50){
        let block = new Block (x, y, 40, 30)
        
        this.blocks.push(block)
      }
    }
  }

  drawBlocks(context) {
    this.blocks.forEach(block => block.draw(context))
  }

  drawPaddle(context, ball) {
    this.paddle.paddleCollision(ball).draw(context); 
  }

  drawBall(context) {
    this.ball.erase(context).moveBall(context).draw(context);
    // this.ball.inPlay === true;
  }

  blockCollision(context, ball) {
    this.blocks.forEach((block, i, array) =>{  
      if (ball.y - ball.radius <= block.y + block.height
      && ball.x >= block.x
      && ball.x <= block.x + block.width) {
        ball.dy = - ball.dy;
        block.erase(context)
        array.splice(i, 1)
        this.addScore();
      }
      if (ball.y + ball.radius >= block.y
      && ball.x - ball.radius <= block.x + block.width 
      && ball.x + ball.radius >= block.x
      && ball.y - ball.radius  <= block.y + block.height) { 
      if( ball.x + ball.radius <=block.x ||
        ball.x - ball.radius >= block.x + block.width) {
        ball.dx = -ball.dx;
        block.erase(context);
        array.splice(i, 1);
        this.addScore();
      }
      } 
  })
}

  gameLoop() {
    if (this.ball.inPlay === true) {
    this.blockCollision(this.context, this.ball)
    this.drawPaddle(this.context, this.ball);
    this.drawBall(this.context);
    requestAnimationFrame(this.gameLoop);
    this.win(this.blocks);
    this.transition();
    this.drawBlocks(this.context);
    this.displayScore();
    this.displayLevel();
    }
  }

}

module.exports = Game;