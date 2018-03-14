class Paddle {
  constructor(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;

  }
  draw (context) {
    context.fillStyle = 'blue';
    context.fillRect(this.x, this.y, this.height, this.width)
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
      if (this.x > 0) {
        this.x -= 50;
      }
      break;
    }
  }
}


module.exports = Paddle;


