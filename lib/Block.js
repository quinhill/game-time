const Gamepiece = require('./Gamepiece');


class Block extends Gamepiece {
  constructor(x, y, height, width) {
    super(x, y, height, width)

  }
    draw (context) {
      context.fillStyle = 'blue';
      context.fillRect(this.x, this.y, this.height, this.width)
      return this;
  }
}

module.exports = Block;