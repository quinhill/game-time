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

    if (ball.y + ball.radius > this.y
      && ball.x < this.x + this.width && ball.x > this.x){ 
      ball.dy = - ball.dy
    }
      if (ball.x + ball.radius < this.x && this.y < ball.y && ball.y < this.y + this.height) {
        ball.dx = - ball.dx
      }
      if (ball.x - ball.radius > this.x + this.width && this.y < ball.y && ball.y < this.y + this.height) {
      ball.dx = - ball.dx
      }
  
}

}


module.exports = Paddle;


