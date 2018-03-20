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
    context.clearRect(this.x, this.y, this.width, this.height)
    return this
  }

  move(e, canvasWidth) {

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
    // let ballRight = ball.x + ball.radius;
    // let ballLeft = ball.x - ball.radius;
    // let paddleBottom = this.y + this.height;
    // let paddleRight = this.x + this.width;

    if (ball.y + ball.radius >= this.y
      && ball.x - ball.radius <= this.x + this.width 
      && ball.x + ball.radius >= this.x
      && ball.y - ball.radius  <= this.y + this.height) { 
      if( ball.x + ball.radius <=this.x ||
        ball.x - ball.radius >= this.x + this.width) {
        ball.dx = -ball.dx
      }else {
      ball.dy = - ball.dy
    }
     }
return this
}

}




module.exports = Paddle;

