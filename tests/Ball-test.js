const assert = require('chai').assert;

const Game = require('../lib/Game');
const Ball = require('../lib/Ball');

describe('Ball', () => {

  it('should instantiate our friend ball', () => {
    const ball = new Ball();

    assert.isObject(ball);
  })

  it('should have a radius', () => {
    const ball = new Ball(100, 534, 15, 5, 5);

    assert.equal(ball.radius, 15);
  })

  it('should have a dx and a dy', () => {
    const ball = new Ball(100, 534, 15, 5, 5);

    assert.equal(ball.dx, 5);
    assert.equal(ball.dy, -5);
  })

  it('should have an x and a y', () => {
    const ball = new Ball(100, 534, 15, 5, 5);

    assert.equal(ball.x, 100);
    assert.equal(ball.y, 534);
  })

  it('should have a start and end angle', () => {
    const ball = new Ball(100, 534, 15, 5, 5);

    assert.equal(ball.startAngle, 0);
    assert.equal(ball.endAngle, Math.PI * 2);
  })

  it('should have a with the inPlay property set to false', () => {
    const ball = new Ball(100, 534, 15, 5, 5);

    assert.equal(ball.inPlay, false);
  })

  it('should move', () => {
    const ball = new Ball(100, 534, 15, 5, 5);
    const game = new Game()

    assert.equal(ball.x, 100);
    assert.equal(ball.y, 534);

    ball.moveBall(game);

    assert.equal(ball.x, 105);
    assert.equal(ball.y, 529);
  })

  it('should change direction after hitting the top', () => {
    let ball = new Ball(100, 534, 15, 5, 5);
    let game = new Game()

    assert.equal(ball.dy, -5);
    ball.moveBall(game);
    assert.equal(ball.dy, -5);

    ball = new Ball(100, 15, 15, 5, 5);
    assert.equal(ball.dy, -5);
    ball.moveBall(game);
    assert.equal(ball.dy, 5);
  })

    it('should change direction after hitting a side', () => {
    let ball = new Ball(100, 534, 15, 5, 5);
    let game = new Game()

    assert.equal(ball.dx, 5);
    ball.moveBall(game);
    assert.equal(ball.dx, 5);

    ball = new Ball(485, 15, 15, 5, 5);
    assert.equal(ball.dx, 5);
    ball.moveBall(game);
    assert.equal(ball.dx, -5);
  })

})