(() => {
  "use strict";
  class t {
    constructor(t, ...s) {
      (this.bodyParts = s), (this._direction = t), (this.ateApple = !1);
    }
    advance() {
      const t = this.bodyParts[0].slice(),
        s = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] }[
          this._direction
        ],
        i = t.map((t, i) => t + s[i]);
      this.bodyParts.unshift(i),
        this.ateApple ? (this.ateApple = !1) : this.bodyParts.pop();
    }
    isColliding(t, s) {
      return this._isCollidingWalls(t, s) || this._isCollidingWithItself();
    }
    _isCollidingWalls(t, s) {
      const [i, e] = this.bodyParts.at(0),
        [h, a] = [0, t - 1],
        [n, o] = [0, s - 1];
      return h > i || i > a || n > e || e > o;
    }
    _isCollidingWithItself() {
      const [t, ...s] = this.bodyParts;
      return s.some((s) => s[0] === t[0] && s[1] === t[1]);
    }
    isEatingApple(t) {
      const s = this.bodyParts[0];
      return (this.ateApple = s.every((s, i) => s === t.position[i]));
    }
    set direction(t) {
      this._canTurn(t) && (this._direction = t);
    }
    get direction() {
      return this._direction;
    }
    _canTurn(t) {
      return {
        up: ["left", "right"],
        right: ["up", "down"],
        down: ["left", "right"],
        left: ["up", "down"],
      }[this._direction].includes(t);
    }
  }
  class s {
    constructor(t = [10, 10]) {
      this.position = t;
    }
    generateNewPosition(t, s) {
      const i = Math.round(Math.random() * (t - 1)),
        e = Math.round(Math.random() * (s - 1));
      return (this.position = [i, e]);
    }
    isOnSnake(t) {
      return t.some(
        (t) => t[0] === this.position[0] && t[1] === this.position[1]
      );
    }
  }
  class i extends HTMLCanvasElement {
    constructor(t = 600, s = t) {
      super(),
        (this.ctx = this.getContext("2d")),
        (this.width = t),
        (this.height = s),
        (this.center = { x: this.width / 2, y: this.height / 2 }),
        (this.widthInBlocks = 20),
        (this.heightInBlocks = 20),
        (this.centerInBlocks = {
          x: Math.floor(this.widthInBlocks / 2),
          y: Math.floor(this.heightInBlocks / 2),
        }),
        (this.blockSize = this.height / this.heightInBlocks),
        (this.font = "system-ui"),
        (this.headingSize = "90px "),
        (this.subTitleSize = "30px "),
        (this.scoreSize = "200px "),
        (this.colors = {
          light: "#44ab71",
          primary: "#2e8b57",
          secondary: "#1e5837",
        });
    }
    drawTitle(t) {
      this._draw(() => {
        (this.ctx.fillStyle = "black"),
          (this.ctx.letterSpacing = "-2px"),
          (this.ctx.textAlign = "center"),
          (this.ctx.textBaseline = "middle"),
          (this.ctx.font = "bold " + this.headingSize + this.font),
          this.ctx.strokeText(t, this.center.x, this.center.y - 180),
          this.ctx.fillText(t, this.center.x, this.center.y - 180);
      });
    }
    drawSubTitle(t) {
      this._draw(() => {
        (this.ctx.fillStyle = "white"),
          (this.ctx.textAlign = "center"),
          (this.ctx.textBaseline = "middle"),
          (this.ctx.strokeStyle = "black"),
          (this.ctx.lineJoin = "round"),
          (this.ctx.lineWidth = 5),
          (this.ctx.font = "bold " + this.subTitleSize + this.font),
          this.ctx.strokeText(t, this.center.x, this.center.y - 115),
          this.ctx.fillText(t, this.center.x, this.center.y - 115);
      });
    }
    drawSnake(t) {
      this._draw(() => {
        this.ctx.fillStyle = this.colors.secondary;
        for (let s of t) this._drawBlock(s);
      });
    }
    _drawBlock(t) {
      const [s, i] = t;
      this.ctx.fillRect(
        s * this.blockSize,
        i * this.blockSize,
        this.blockSize,
        this.blockSize
      );
    }
    drawApple(t) {
      this._draw(() => {
        const s = this.blockSize / 2,
          i = t[0] * this.blockSize + s,
          e = t[1] * this.blockSize + s;
        (this.ctx.fillStyle = this.colors.secondary),
          this.ctx.beginPath(),
          this.ctx.arc(i, e, s, 0, 2 * Math.PI, !0),
          this.ctx.fill();
      });
    }
    drawScore(t) {
      this._draw(() => {
        (this.ctx.font = "bold " + this.scoreSize + this.font),
          (this.ctx.fillStyle = this.colors.light),
          (this.ctx.textAlign = "center"),
          (this.ctx.textBaseline = "middle"),
          this.ctx.fillText(t.toString(), this.center.x, this.center.y);
      });
    }
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    _draw(t) {
      this.ctx.restore(), this.ctx.save(), t();
    }
  }
  customElements.define("game-canvas", i, { extends: "canvas" });
  class e {
    constructor(t = 600, s = t) {
      (this.canvas = new i(t, s)),
        this.snake,
        this.apple,
        this.score,
        this.speed,
        (this.acceleration = 0.95),
        (this.onStart = {
          speed: 200,
          score: 0,
          snakePosition: [
            "right",
            [4, this.canvas.centerInBlocks.y],
            [3, this.canvas.centerInBlocks.y],
            [2, this.canvas.centerInBlocks.y],
          ],
          applePosition: [
            Math.floor(0.75 * this.canvas.widthInBlocks),
            this.canvas.centerInBlocks.y,
          ],
        }),
        this.canvas.drawTitle("Snake Game"),
        this.canvas.drawSubTitle("Press space to play"),
        this.canvas.drawScore(this.onStart.score),
        this.canvas.drawSnake(this.onStart.snakePosition.slice(1)),
        this.canvas.drawApple(this.onStart.applePosition);
    }
    launch() {
      clearTimeout(this.timeout),
        (this.snake = new t(...this.onStart.snakePosition)),
        (this.apple = new s(this.onStart.applePosition)),
        (this.score = this.onStart.score),
        (this.speed = this.onStart.speed),
        this.gameLoop();
    }
    gameLoop() {
      this.snake.advance(),
        this.snake.isColliding(
          this.canvas.widthInBlocks,
          this.canvas.heightInBlocks
        )
          ? this.gameOverHandler()
          : (this.snake.isEatingApple(this.apple) && this.appleEatenHandler(),
            this.updateCanvas(),
            (this.timeout = setTimeout(this.gameLoop.bind(this), this.speed)));
    }
    gameOverHandler() {
      this.canvas.drawTitle("Game Over"),
        this.canvas.drawSubTitle("Press space to play");
    }
    appleEatenHandler() {
      this.score++, (this.speed *= this.acceleration);
      do {
        this.apple.generateNewPosition(
          this.canvas.heightInBlocks,
          this.canvas.heightInBlocks
        );
      } while (this.apple.isOnSnake(this.snake.bodyParts));
    }
    updateCanvas() {
      this.canvas.clear(),
        this.canvas.drawScore(this.score),
        this.canvas.drawSnake(this.snake.bodyParts),
        this.canvas.drawApple(this.apple.position);
    }
  }
  window.onload = () => {
    let t =
      ((s = new e()),
      (document.onkeydown = (t) => {
        let i;
        switch (t.code) {
          case "ArrowLeft":
            i = "left";
            break;
          case "ArrowUp":
            i = "up";
            break;
          case "ArrowRight":
            i = "right";
            break;
          case "ArrowDown":
            i = "down";
            break;
          case "Space":
            return void s.launch();
          default:
            return;
        }
        s.snake.direction = i;
      }),
      s);
    var s;
    document.getElementById("snake-game").appendChild(t.canvas);
  };
})();
