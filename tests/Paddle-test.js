const assert = require('chai').assert;

const Paddle = require('../lib/Paddle.js');
const game = require('../lib/Game');

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

  

})