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
    this.paddle = new Paddle (170, 550, 130, 10)
    this.ball = new Ball(238, 534, 15, 5, 5)
  }

  drawBlocks (context) {
    for(let x = 10;  x < 600; x +=50){
      for(let y = 5; y < 200; y +=50){
        let block = new Block (x, y, 30, 40)
     
        block.draw(context)
        this.blocks.push(block)
      }
    }
  }

  drawPaddle(context) {
    // let paddle = new Paddle (170, 550, 130, 10)

    this.paddle.draw(context)
    // paddle.move(context)
    
  }

  drawBall(context) {

    this.ball.draw(context).moveBall(context);

  }

  gameLoop () {
    this.context.clearRect(0, 0, 500, 600);
  
    this.drawPaddle(this.context);
    this.drawBall(this.context);
    this.drawBlocks(this.context);
    requestAnimationFrame(this.gameLoop);
 
  }

}

module.exports = Game;
