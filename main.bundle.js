/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Game = __webpack_require__(1);
	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	var game = new Game(context, canvas.width, canvas.height);
	var resetButton = document.getElementById('reset-button');
	
	window.addEventListener('keydown', function (e) {
	  game.paddle.erase(context);
	  game.paddle.move(e, canvas.width);
	  game.paddle.draw(context);
	});
	
	canvas.addEventListener('click', startGame);
	canvas.addEventListener('click', level);
	resetButton.addEventListener('click', resetGame);
	
	function level() {
	  if (game.level > 1 && game.levelWon === true) {
	    game.levelWon = false;
	    game.newLevel();
	  }
	}
	
	startGameImage();
	
	function startGameImage() {
	  canvas.style.backgroundImage = "url('../assets/breakout_1.jpg')";
	}
	
	function startGame() {
	  canvas.style.backgroundImage = "url('../assets/game-background.jpg')";
	  game.startGame();
	}
	
	function resetGame() {
	  window.location.reload(true);
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Block = __webpack_require__(2);
	var Paddle = __webpack_require__(4);
	var Ball = __webpack_require__(5);
	
	var Game = function () {
	  function Game(context, canvasHeight, canvasWidth) {
	    _classCallCheck(this, Game);
	
	    this.canvasHeight = canvasHeight;
	    this.canvasWidth = canvasWidth;
	    this.context = context;
	    this.blocks = [];
	    this.gameLoop = this.gameLoop.bind(this);
	    this.paddle = new Paddle(170, 550, 130, 10);
	    this.ball = new Ball(100, 534, 15, 5, 5);
	    this.level = 1;
	    this.levelWon = false;
	    this.score = 0;
	    this.balls = 3;
	  }
	
	  _createClass(Game, [{
	    key: 'startGame',
	    value: function startGame() {
	      this.paddle.draw(this.context);
	      this.fillBlocksArray();
	      this.drawBlocks(this.context);
	      this.ball.inPlay = true;
	      this.gameLoop();
	    }
	  }, {
	    key: 'newLevel',
	    value: function newLevel() {
	      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	      this.fillBlocksArray();
	      this.drawBlocks(this.context);
	      this.reloadBall(this.ball);
	      this.paddle.erase(this.context);
	      this.paddle.width = this.paddle.width - 10;
	      this.paddle.draw(this.context);
	      this.ball.dx = this.ball.dx += 1;
	      this.ball.dy = this.ball.dy += 1;
	      this.gameLoop();
	    }
	  }, {
	    key: 'reloadBall',
	    value: function reloadBall() {
	      this.ball.inPlay = true;
	      this.ball.x = 100;
	      this.ball.y = 394;
	      this.ball.dx = 5;
	      this.ball.dy = 5;
	    }
	  }, {
	    key: 'win',
	    value: function win() {
	      if (this.blocks.length === 0) {
	        this.levelWon = true;
	        this.ball.inPlay = false;
	        this.level += 1;
	      }
	    }
	  }, {
	    key: 'loseBall',
	    value: function loseBall(context, ball) {
	      if (ball.y >= 600 - ball.radius) {
	        this.ball.erase(context);
	        this.reloadBall(ball);
	        this.balls = this.balls - 1;
	        this.ball.dy = -this.ball.dy / 1;
	      }
	    }
	  }, {
	    key: 'gameOver',
	    value: function gameOver() {
	      if (this.balls === 0) {
	        this.ball.inPlay = false;
	        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	        this.context.font = '50px Rammetto One';
	        this.context.fillText('GAME OVER!', 50, 250);
	      }
	    }
	  }, {
	    key: 'transition',
	    value: function transition() {
	      if (this.levelWon === true) {
	        this.updateLevel();
	      }
	    }
	  }, {
	    key: 'updateLevel',
	    value: function updateLevel() {
	      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	      this.context.font = '50px Rammetto One';
	      this.context.fillText('NEXT LEVEL', 60, 250);
	      this.context.fillText('Click to play', 50, 350);
	    }
	  }, {
	    key: 'nextLevel',
	    value: function nextLevel() {
	      this.paddle.draw(this.context);
	      this.fillBlocksArray();
	      this.drawBlocks(this.context);
	      this.gameLoop();
	    }
	  }, {
	    key: 'addScore',
	    value: function addScore() {
	      this.score += 50;
	    }
	  }, {
	    key: 'displayScore',
	    value: function displayScore() {
	      var scoreNumber = document.getElementById("score-number");
	
	      scoreNumber.innerText = this.score;
	    }
	  }, {
	    key: 'displayLevel',
	    value: function displayLevel() {
	      var levelNumber = document.getElementById("level-number");
	
	      levelNumber.innerText = this.level;
	    }
	  }, {
	    key: 'displayBalls',
	    value: function displayBalls() {
	      var ballsNumber = document.getElementById("balls-number");
	
	      ballsNumber.innerText = this.balls;
	    }
	  }, {
	    key: 'fillBlocksArray',
	    value: function fillBlocksArray() {
	      for (var x = 10; x < 500; x += 50) {
	        for (var y = 5; y < 200; y += 50) {
	          var block = new Block(x, y, 40, 30);
	
	          this.blocks.push(block);
	        }
	      }
	    }
	  }, {
	    key: 'drawBlocks',
	    value: function drawBlocks(context) {
	      this.blocks.forEach(function (block) {
	        return block.draw(context);
	      });
	    }
	  }, {
	    key: 'drawPaddle',
	    value: function drawPaddle(context, ball) {
	      this.paddle.paddleCollision(ball).draw(context);
	    }
	  }, {
	    key: 'drawBall',
	    value: function drawBall(context) {
	      this.ball.erase(context).moveBall(context).draw(context);
	    }
	  }, {
	    key: 'blockCollision',
	    value: function blockCollision(context, ball) {
	      var _this = this;
	
	      this.blocks.forEach(function (block, i, array) {
	        if (ball.y - ball.radius <= block.y + block.height && ball.x >= block.x && ball.x <= block.x + block.width) {
	          ball.dy = -ball.dy;
	          block.erase(context);
	          array.splice(i, 1);
	          _this.addScore();
	        }
	        if (ball.y + ball.radius >= block.y && ball.x - ball.radius <= block.x + block.width && ball.x + ball.radius >= block.x && ball.y - ball.radius <= block.y + block.height) {
	          if (ball.x + ball.radius <= block.x || ball.x - ball.radius >= block.x + block.width) {
	            ball.dx = -ball.dx;
	            block.erase(context);
	            array.splice(i, 1);
	            _this.addScore();
	          }
	        }
	      });
	    }
	  }, {
	    key: 'gameLoop',
	    value: function gameLoop() {
	      if (this.ball.inPlay === true) {
	        this.blockCollision(this.context, this.ball);
	        this.drawPaddle(this.context, this.ball);
	        this.drawBall(this.context);
	        requestAnimationFrame(this.gameLoop);
	        this.win(this.blocks);
	        this.transition();
	        this.drawBlocks(this.context);
	        this.displayScore();
	        this.displayLevel();
	        this.displayBalls();
	        this.loseBall(this.context, this.ball);
	        this.gameOver(this.context);
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Gamepiece = __webpack_require__(3);
	
	var Block = function (_Gamepiece) {
	  _inherits(Block, _Gamepiece);
	
	  function Block(x, y, height, width) {
	    _classCallCheck(this, Block);
	
	    return _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, x, y, height, width));
	  }
	
	  _createClass(Block, [{
	    key: 'erase',
	    value: function erase(context) {
	      context.clearRect(this.x, this.y, this.height, this.width);
	      return this;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(context) {
	      context.fillStyle = 'orange';
	      context.fillRect(this.x, this.y, this.height, this.width);
	      return this;
	    }
	  }]);
	
	  return Block;
	}(Gamepiece);
	
	module.exports = Block;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Gamepiece = function Gamepiece(x, y, width, height) {
	  _classCallCheck(this, Gamepiece);
	
	  this.x = x;
	  this.y = y;
	  this.width = width;
	  this.height = height;
	};
	
	module.exports = Gamepiece;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Gamepiece = __webpack_require__(3);
	
	var Paddle = function (_Gamepiece) {
	  _inherits(Paddle, _Gamepiece);
	
	  function Paddle(x, y, width, height) {
	    _classCallCheck(this, Paddle);
	
	    return _possibleConstructorReturn(this, (Paddle.__proto__ || Object.getPrototypeOf(Paddle)).call(this, x, y, width, height));
	  }
	
	  _createClass(Paddle, [{
	    key: 'draw',
	    value: function draw(context) {
	      context.fillStyle = 'orange';
	      context.fillRect(this.x, this.y, this.width, this.height);
	      return this;
	    }
	  }, {
	    key: 'erase',
	    value: function erase(context) {
	      context.clearRect(this.x, this.y, this.width, this.height);
	      return this;
	    }
	  }, {
	    key: 'move',
	    value: function move(e, canvasWidth) {
	
	      switch (e.keyCode) {
	
	        case 39:
	          if (this.x < canvasWidth - this.width) {
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
	  }, {
	    key: 'paddleCollision',
	    value: function paddleCollision(ball) {
	      if (ball.y + ball.radius >= this.y && ball.x - ball.radius <= this.x + this.width && ball.x + ball.radius >= this.x && ball.y - ball.radius <= this.y + this.height) {
	        if (ball.x + ball.radius <= this.x || ball.x - ball.radius >= this.x + this.width) {
	          ball.dx = -ball.dx;
	        } else {
	          ball.dy = -ball.dy;
	        }
	      }
	      return this;
	    }
	  }]);
	
	  return Paddle;
	}(Gamepiece);
	
	module.exports = Paddle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Gamepiece = __webpack_require__(3);
	
	var Ball = function (_Gamepiece) {
	  _inherits(Ball, _Gamepiece);
	
	  function Ball(x, y, radius, dx, dy) {
	    _classCallCheck(this, Ball);
	
	    var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, x, y));
	
	    _this.radius = radius;
	    _this.dx = dx;
	    _this.dy = -dy;
	    _this.startAngle = 0;
	    _this.endAngle = Math.PI * 2;
	    _this.inPlay = false;
	    return _this;
	  }
	
	  _createClass(Ball, [{
	    key: 'erase',
	    value: function erase(context) {
	      context.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
	      return this;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(context) {
	      context.beginPath();
	      context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
	      context.fillStyle = 'blue';
	      context.fill();
	      context.closePath();
	      return this;
	    }
	  }, {
	    key: 'moveBall',
	    value: function moveBall() {
	      this.x += this.dx;
	      this.y += this.dy;
	
	      if (this.x >= 500 - this.radius || this.x <= 0 + this.radius) {
	        this.dx = -this.dx;
	      }
	      if (this.y <= 0 + this.radius) {
	        this.dy = -this.dy;
	      }
	      return this;
	    }
	  }]);
	
	  return Ball;
	}(Gamepiece);
	
	module.exports = Ball;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTViMzI0NzM4ZDk2N2JjMDBiMTgiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9HYW1lLmpzIiwid2VicGFjazovLy8uL2xpYi9CbG9jay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvR2FtZXBpZWNlLmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0JhbGwuanMiXSwibmFtZXMiOlsiR2FtZSIsInJlcXVpcmUiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJnYW1lIiwid2lkdGgiLCJoZWlnaHQiLCJyZXNldEJ1dHRvbiIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicGFkZGxlIiwiZXJhc2UiLCJtb3ZlIiwiZHJhdyIsInN0YXJ0R2FtZSIsImxldmVsIiwicmVzZXRHYW1lIiwibGV2ZWxXb24iLCJuZXdMZXZlbCIsInN0YXJ0R2FtZUltYWdlIiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJsb2NhdGlvbiIsInJlbG9hZCIsIkJsb2NrIiwiUGFkZGxlIiwiQmFsbCIsImNhbnZhc0hlaWdodCIsImNhbnZhc1dpZHRoIiwiYmxvY2tzIiwiZ2FtZUxvb3AiLCJiaW5kIiwiYmFsbCIsInNjb3JlIiwiYmFsbHMiLCJmaWxsQmxvY2tzQXJyYXkiLCJkcmF3QmxvY2tzIiwiaW5QbGF5IiwiY2xlYXJSZWN0IiwicmVsb2FkQmFsbCIsImR4IiwiZHkiLCJ4IiwieSIsImxlbmd0aCIsInJhZGl1cyIsImZvbnQiLCJmaWxsVGV4dCIsInVwZGF0ZUxldmVsIiwic2NvcmVOdW1iZXIiLCJpbm5lclRleHQiLCJsZXZlbE51bWJlciIsImJhbGxzTnVtYmVyIiwiYmxvY2siLCJwdXNoIiwiZm9yRWFjaCIsInBhZGRsZUNvbGxpc2lvbiIsIm1vdmVCYWxsIiwiaSIsImFycmF5Iiwic3BsaWNlIiwiYWRkU2NvcmUiLCJibG9ja0NvbGxpc2lvbiIsImRyYXdQYWRkbGUiLCJkcmF3QmFsbCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndpbiIsInRyYW5zaXRpb24iLCJkaXNwbGF5U2NvcmUiLCJkaXNwbGF5TGV2ZWwiLCJkaXNwbGF5QmFsbHMiLCJsb3NlQmFsbCIsImdhbWVPdmVyIiwibW9kdWxlIiwiZXhwb3J0cyIsIkdhbWVwaWVjZSIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwia2V5Q29kZSIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsIk1hdGgiLCJQSSIsImJlZ2luUGF0aCIsImFyYyIsImZpbGwiLCJjbG9zZVBhdGgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBTUEsT0FBTyxtQkFBQUMsQ0FBUSxDQUFSLENBQWI7QUFDQSxLQUFNQyxTQUFTQyxTQUFTQyxjQUFULENBQXdCLE1BQXhCLENBQWY7QUFDQSxLQUFNQyxVQUFVSCxPQUFPSSxVQUFQLENBQWtCLElBQWxCLENBQWhCO0FBQ0EsS0FBTUMsT0FBTyxJQUFJUCxJQUFKLENBQVNLLE9BQVQsRUFBa0JILE9BQU9NLEtBQXpCLEVBQWdDTixPQUFPTyxNQUF2QyxDQUFiO0FBQ0EsS0FBTUMsY0FBY1AsU0FBU0MsY0FBVCxDQUF3QixjQUF4QixDQUFwQjs7QUFFQU8sUUFBT0MsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsVUFBU0MsQ0FBVCxFQUFZO0FBQzdDTixRQUFLTyxNQUFMLENBQVlDLEtBQVosQ0FBa0JWLE9BQWxCO0FBQ0FFLFFBQUtPLE1BQUwsQ0FBWUUsSUFBWixDQUFpQkgsQ0FBakIsRUFBb0JYLE9BQU9NLEtBQTNCO0FBQ0FELFFBQUtPLE1BQUwsQ0FBWUcsSUFBWixDQUFpQlosT0FBakI7QUFDRCxFQUpEOztBQU1BSCxRQUFPVSxnQkFBUCxDQUF3QixPQUF4QixFQUFpQ00sU0FBakM7QUFDQWhCLFFBQU9VLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDTyxLQUFqQztBQUNBVCxhQUFZRSxnQkFBWixDQUE2QixPQUE3QixFQUFzQ1EsU0FBdEM7O0FBRUEsVUFBU0QsS0FBVCxHQUFpQjtBQUNmLE9BQUlaLEtBQUtZLEtBQUwsR0FBYSxDQUFiLElBQWtCWixLQUFLYyxRQUFMLEtBQWtCLElBQXhDLEVBQThDO0FBQzVDZCxVQUFLYyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0FkLFVBQUtlLFFBQUw7QUFDRDtBQUNGOztBQUVEQzs7QUFFQSxVQUFTQSxjQUFULEdBQTBCO0FBQ3hCckIsVUFBT3NCLEtBQVAsQ0FBYUMsZUFBYixHQUErQixpQ0FBL0I7QUFDRDs7QUFFRCxVQUFTUCxTQUFULEdBQXFCO0FBQ25CaEIsVUFBT3NCLEtBQVAsQ0FBYUMsZUFBYixHQUErQixzQ0FBL0I7QUFDQWxCLFFBQUtXLFNBQUw7QUFDRDs7QUFFRCxVQUFTRSxTQUFULEdBQXFCO0FBQ25CVCxVQUFPZSxRQUFQLENBQWdCQyxNQUFoQixDQUF1QixJQUF2QjtBQUNELEU7Ozs7Ozs7Ozs7OztBQ3BDRCxLQUFNQyxRQUFRLG1CQUFBM0IsQ0FBUSxDQUFSLENBQWQ7QUFDQSxLQUFNNEIsU0FBUyxtQkFBQTVCLENBQVEsQ0FBUixDQUFmO0FBQ0EsS0FBTTZCLE9BQU8sbUJBQUE3QixDQUFRLENBQVIsQ0FBYjs7S0FFTUQsSTtBQUNKLGlCQUFZSyxPQUFaLEVBQXFCMEIsWUFBckIsRUFBbUNDLFdBQW5DLEVBQWdEO0FBQUE7O0FBQzlDLFVBQUtELFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxVQUFLM0IsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsVUFBSzRCLE1BQUwsR0FBYyxFQUFkO0FBQ0EsVUFBS0MsUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWNDLElBQWQsQ0FBbUIsSUFBbkIsQ0FBaEI7QUFDQSxVQUFLckIsTUFBTCxHQUFjLElBQUllLE1BQUosQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEVBQTFCLENBQWQ7QUFDQSxVQUFLTyxJQUFMLEdBQVksSUFBSU4sSUFBSixDQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLEVBQW5CLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLENBQVo7QUFDQSxVQUFLWCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFVBQUtFLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxVQUFLZ0IsS0FBTCxHQUFhLENBQWI7QUFDQSxVQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNEOzs7O2lDQUVXO0FBQ1YsWUFBS3hCLE1BQUwsQ0FBWUcsSUFBWixDQUFpQixLQUFLWixPQUF0QjtBQUNBLFlBQUtrQyxlQUFMO0FBQ0EsWUFBS0MsVUFBTCxDQUFnQixLQUFLbkMsT0FBckI7QUFDQSxZQUFLK0IsSUFBTCxDQUFVSyxNQUFWLEdBQW1CLElBQW5CO0FBQ0EsWUFBS1AsUUFBTDtBQUNEOzs7Z0NBRVU7QUFDVCxZQUFLN0IsT0FBTCxDQUFhcUMsU0FBYixDQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixLQUFLVixXQUFsQyxFQUErQyxLQUFLRCxZQUFwRDtBQUNBLFlBQUtRLGVBQUw7QUFDQSxZQUFLQyxVQUFMLENBQWdCLEtBQUtuQyxPQUFyQjtBQUNBLFlBQUtzQyxVQUFMLENBQWdCLEtBQUtQLElBQXJCO0FBQ0EsWUFBS3RCLE1BQUwsQ0FBWUMsS0FBWixDQUFrQixLQUFLVixPQUF2QjtBQUNBLFlBQUtTLE1BQUwsQ0FBWU4sS0FBWixHQUFvQixLQUFLTSxNQUFMLENBQVlOLEtBQVosR0FBb0IsRUFBeEM7QUFDQSxZQUFLTSxNQUFMLENBQVlHLElBQVosQ0FBaUIsS0FBS1osT0FBdEI7QUFDQSxZQUFLK0IsSUFBTCxDQUFVUSxFQUFWLEdBQWUsS0FBS1IsSUFBTCxDQUFVUSxFQUFWLElBQWdCLENBQS9CO0FBQ0EsWUFBS1IsSUFBTCxDQUFVUyxFQUFWLEdBQWUsS0FBS1QsSUFBTCxDQUFVUyxFQUFWLElBQWdCLENBQS9CO0FBQ0EsWUFBS1gsUUFBTDtBQUNEOzs7a0NBRVk7QUFDWCxZQUFLRSxJQUFMLENBQVVLLE1BQVYsR0FBbUIsSUFBbkI7QUFDQSxZQUFLTCxJQUFMLENBQVVVLENBQVYsR0FBYyxHQUFkO0FBQ0EsWUFBS1YsSUFBTCxDQUFVVyxDQUFWLEdBQWMsR0FBZDtBQUNBLFlBQUtYLElBQUwsQ0FBVVEsRUFBVixHQUFlLENBQWY7QUFDQSxZQUFLUixJQUFMLENBQVVTLEVBQVYsR0FBZSxDQUFmO0FBQ0Q7OzsyQkFFSztBQUNKLFdBQUksS0FBS1osTUFBTCxDQUFZZSxNQUFaLEtBQXVCLENBQTNCLEVBQThCO0FBQzVCLGNBQUszQixRQUFMLEdBQWdCLElBQWhCO0FBQ0EsY0FBS2UsSUFBTCxDQUFVSyxNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsY0FBS3RCLEtBQUwsSUFBYyxDQUFkO0FBQ0Q7QUFDRjs7OzhCQUVRZCxPLEVBQVMrQixJLEVBQU07QUFDdEIsV0FBSUEsS0FBS1csQ0FBTCxJQUFVLE1BQU1YLEtBQUthLE1BQXpCLEVBQWlDO0FBQy9CLGNBQUtiLElBQUwsQ0FBVXJCLEtBQVYsQ0FBZ0JWLE9BQWhCO0FBQ0EsY0FBS3NDLFVBQUwsQ0FBZ0JQLElBQWhCO0FBQ0EsY0FBS0UsS0FBTCxHQUFhLEtBQUtBLEtBQUwsR0FBYSxDQUExQjtBQUNBLGNBQUtGLElBQUwsQ0FBVVMsRUFBVixHQUFlLENBQUMsS0FBS1QsSUFBTCxDQUFVUyxFQUFYLEdBQWdCLENBQS9CO0FBQ0Q7QUFDRjs7O2dDQUVVO0FBQ1QsV0FBSSxLQUFLUCxLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFDcEIsY0FBS0YsSUFBTCxDQUFVSyxNQUFWLEdBQW1CLEtBQW5CO0FBQ0EsY0FBS3BDLE9BQUwsQ0FBYXFDLFNBQWIsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsS0FBS1YsV0FBbEMsRUFBK0MsS0FBS0QsWUFBcEQ7QUFDQSxjQUFLMUIsT0FBTCxDQUFhNkMsSUFBYixHQUFvQixtQkFBcEI7QUFDQSxjQUFLN0MsT0FBTCxDQUFhOEMsUUFBYixDQUFzQixZQUF0QixFQUFvQyxFQUFwQyxFQUF3QyxHQUF4QztBQUNEO0FBQ0Y7OztrQ0FFWTtBQUNYLFdBQUksS0FBSzlCLFFBQUwsS0FBa0IsSUFBdEIsRUFBNEI7QUFDMUIsY0FBSytCLFdBQUw7QUFDRDtBQUNGOzs7bUNBRWE7QUFDWixZQUFLL0MsT0FBTCxDQUFhcUMsU0FBYixDQUF1QixDQUF2QixFQUEwQixDQUExQixFQUE2QixLQUFLVixXQUFsQyxFQUErQyxLQUFLRCxZQUFwRDtBQUNBLFlBQUsxQixPQUFMLENBQWE2QyxJQUFiLEdBQW9CLG1CQUFwQjtBQUNBLFlBQUs3QyxPQUFMLENBQWE4QyxRQUFiLENBQXNCLFlBQXRCLEVBQW9DLEVBQXBDLEVBQXdDLEdBQXhDO0FBQ0EsWUFBSzlDLE9BQUwsQ0FBYThDLFFBQWIsQ0FBc0IsZUFBdEIsRUFBdUMsRUFBdkMsRUFBMkMsR0FBM0M7QUFDRDs7O2lDQUVXO0FBQ1YsWUFBS3JDLE1BQUwsQ0FBWUcsSUFBWixDQUFpQixLQUFLWixPQUF0QjtBQUNBLFlBQUtrQyxlQUFMO0FBQ0EsWUFBS0MsVUFBTCxDQUFnQixLQUFLbkMsT0FBckI7QUFDQSxZQUFLNkIsUUFBTDtBQUNEOzs7Z0NBRVU7QUFDVCxZQUFLRyxLQUFMLElBQWMsRUFBZDtBQUNEOzs7b0NBRWM7QUFDYixXQUFJZ0IsY0FBY2xELFNBQVNDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBbEI7O0FBRUFpRCxtQkFBWUMsU0FBWixHQUF3QixLQUFLakIsS0FBN0I7QUFDRDs7O29DQUVjO0FBQ2IsV0FBSWtCLGNBQWNwRCxTQUFTQyxjQUFULENBQXdCLGNBQXhCLENBQWxCOztBQUVBbUQsbUJBQVlELFNBQVosR0FBd0IsS0FBS25DLEtBQTdCO0FBQ0Q7OztvQ0FFYztBQUNiLFdBQUlxQyxjQUFjckQsU0FBU0MsY0FBVCxDQUF3QixjQUF4QixDQUFsQjs7QUFFQW9ELG1CQUFZRixTQUFaLEdBQXdCLEtBQUtoQixLQUE3QjtBQUNEOzs7dUNBRWlCO0FBQ2hCLFlBQUssSUFBSVEsSUFBSSxFQUFiLEVBQWtCQSxJQUFJLEdBQXRCLEVBQTJCQSxLQUFLLEVBQWhDLEVBQW9DO0FBQ2xDLGNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEdBQXBCLEVBQXlCQSxLQUFLLEVBQTlCLEVBQWtDO0FBQ2hDLGVBQUlVLFFBQVEsSUFBSTdCLEtBQUosQ0FBV2tCLENBQVgsRUFBY0MsQ0FBZCxFQUFpQixFQUFqQixFQUFxQixFQUFyQixDQUFaOztBQUVBLGdCQUFLZCxNQUFMLENBQVl5QixJQUFaLENBQWlCRCxLQUFqQjtBQUNEO0FBQ0Y7QUFDRjs7O2dDQUVVcEQsTyxFQUFTO0FBQ2xCLFlBQUs0QixNQUFMLENBQVkwQixPQUFaLENBQW9CO0FBQUEsZ0JBQVNGLE1BQU14QyxJQUFOLENBQVdaLE9BQVgsQ0FBVDtBQUFBLFFBQXBCO0FBQ0Q7OztnQ0FFVUEsTyxFQUFTK0IsSSxFQUFNO0FBQ3hCLFlBQUt0QixNQUFMLENBQVk4QyxlQUFaLENBQTRCeEIsSUFBNUIsRUFBa0NuQixJQUFsQyxDQUF1Q1osT0FBdkM7QUFDRDs7OzhCQUVRQSxPLEVBQVM7QUFDaEIsWUFBSytCLElBQUwsQ0FBVXJCLEtBQVYsQ0FBZ0JWLE9BQWhCLEVBQXlCd0QsUUFBekIsQ0FBa0N4RCxPQUFsQyxFQUEyQ1ksSUFBM0MsQ0FBZ0RaLE9BQWhEO0FBQ0Q7OztvQ0FFY0EsTyxFQUFTK0IsSSxFQUFNO0FBQUE7O0FBQzVCLFlBQUtILE1BQUwsQ0FBWTBCLE9BQVosQ0FBb0IsVUFBQ0YsS0FBRCxFQUFRSyxDQUFSLEVBQVdDLEtBQVgsRUFBb0I7QUFDdEMsYUFBSTNCLEtBQUtXLENBQUwsR0FBU1gsS0FBS2EsTUFBZCxJQUF3QlEsTUFBTVYsQ0FBTixHQUFVVSxNQUFNaEQsTUFBeEMsSUFDRDJCLEtBQUtVLENBQUwsSUFBVVcsTUFBTVgsQ0FEZixJQUVEVixLQUFLVSxDQUFMLElBQVVXLE1BQU1YLENBQU4sR0FBVVcsTUFBTWpELEtBRjdCLEVBRW9DO0FBQ2xDNEIsZ0JBQUtTLEVBQUwsR0FBVSxDQUFFVCxLQUFLUyxFQUFqQjtBQUNBWSxpQkFBTTFDLEtBQU4sQ0FBWVYsT0FBWjtBQUNBMEQsaUJBQU1DLE1BQU4sQ0FBYUYsQ0FBYixFQUFnQixDQUFoQjtBQUNBLGlCQUFLRyxRQUFMO0FBQ0Q7QUFDRCxhQUFJN0IsS0FBS1csQ0FBTCxHQUFTWCxLQUFLYSxNQUFkLElBQXdCUSxNQUFNVixDQUE5QixJQUNEWCxLQUFLVSxDQUFMLEdBQVNWLEtBQUthLE1BQWQsSUFBd0JRLE1BQU1YLENBQU4sR0FBVVcsTUFBTWpELEtBRHZDLElBRUQ0QixLQUFLVSxDQUFMLEdBQVNWLEtBQUthLE1BQWQsSUFBd0JRLE1BQU1YLENBRjdCLElBR0RWLEtBQUtXLENBQUwsR0FBU1gsS0FBS2EsTUFBZCxJQUF5QlEsTUFBTVYsQ0FBTixHQUFVVSxNQUFNaEQsTUFINUMsRUFHb0Q7QUFDbEQsZUFBSTJCLEtBQUtVLENBQUwsR0FBU1YsS0FBS2EsTUFBZCxJQUF3QlEsTUFBTVgsQ0FBOUIsSUFDSlYsS0FBS1UsQ0FBTCxHQUFTVixLQUFLYSxNQUFkLElBQXdCUSxNQUFNWCxDQUFOLEdBQVVXLE1BQU1qRCxLQUR4QyxFQUMrQztBQUM3QzRCLGtCQUFLUSxFQUFMLEdBQVUsQ0FBQ1IsS0FBS1EsRUFBaEI7QUFDQWEsbUJBQU0xQyxLQUFOLENBQVlWLE9BQVo7QUFDQTBELG1CQUFNQyxNQUFOLENBQWFGLENBQWIsRUFBZ0IsQ0FBaEI7QUFDQSxtQkFBS0csUUFBTDtBQUNEO0FBQ0Y7QUFDRixRQXJCRDtBQXNCRDs7O2dDQUVVO0FBQ1QsV0FBSSxLQUFLN0IsSUFBTCxDQUFVSyxNQUFWLEtBQXFCLElBQXpCLEVBQStCO0FBQzdCLGNBQUt5QixjQUFMLENBQW9CLEtBQUs3RCxPQUF6QixFQUFrQyxLQUFLK0IsSUFBdkM7QUFDQSxjQUFLK0IsVUFBTCxDQUFnQixLQUFLOUQsT0FBckIsRUFBOEIsS0FBSytCLElBQW5DO0FBQ0EsY0FBS2dDLFFBQUwsQ0FBYyxLQUFLL0QsT0FBbkI7QUFDQWdFLCtCQUFzQixLQUFLbkMsUUFBM0I7QUFDQSxjQUFLb0MsR0FBTCxDQUFTLEtBQUtyQyxNQUFkO0FBQ0EsY0FBS3NDLFVBQUw7QUFDQSxjQUFLL0IsVUFBTCxDQUFnQixLQUFLbkMsT0FBckI7QUFDQSxjQUFLbUUsWUFBTDtBQUNBLGNBQUtDLFlBQUw7QUFDQSxjQUFLQyxZQUFMO0FBQ0EsY0FBS0MsUUFBTCxDQUFjLEtBQUt0RSxPQUFuQixFQUE0QixLQUFLK0IsSUFBakM7QUFDQSxjQUFLd0MsUUFBTCxDQUFjLEtBQUt2RSxPQUFuQjtBQUNEO0FBQ0Y7Ozs7OztBQUlId0UsUUFBT0MsT0FBUCxHQUFpQjlFLElBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0TEEsS0FBTStFLFlBQVksbUJBQUE5RSxDQUFRLENBQVIsQ0FBbEI7O0tBRU0yQixLOzs7QUFDSixrQkFBWWtCLENBQVosRUFBZUMsQ0FBZixFQUFrQnRDLE1BQWxCLEVBQTBCRCxLQUExQixFQUFpQztBQUFBOztBQUFBLDBHQUN6QnNDLENBRHlCLEVBQ3RCQyxDQURzQixFQUNuQnRDLE1BRG1CLEVBQ1hELEtBRFc7QUFFaEM7Ozs7MkJBRUtILE8sRUFBUztBQUNiQSxlQUFRcUMsU0FBUixDQUFrQixLQUFLSSxDQUF2QixFQUEwQixLQUFLQyxDQUEvQixFQUFrQyxLQUFLdEMsTUFBdkMsRUFBK0MsS0FBS0QsS0FBcEQ7QUFDQSxjQUFPLElBQVA7QUFDRDs7OzBCQUVJSCxPLEVBQVM7QUFDWkEsZUFBUTJFLFNBQVIsR0FBb0IsUUFBcEI7QUFDQTNFLGVBQVE0RSxRQUFSLENBQWlCLEtBQUtuQyxDQUF0QixFQUF5QixLQUFLQyxDQUE5QixFQUFpQyxLQUFLdEMsTUFBdEMsRUFBOEMsS0FBS0QsS0FBbkQ7QUFDQSxjQUFPLElBQVA7QUFDRDs7OztHQWRpQnVFLFM7O0FBaUJwQkYsUUFBT0MsT0FBUCxHQUFpQmxELEtBQWpCLEM7Ozs7Ozs7Ozs7S0NuQk1tRCxTLEdBQ0osbUJBQVlqQyxDQUFaLEVBQWVDLENBQWYsRUFBa0J2QyxLQUFsQixFQUF5QkMsTUFBekIsRUFBaUM7QUFBQTs7QUFDL0IsUUFBS3FDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFFBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFFBQUt2QyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxRQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDRCxFOztBQUdIb0UsUUFBT0MsT0FBUCxHQUFpQkMsU0FBakIsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBLEtBQU1BLFlBQVksbUJBQUE5RSxDQUFRLENBQVIsQ0FBbEI7O0tBR000QixNOzs7QUFDSixtQkFBWWlCLENBQVosRUFBZUMsQ0FBZixFQUFrQnZDLEtBQWxCLEVBQXlCQyxNQUF6QixFQUFpQztBQUFBOztBQUFBLDRHQUN6QnFDLENBRHlCLEVBQ3RCQyxDQURzQixFQUNuQnZDLEtBRG1CLEVBQ1pDLE1BRFk7QUFHaEM7Ozs7MEJBRUtKLE8sRUFBUztBQUNiQSxlQUFRMkUsU0FBUixHQUFvQixRQUFwQjtBQUNBM0UsZUFBUTRFLFFBQVIsQ0FBaUIsS0FBS25DLENBQXRCLEVBQXlCLEtBQUtDLENBQTlCLEVBQWlDLEtBQUt2QyxLQUF0QyxFQUE2QyxLQUFLQyxNQUFsRDtBQUNBLGNBQU8sSUFBUDtBQUNEOzs7MkJBRU1KLE8sRUFBUztBQUNkQSxlQUFRcUMsU0FBUixDQUFrQixLQUFLSSxDQUF2QixFQUEwQixLQUFLQyxDQUEvQixFQUFrQyxLQUFLdkMsS0FBdkMsRUFBOEMsS0FBS0MsTUFBbkQ7QUFDQSxjQUFPLElBQVA7QUFDRDs7OzBCQUVJSSxDLEVBQUdtQixXLEVBQWE7O0FBRW5CLGVBQVFuQixFQUFFcUUsT0FBVjs7QUFFQSxjQUFLLEVBQUw7QUFDRSxlQUFLLEtBQUtwQyxDQUFMLEdBQVNkLGNBQWMsS0FBS3hCLEtBQWpDLEVBQXdDO0FBQ3RDLGtCQUFLc0MsQ0FBTCxJQUFVLEVBQVY7QUFDRDtBQUNEO0FBQ0YsY0FBSyxFQUFMO0FBQ0UsZUFBSSxLQUFLQSxDQUFMLElBQVUsQ0FBZCxFQUFpQjtBQUNmLGtCQUFLQSxDQUFMLElBQVUsRUFBVjtBQUNEO0FBQ0Q7QUFYRjtBQWFEOzs7cUNBQ2VWLEksRUFBTTtBQUNwQixXQUFJQSxLQUFLVyxDQUFMLEdBQVNYLEtBQUthLE1BQWQsSUFBd0IsS0FBS0YsQ0FBN0IsSUFDQ1gsS0FBS1UsQ0FBTCxHQUFTVixLQUFLYSxNQUFkLElBQXdCLEtBQUtILENBQUwsR0FBUyxLQUFLdEMsS0FEdkMsSUFFQzRCLEtBQUtVLENBQUwsR0FBU1YsS0FBS2EsTUFBZCxJQUF3QixLQUFLSCxDQUY5QixJQUdDVixLQUFLVyxDQUFMLEdBQVNYLEtBQUthLE1BQWQsSUFBeUIsS0FBS0YsQ0FBTCxHQUFTLEtBQUt0QyxNQUg1QyxFQUdvRDtBQUNsRCxhQUFLMkIsS0FBS1UsQ0FBTCxHQUFTVixLQUFLYSxNQUFkLElBQXdCLEtBQUtILENBQTdCLElBQ0hWLEtBQUtVLENBQUwsR0FBU1YsS0FBS2EsTUFBZCxJQUF3QixLQUFLSCxDQUFMLEdBQVMsS0FBS3RDLEtBRHhDLEVBQytDO0FBQzdDNEIsZ0JBQUtRLEVBQUwsR0FBVSxDQUFDUixLQUFLUSxFQUFoQjtBQUNELFVBSEQsTUFHTztBQUNMUixnQkFBS1MsRUFBTCxHQUFVLENBQUVULEtBQUtTLEVBQWpCO0FBQ0Q7QUFDRjtBQUNELGNBQU8sSUFBUDtBQUNEOzs7O0dBOUNrQmtDLFM7O0FBcURyQkYsUUFBT0MsT0FBUCxHQUFpQmpELE1BQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4REEsS0FBTWtELFlBQVksbUJBQUE5RSxDQUFRLENBQVIsQ0FBbEI7O0tBR002QixJOzs7QUFDSixpQkFBWWdCLENBQVosRUFBZUMsQ0FBZixFQUFrQkUsTUFBbEIsRUFBMEJMLEVBQTFCLEVBQThCQyxFQUE5QixFQUFrQztBQUFBOztBQUFBLDZHQUMxQkMsQ0FEMEIsRUFDdkJDLENBRHVCOztBQUVoQyxXQUFLRSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxXQUFLTCxFQUFMLEdBQVVBLEVBQVY7QUFDQSxXQUFLQyxFQUFMLEdBQVUsQ0FBQ0EsRUFBWDtBQUNBLFdBQUtzQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQkMsS0FBS0MsRUFBTCxHQUFVLENBQTFCO0FBQ0EsV0FBSzdDLE1BQUwsR0FBYyxLQUFkO0FBUGdDO0FBUWpDOzs7OzJCQUVLcEMsTyxFQUFTO0FBQ2JBLGVBQVFxQyxTQUFSLENBQWtCLEtBQUtJLENBQUwsR0FBUyxLQUFLRyxNQUFoQyxFQUNFLEtBQUtGLENBQUwsR0FBUyxLQUFLRSxNQURoQixFQUVFLEtBQUtBLE1BQUwsR0FBYyxDQUZoQixFQUdFLEtBQUtBLE1BQUwsR0FBYyxDQUhoQjtBQUlBLGNBQU8sSUFBUDtBQUNEOzs7MEJBRUk1QyxPLEVBQVM7QUFDWkEsZUFBUWtGLFNBQVI7QUFDQWxGLGVBQVFtRixHQUFSLENBQVksS0FBSzFDLENBQWpCLEVBQW9CLEtBQUtDLENBQXpCLEVBQTRCLEtBQUtFLE1BQWpDLEVBQXlDLEtBQUtrQyxVQUE5QyxFQUEwRCxLQUFLQyxRQUEvRDtBQUNBL0UsZUFBUTJFLFNBQVIsR0FBb0IsTUFBcEI7QUFDQTNFLGVBQVFvRixJQUFSO0FBQ0FwRixlQUFRcUYsU0FBUjtBQUNBLGNBQU8sSUFBUDtBQUNEOzs7Z0NBRVU7QUFDVCxZQUFLNUMsQ0FBTCxJQUFVLEtBQUtGLEVBQWY7QUFDQSxZQUFLRyxDQUFMLElBQVUsS0FBS0YsRUFBZjs7QUFFQSxXQUFJLEtBQUtDLENBQUwsSUFBVSxNQUFNLEtBQUtHLE1BQXJCLElBQStCLEtBQUtILENBQUwsSUFBVSxJQUFJLEtBQUtHLE1BQXRELEVBQThEO0FBQzVELGNBQUtMLEVBQUwsR0FBVSxDQUFDLEtBQUtBLEVBQWhCO0FBQ0Q7QUFDRCxXQUFJLEtBQUtHLENBQUwsSUFBVSxJQUFJLEtBQUtFLE1BQXZCLEVBQStCO0FBQzdCLGNBQUtKLEVBQUwsR0FBVSxDQUFDLEtBQUtBLEVBQWhCO0FBQ0Q7QUFDRCxjQUFPLElBQVA7QUFDRDs7OztHQXZDZ0JrQyxTOztBQTBDbkJGLFFBQU9DLE9BQVAsR0FBaUJoRCxJQUFqQixDIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTViMzI0NzM4ZDk2N2JjMDBiMTgiLCJjb25zdCBHYW1lID0gcmVxdWlyZSgnLi9HYW1lLmpzJyk7XG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpO1xuY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGNvbnRleHQsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5jb25zdCByZXNldEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldC1idXR0b24nKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gIGdhbWUucGFkZGxlLmVyYXNlKGNvbnRleHQpXG4gIGdhbWUucGFkZGxlLm1vdmUoZSwgY2FudmFzLndpZHRoKTtcbiAgZ2FtZS5wYWRkbGUuZHJhdyhjb250ZXh0KVxufSk7IFxuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGV2ZWwpXG5yZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlc2V0R2FtZSk7XG5cbmZ1bmN0aW9uIGxldmVsKCkge1xuICBpZiAoZ2FtZS5sZXZlbCA+IDEgJiYgZ2FtZS5sZXZlbFdvbiA9PT0gdHJ1ZSkge1xuICAgIGdhbWUubGV2ZWxXb24gPSBmYWxzZTtcbiAgICBnYW1lLm5ld0xldmVsKCk7XG4gIH0gXG59XG5cbnN0YXJ0R2FtZUltYWdlKCk7XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZUltYWdlKCkge1xuICBjYW52YXMuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4uL2Fzc2V0cy9icmVha291dF8xLmpwZycpXCJcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBjYW52YXMuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4uL2Fzc2V0cy9nYW1lLWJhY2tncm91bmQuanBnJylcIlxuICBnYW1lLnN0YXJ0R2FtZSgpO1xufVxuXG5mdW5jdGlvbiByZXNldEdhbWUoKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2luZGV4LmpzIiwiY29uc3QgQmxvY2sgPSByZXF1aXJlKCcuL0Jsb2NrLmpzJyk7XG5jb25zdCBQYWRkbGUgPSByZXF1aXJlKCcuL1BhZGRsZS5qcycpO1xuY29uc3QgQmFsbCA9IHJlcXVpcmUoJy4vQmFsbC5qcycpO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoY29udGV4dCwgY2FudmFzSGVpZ2h0LCBjYW52YXNXaWR0aCkge1xuICAgIHRoaXMuY2FudmFzSGVpZ2h0ID0gY2FudmFzSGVpZ2h0O1xuICAgIHRoaXMuY2FudmFzV2lkdGggPSBjYW52YXNXaWR0aDtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0OyBcbiAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgIHRoaXMuZ2FtZUxvb3AgPSB0aGlzLmdhbWVMb29wLmJpbmQodGhpcylcbiAgICB0aGlzLnBhZGRsZSA9IG5ldyBQYWRkbGUoMTcwLCA1NTAsIDEzMCwgMTApXG4gICAgdGhpcy5iYWxsID0gbmV3IEJhbGwoMTAwLCA1MzQsIDE1LCA1LCA1KVxuICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgIHRoaXMubGV2ZWxXb24gPSBmYWxzZTtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmJhbGxzID0gMztcbiAgfVxuXG4gIHN0YXJ0R2FtZSgpIHtcbiAgICB0aGlzLnBhZGRsZS5kcmF3KHRoaXMuY29udGV4dClcbiAgICB0aGlzLmZpbGxCbG9ja3NBcnJheSgpO1xuICAgIHRoaXMuZHJhd0Jsb2Nrcyh0aGlzLmNvbnRleHQpXG4gICAgdGhpcy5iYWxsLmluUGxheSA9IHRydWU7XG4gICAgdGhpcy5nYW1lTG9vcCgpO1xuICB9XG5cbiAgbmV3TGV2ZWwoKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc1dpZHRoLCB0aGlzLmNhbnZhc0hlaWdodClcbiAgICB0aGlzLmZpbGxCbG9ja3NBcnJheSgpO1xuICAgIHRoaXMuZHJhd0Jsb2Nrcyh0aGlzLmNvbnRleHQpXG4gICAgdGhpcy5yZWxvYWRCYWxsKHRoaXMuYmFsbCk7XG4gICAgdGhpcy5wYWRkbGUuZXJhc2UodGhpcy5jb250ZXh0KVxuICAgIHRoaXMucGFkZGxlLndpZHRoID0gdGhpcy5wYWRkbGUud2lkdGggLSAxMDtcbiAgICB0aGlzLnBhZGRsZS5kcmF3KHRoaXMuY29udGV4dClcbiAgICB0aGlzLmJhbGwuZHggPSB0aGlzLmJhbGwuZHggKz0gMTtcbiAgICB0aGlzLmJhbGwuZHkgPSB0aGlzLmJhbGwuZHkgKz0gMTtcbiAgICB0aGlzLmdhbWVMb29wKClcbiAgfVxuXG4gIHJlbG9hZEJhbGwoKSB7XG4gICAgdGhpcy5iYWxsLmluUGxheSA9IHRydWU7XG4gICAgdGhpcy5iYWxsLnggPSAxMDA7XG4gICAgdGhpcy5iYWxsLnkgPSAzOTQ7XG4gICAgdGhpcy5iYWxsLmR4ID0gNTtcbiAgICB0aGlzLmJhbGwuZHkgPSA1O1xuICB9XG5cbiAgd2luKCkge1xuICAgIGlmICh0aGlzLmJsb2Nrcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMubGV2ZWxXb24gPSB0cnVlO1xuICAgICAgdGhpcy5iYWxsLmluUGxheSA9IGZhbHNlO1xuICAgICAgdGhpcy5sZXZlbCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGxvc2VCYWxsKGNvbnRleHQsIGJhbGwpIHtcbiAgICBpZiAoYmFsbC55ID49IDYwMCAtIGJhbGwucmFkaXVzKSB7XG4gICAgICB0aGlzLmJhbGwuZXJhc2UoY29udGV4dClcbiAgICAgIHRoaXMucmVsb2FkQmFsbChiYWxsKVxuICAgICAgdGhpcy5iYWxscyA9IHRoaXMuYmFsbHMgLSAxO1xuICAgICAgdGhpcy5iYWxsLmR5ID0gLXRoaXMuYmFsbC5keSAvIDE7XG4gICAgfVxuICB9XG5cbiAgZ2FtZU92ZXIoKSB7XG4gICAgaWYgKHRoaXMuYmFsbHMgPT09IDApIHtcbiAgICAgIHRoaXMuYmFsbC5pblBsYXkgPSBmYWxzZTtcbiAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNXaWR0aCwgdGhpcy5jYW52YXNIZWlnaHQpXG4gICAgICB0aGlzLmNvbnRleHQuZm9udCA9ICc1MHB4IFJhbW1ldHRvIE9uZSc7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoJ0dBTUUgT1ZFUiEnLCA1MCwgMjUwKVxuICAgIH1cbiAgfVxuXG4gIHRyYW5zaXRpb24oKSB7XG4gICAgaWYgKHRoaXMubGV2ZWxXb24gPT09IHRydWUpIHtcbiAgICAgIHRoaXMudXBkYXRlTGV2ZWwoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVMZXZlbCgpIHtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzV2lkdGgsIHRoaXMuY2FudmFzSGVpZ2h0KVxuICAgIHRoaXMuY29udGV4dC5mb250ID0gJzUwcHggUmFtbWV0dG8gT25lJztcbiAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoJ05FWFQgTEVWRUwnLCA2MCwgMjUwKVxuICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCgnQ2xpY2sgdG8gcGxheScsIDUwLCAzNTApXG4gIH1cblxuICBuZXh0TGV2ZWwoKSB7XG4gICAgdGhpcy5wYWRkbGUuZHJhdyh0aGlzLmNvbnRleHQpXG4gICAgdGhpcy5maWxsQmxvY2tzQXJyYXkoKTtcbiAgICB0aGlzLmRyYXdCbG9ja3ModGhpcy5jb250ZXh0KVxuICAgIHRoaXMuZ2FtZUxvb3AoKTtcbiAgfVxuXG4gIGFkZFNjb3JlKCkge1xuICAgIHRoaXMuc2NvcmUgKz0gNTA7XG4gIH1cblxuICBkaXNwbGF5U2NvcmUoKSB7XG4gICAgdmFyIHNjb3JlTnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY29yZS1udW1iZXJcIilcblxuICAgIHNjb3JlTnVtYmVyLmlubmVyVGV4dCA9IHRoaXMuc2NvcmU7XG4gIH1cblxuICBkaXNwbGF5TGV2ZWwoKSB7XG4gICAgdmFyIGxldmVsTnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZXZlbC1udW1iZXJcIilcblxuICAgIGxldmVsTnVtYmVyLmlubmVyVGV4dCA9IHRoaXMubGV2ZWw7XG4gIH0gIFxuXG4gIGRpc3BsYXlCYWxscygpIHtcbiAgICB2YXIgYmFsbHNOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhbGxzLW51bWJlclwiKVxuXG4gICAgYmFsbHNOdW1iZXIuaW5uZXJUZXh0ID0gdGhpcy5iYWxscztcbiAgfSAgXG5cbiAgZmlsbEJsb2Nrc0FycmF5KCkge1xuICAgIGZvciAobGV0IHggPSAxMDsgIHggPCA1MDA7IHggKz0gNTApIHtcbiAgICAgIGZvciAobGV0IHkgPSA1OyB5IDwgMjAwOyB5ICs9IDUwKSB7XG4gICAgICAgIGxldCBibG9jayA9IG5ldyBCbG9jayAoeCwgeSwgNDAsIDMwKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5ibG9ja3MucHVzaChibG9jaylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkcmF3QmxvY2tzKGNvbnRleHQpIHtcbiAgICB0aGlzLmJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IGJsb2NrLmRyYXcoY29udGV4dCkpXG4gIH1cblxuICBkcmF3UGFkZGxlKGNvbnRleHQsIGJhbGwpIHtcbiAgICB0aGlzLnBhZGRsZS5wYWRkbGVDb2xsaXNpb24oYmFsbCkuZHJhdyhjb250ZXh0KTsgXG4gIH1cblxuICBkcmF3QmFsbChjb250ZXh0KSB7XG4gICAgdGhpcy5iYWxsLmVyYXNlKGNvbnRleHQpLm1vdmVCYWxsKGNvbnRleHQpLmRyYXcoY29udGV4dCk7XG4gIH1cblxuICBibG9ja0NvbGxpc2lvbihjb250ZXh0LCBiYWxsKSB7XG4gICAgdGhpcy5ibG9ja3MuZm9yRWFjaCgoYmxvY2ssIGksIGFycmF5KSA9PnsgIFxuICAgICAgaWYgKGJhbGwueSAtIGJhbGwucmFkaXVzIDw9IGJsb2NrLnkgKyBibG9jay5oZWlnaHRcbiAgICAgICYmIGJhbGwueCA+PSBibG9jay54XG4gICAgICAmJiBiYWxsLnggPD0gYmxvY2sueCArIGJsb2NrLndpZHRoKSB7XG4gICAgICAgIGJhbGwuZHkgPSAtIGJhbGwuZHk7XG4gICAgICAgIGJsb2NrLmVyYXNlKGNvbnRleHQpXG4gICAgICAgIGFycmF5LnNwbGljZShpLCAxKVxuICAgICAgICB0aGlzLmFkZFNjb3JlKCk7XG4gICAgICB9XG4gICAgICBpZiAoYmFsbC55ICsgYmFsbC5yYWRpdXMgPj0gYmxvY2sueVxuICAgICAgJiYgYmFsbC54IC0gYmFsbC5yYWRpdXMgPD0gYmxvY2sueCArIGJsb2NrLndpZHRoIFxuICAgICAgJiYgYmFsbC54ICsgYmFsbC5yYWRpdXMgPj0gYmxvY2sueFxuICAgICAgJiYgYmFsbC55IC0gYmFsbC5yYWRpdXMgIDw9IGJsb2NrLnkgKyBibG9jay5oZWlnaHQpIHsgXG4gICAgICAgIGlmIChiYWxsLnggKyBiYWxsLnJhZGl1cyA8PSBibG9jay54IHx8XG4gICAgICAgIGJhbGwueCAtIGJhbGwucmFkaXVzID49IGJsb2NrLnggKyBibG9jay53aWR0aCkge1xuICAgICAgICAgIGJhbGwuZHggPSAtYmFsbC5keDtcbiAgICAgICAgICBibG9jay5lcmFzZShjb250ZXh0KTtcbiAgICAgICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgdGhpcy5hZGRTY29yZSgpO1xuICAgICAgICB9XG4gICAgICB9IFxuICAgIH0pXG4gIH1cblxuICBnYW1lTG9vcCgpIHtcbiAgICBpZiAodGhpcy5iYWxsLmluUGxheSA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5ibG9ja0NvbGxpc2lvbih0aGlzLmNvbnRleHQsIHRoaXMuYmFsbClcbiAgICAgIHRoaXMuZHJhd1BhZGRsZSh0aGlzLmNvbnRleHQsIHRoaXMuYmFsbCk7XG4gICAgICB0aGlzLmRyYXdCYWxsKHRoaXMuY29udGV4dCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lTG9vcCk7XG4gICAgICB0aGlzLndpbih0aGlzLmJsb2Nrcyk7XG4gICAgICB0aGlzLnRyYW5zaXRpb24oKTtcbiAgICAgIHRoaXMuZHJhd0Jsb2Nrcyh0aGlzLmNvbnRleHQpO1xuICAgICAgdGhpcy5kaXNwbGF5U2NvcmUoKTtcbiAgICAgIHRoaXMuZGlzcGxheUxldmVsKCk7XG4gICAgICB0aGlzLmRpc3BsYXlCYWxscygpO1xuICAgICAgdGhpcy5sb3NlQmFsbCh0aGlzLmNvbnRleHQsIHRoaXMuYmFsbClcbiAgICAgIHRoaXMuZ2FtZU92ZXIodGhpcy5jb250ZXh0KVxuICAgIH1cbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvR2FtZS5qcyIsImNvbnN0IEdhbWVwaWVjZSA9IHJlcXVpcmUoJy4vR2FtZXBpZWNlJyk7XG5cbmNsYXNzIEJsb2NrIGV4dGVuZHMgR2FtZXBpZWNlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgaGVpZ2h0LCB3aWR0aCkge1xuICAgIHN1cGVyKHgsIHksIGhlaWdodCwgd2lkdGgpXG4gIH1cblxuICBlcmFzZShjb250ZXh0KSB7XG4gICAgY29udGV4dC5jbGVhclJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBkcmF3KGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdvcmFuZ2UnO1xuICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCbG9jaztcblxuXG4gIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9CbG9jay5qcyIsImNsYXNzIEdhbWVwaWVjZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZXBpZWNlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lcGllY2UuanMiLCJjb25zdCBHYW1lcGllY2UgPSByZXF1aXJlKCcuL0dhbWVwaWVjZScpO1xuXG5cbmNsYXNzIFBhZGRsZSBleHRlbmRzIEdhbWVwaWVjZSB7XG4gIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcih4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcblxuICB9XG4gIFxuICBkcmF3IChjb250ZXh0KSB7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnb3JhbmdlJztcbiAgICBjb250ZXh0LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVyYXNlIChjb250ZXh0KSB7XG4gICAgY29udGV4dC5jbGVhclJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBtb3ZlKGUsIGNhbnZhc1dpZHRoKSB7XG5cbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuXG4gICAgY2FzZSAzOTpcbiAgICAgIGlmICggdGhpcy54IDwgY2FudmFzV2lkdGggLSB0aGlzLndpZHRoKSB7XG4gICAgICAgIHRoaXMueCArPSA1MDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzc6XG4gICAgICBpZiAodGhpcy54ID49IDApIHtcbiAgICAgICAgdGhpcy54IC09IDUwO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHBhZGRsZUNvbGxpc2lvbihiYWxsKSB7XG4gICAgaWYgKGJhbGwueSArIGJhbGwucmFkaXVzID49IHRoaXMueVxuICAgICAgJiYgYmFsbC54IC0gYmFsbC5yYWRpdXMgPD0gdGhpcy54ICsgdGhpcy53aWR0aCBcbiAgICAgICYmIGJhbGwueCArIGJhbGwucmFkaXVzID49IHRoaXMueFxuICAgICAgJiYgYmFsbC55IC0gYmFsbC5yYWRpdXMgIDw9IHRoaXMueSArIHRoaXMuaGVpZ2h0KSB7IFxuICAgICAgaWYgKCBiYWxsLnggKyBiYWxsLnJhZGl1cyA8PSB0aGlzLnggfHxcbiAgICAgICAgYmFsbC54IC0gYmFsbC5yYWRpdXMgPj0gdGhpcy54ICsgdGhpcy53aWR0aCkge1xuICAgICAgICBiYWxsLmR4ID0gLWJhbGwuZHhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhbGwuZHkgPSAtIGJhbGwuZHlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG59XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFkZGxlO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvUGFkZGxlLmpzIiwiY29uc3QgR2FtZXBpZWNlID0gcmVxdWlyZSgnLi9HYW1lcGllY2UnKTtcblxuXG5jbGFzcyBCYWxsIGV4dGVuZHMgR2FtZXBpZWNlIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgcmFkaXVzLCBkeCwgZHkpIHtcbiAgICBzdXBlcih4LCB5KVxuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIHRoaXMuZHggPSBkeDtcbiAgICB0aGlzLmR5ID0gLWR5O1xuICAgIHRoaXMuc3RhcnRBbmdsZSA9IDA7XG4gICAgdGhpcy5lbmRBbmdsZSA9IE1hdGguUEkgKiAyO1xuICAgIHRoaXMuaW5QbGF5ID0gZmFsc2U7XG4gIH1cblxuICBlcmFzZShjb250ZXh0KSB7XG4gICAgY29udGV4dC5jbGVhclJlY3QodGhpcy54IC0gdGhpcy5yYWRpdXMsIFxuICAgICAgdGhpcy55IC0gdGhpcy5yYWRpdXMsIFxuICAgICAgdGhpcy5yYWRpdXMgKiAyLCBcbiAgICAgIHRoaXMucmFkaXVzICogMilcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZHJhdyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIHRoaXMuc3RhcnRBbmdsZSwgdGhpcy5lbmRBbmdsZSlcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdibHVlJztcbiAgICBjb250ZXh0LmZpbGwoKTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW92ZUJhbGwoKSB7XG4gICAgdGhpcy54ICs9IHRoaXMuZHg7XG4gICAgdGhpcy55ICs9IHRoaXMuZHk7XG5cbiAgICBpZiAodGhpcy54ID49IDUwMCAtIHRoaXMucmFkaXVzIHx8IHRoaXMueCA8PSAwICsgdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuZHggPSAtdGhpcy5keFxuICAgIH1cbiAgICBpZiAodGhpcy55IDw9IDAgKyB0aGlzLnJhZGl1cykge1xuICAgICAgdGhpcy5keSA9IC10aGlzLmR5XG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYWxsO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9CYWxsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==