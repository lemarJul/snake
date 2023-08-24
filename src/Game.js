import Snake from "./Snake.js";
import Apple from "./Apple.js";
import Canvas from "./Canvas.js";

export default class Game {
  constructor(canvasWidth = 600, canvasHeight = canvasWidth) {
    this.canvas = new Canvas(canvasWidth, canvasHeight);
    this.snake;
    this.apple;
    this.score;
    this.speed;
    this.acceleration = 0.95;
    this.onStart = {
      speed: 200,
      score: 0,
      snakePosition: [
        "right",
        [4, this.canvas.centerInBlocks.y],
        [3, this.canvas.centerInBlocks.y],
        [2, this.canvas.centerInBlocks.y],
      ],
      applePosition: [
        Math.floor(this.canvas.widthInBlocks * 0.75),
        this.canvas.centerInBlocks.y,
      ],
    };

    this.canvas.drawTitle("Snake Game");
    this.canvas.drawSubTitle("Press space to play");
    this.canvas.drawScore(this.onStart.score);
    this.canvas.drawSnake(this.onStart.snakePosition.slice(1));
    this.canvas.drawApple(this.onStart.applePosition);
  }

  launch() {
    clearTimeout(this.timeout); // prevent multiple game loops on "Play Again"
    this.snake = new Snake(...this.onStart.snakePosition);
    this.apple = new Apple(this.onStart.applePosition);
    this.score = this.onStart.score;
    this.speed = this.onStart.speed;
    this.gameLoop();
  }

  gameLoop() {
    this.snake.advance();
    if (
      this.snake.isColliding(
        this.canvas.widthInBlocks,
        this.canvas.heightInBlocks
      )
    ) {
      this.gameOverHandler();
    } else {
      if (this.snake.isEatingApple(this.apple)) {
        this.appleEatenHandler();
      }

      this.updateCanvas();

      this.timeout = setTimeout(this.gameLoop.bind(this), this.speed);
    }
  }

  gameOverHandler() {
    this.canvas.drawTitle("Game Over");
    this.canvas.drawSubTitle("Press space to play");
  }

  appleEatenHandler() {
    this.score++;
    this.speed *= this.acceleration;

    do {
      this.apple.generateNewPosition(
        this.canvas.heightInBlocks,
        this.canvas.heightInBlocks
      );
    } while (this.apple.isOnSnake(this.snake.bodyParts));
  }

  updateCanvas() {
    this.canvas.clear();
    this.canvas.drawScore(this.score);
    this.canvas.drawSnake(this.snake.bodyParts);
    this.canvas.drawApple(this.apple.position);
  }
}
