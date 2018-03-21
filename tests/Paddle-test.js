const assert = require('chai').assert;

const Paddle = require('../lib/Paddle.js');
const game = require('../lib/Game');
const Ball = require('../lib/Ball')

describe('Paddle', () => {

  it('should instantiate our friend paddle', () => {
    const paddle = new Paddle();

    assert.isObject(paddle);
  })

  it('should take the parameters for x and y', () => {
    const paddle = new Paddle(300, 300, 15, 15);

    assert.equal(paddle.x, 300);
    assert.equal(paddle.y, 300);
  })

  it('should take the parameters height and width', () => {

  const paddle = new Paddle(300, 300, 15, 15);

  assert.equal(paddle.width, 15);
  assert.equal(paddle.height, 15);
  })

  it('should move right', () => {
    const paddle = new Paddle(10, 10, 15, 15);
    const e = {'keyCode': 39}

    assert.equal(paddle.x, 10);

    paddle.move(e, 500);

    assert.equal(paddle.x, 60)
  })
  
    it('should move left', () => {
    const paddle = new Paddle(100, 100, 15, 15);
    const e = {'keyCode': 37}

    assert.equal(paddle.x, 100);

    paddle.move(e, 500);

    assert.equal(paddle.x, 50)
  })

  it('should collide with the ball and change the x direction', () =>{
    const paddle = new Paddle(100, 540, 15, 15);
    let ball = new Ball(100, 534, 15, 5, 5);

    assert.equal(ball.dx, 5);
    paddle.paddleCollision(ball);
    assert.equal(ball.dx, 5)

    ball = new Ball(95, 537, 5, 5);
    assert.equal(ball.dx, 5);
    paddle.paddleCollision(ball);
    assert.equal(ball.dx, -5);
  })

  it('should collide with the ball and change the ball y direction', () =>{
    const paddle = new Paddle(300, 550, 15, 15);
    let ball = new Ball(230, 535, 15, 5, 5);

    assert.equal(ball.dy, -5);
    paddle.paddleCollision(ball);
    assert.equal(ball.dy, -5)

    ball = new Ball(297, 545, 15, 5, 5);
    assert.equal(ball.dy, -5);
    paddle.paddleCollision(ball);
    assert.equal(ball.dy, 5)
  })

})