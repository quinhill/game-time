const assert = require('chai').assert;

const Gamepiece = require('../lib/Gamepiece.js');
const game = require('../lib/Game');
require('locus');


describe('Gamepiece', () => {

  it('should instantiate our good friend gamepiece', () => {
  
    const gamepiece = new Gamepiece();

    assert.isObject(gamepiece);

  });
});