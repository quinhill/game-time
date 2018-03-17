const Gamepiece = require('./Gamepiece');


class Paddle extends Gamepiece {
  constructor(x, y, width, height) {
    super(x, y, width, height);

  }
  
  draw (context) {
    context.fillStyle = 'blue';
    context.fillRect(this.x, this.y, this.width, this.height)
    return this;
  }

  erase (context) {
    context.clearRect(this.x, this.y, this.height, this.width)

  }

  move(e, canvasWidth) {
    // console.log(this)
    switch (e.keyCode) {

      case 39:
      if( this.x < canvasWidth - this.width) {
        this.x += 50;
      }
      break;
      case 37:
      if (this.x >= 0) {
        this.x -= 50;
      }
      break;
    }
  }
  paddleCollision(ball) {
    let ballRight = ball.x + ball.radius;
    let ballLeft = ball.x - ball.radius;
    let paddleTop = this.y;
    let paddleBottom = this.y + this.height;
    let paddleLeft = this.x;
    let paddleRight = this.x + this.width;


    if (ball.y + ball.radius >= paddleTop
      && ball.x <= paddleRight 
      && ball.x >= this.x) { 
      ball.dy = - ball.dy
     }

}
}


module.exports = Paddle;


