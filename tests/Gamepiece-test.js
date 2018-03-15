const assert = require('chai').assert;

const Gamepiece = require('../lib/Gamepiece.js');
const game = require('../lib/Game');
require('locus');


describe('Gamepiece', () => {

  it('should instantiate our good friend gamepiece', () => {
  
    const gamepiece = new Gamepiece();

    assert.isObject(gamepiece);

  });

  it('should take the parameters x and y', () => {

    const gamepiece = new Gamepiece(300, 300, 15, 15);

    assert.equal(gamepiece.x, 300);
    assert.equal(gamepiece.y, 300);
  })

  it('should take the parameters height and width', () => {

  const gamepiece = new Gamepiece(300, 300, 15, 15);

  assert.equal(gamepiece.width, 15);
  assert.equal(gamepiece.height, 15);
})
});