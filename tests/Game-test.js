const assert = require('chai').assert;

const Block = require('../lib/Block.js');
const Game = require('../lib/Game');
const Ball = require('../lib/Ball');
const Paddle = require('../lib/Paddle');

describe('Game', () => {

  it('should instantiate our friend Game', () => {
    const game = new Game();

    assert.isObject(game);
  })

  it('should should start with an empty array of blocks', () => {
    const game = new Game();

    assert.equal(game.blocks.length, 0);
  })

  it('should instantiate a new paddle', () => {
    const game = new Game();

    assert.isObject(game.paddle);
  })
  
  it('should instantiate a new ball', () => {
    const game = new Game();

    assert.isObject(game.ball);
  })

  it('should start on level 1', () => {
    const game = new Game();

    assert.equal(game.level, 1);
  })

  it('should start with levelWon set to false', () => {
    const game = new Game();

    assert.equal(game.levelWon, false);
  })

  it('should start with a score of 0', () => {
    const game = new Game();

    assert.equal(game.score, 0); 
  })

  it('should start with 3 balls', () => {
    const game = new Game();

    assert.equal(game.balls, 3);
  })

  it('should increment score by 50', () => {
    const game = new Game();

    assert.equal(game.score, 0);

    game.addScore();

    assert.equal(game.score, 50);
  })

  it('should fill the blocks array', () => {
    const game = new Game();

    assert.equal(game.blocks.length, 0);

    game.fillBlocksArray();

    assert.equal(game.blocks.length, 40);
  })

  it('should have collision detection for the ball and blocks', () => {
    const game = new Game();
    const block = new Block(100, 540, 50, 50);
    let ball = new Ball(97, 545, 15, 5, 5);

    assert.equal(ball.dx, 5);
    game.blockCollision(ball, block);
    assert.equal(ball.dx, 5)

    ball = new Ball(81, 540, 15, 5, 5);
    assert.equal(ball.dx, 5);
    game.blockCollision(ball, block);
    assert.equal(ball.dx, -5);
  })  
})

