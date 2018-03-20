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
  }

  startGame(context) {
    this.paddle.draw(this.context)
    this.fillBlocksArray();
    this.drawBlocks(this.context)
    this.gameLoop();
  }

  fillBlocksArray() {
    for(let x = 10;  x < 500; x +=50){
      for(let y = 5; y < 200; y +=50){
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
  }

  blockCollision(context, ball) {
    this.blocks.forEach((block, i, array) =>{  
      if (ball.y - ball.radius <= block.y + block.height
      && ball.x >= block.x
      && ball.x <= block.x + block.width) {
        ball.dy = - ball.dy;
        block.erase(context)
        array.splice(i, 1)
      }
      if (ball.y + ball.radius >= this.y
      && ball.x - ball.radius <= this.x + this.width 
      && ball.x + ball.radius >= this.x
      && ball.y - ball.radius  <= this.y + this.height) { 
      if( ball.x + ball.radius <=this.x ||
        ball.x - ball.radius >= this.x + this.width) {
        ball.dx = -ball.dx;
        block.erase(context);
        array.splice(i, 1);
      }
      } else {
      ball.dy = - ball.dy;
      block.erase(context);
      array.splice(i, 1);
    }
    })
  }

  gameLoop() {
    this.blockCollision(this.context, this.ball)
    this.drawPaddle(this.context, this.ball);
    this.drawBall(this.context);
    requestAnimationFrame(this.gameLoop);
    // this.drawBlocks(this.context);
    
  }

}

module.exports = Game;