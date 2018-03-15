const assert = require('chai').assert;

const Block = require('../lib/Block.js');
const game = require('../lib/Game');

describe('Block', () => {

  it('should instantiate our friend block', () => {
    const block = new Block();

    assert.isObject(block);
  })

  it('should take the parameters for x and y', () => {
    const block = new Block(300, 300, 15, 15);

    assert.equal(block.x, 300);
    assert.equal(block.y, 300);
  })

  it('should take the parameters height and width', () => {

  const block = new Block(300, 300, 15, 15);

  assert.equal(block.width, 15);
  assert.equal(block.height, 15);
  })

  

})