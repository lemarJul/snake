export default class Canvas extends HTMLCanvasElement {
  constructor(canvasWidth = 600, canvasHeight = canvasWidth) {
    super();
    this.ctx = this.getContext("2d");
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.center = {
      x: this.width / 2,
      y: this.height / 2,
    };
    this.widthInBlocks = 20;
    this.heightInBlocks = 20;
    this.centerInBlocks = {
      x: Math.floor(this.widthInBlocks / 2),
      y: Math.floor(this.heightInBlocks / 2),
    };
    this.blockSize = this.height / this.heightInBlocks;

    this.font = "system-ui";
    this.headingSize = "90px ";
    this.subTitleSize = "30px ";
    this.scoreSize = "200px ";
    this.colors = {
        light: "#44ab71",
        primary: "#2e8b57",
        secondary: "#1e5837",
    };
  }


  drawTitle(string) {
    this._draw(() => {
      this.ctx.fillStyle = "black";
      this.ctx.letterSpacing = "-2px";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";

      this.ctx.font = "bold " + this.headingSize + this.font;
      this.ctx.strokeText(string, this.center.x, this.center.y - 180);
      this.ctx.fillText(string, this.center.x, this.center.y - 180);
    });
  }

  drawSubTitle(string) {
    this._draw(() => {
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.strokeStyle = "black";
      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = 5;

      this.ctx.font = "bold " + this.subTitleSize + this.font;
      this.ctx.strokeText(string, this.center.x, this.center.y - 115);
      this.ctx.fillText(string, this.center.x, this.center.y - 115);
    });
  }

  drawSnake(snakeBody) {
    this._draw(() => {
      this.ctx.fillStyle = this.colors.secondary;
      for (let part of snakeBody) {
        this._drawBlock(part);
      }
    });
  }
  _drawBlock(positionXY) {
    const [x, y] = positionXY;
    this.ctx.fillRect(
      x * this.blockSize,
      y * this.blockSize,
      this.blockSize,
      this.blockSize
    );
  }

  drawApple(applePosition) {
    this._draw(() => {
      const radius = this.blockSize / 2;
      const x = applePosition[0] * this.blockSize + radius;
      const y = applePosition[1] * this.blockSize + radius;
      this.ctx.fillStyle = this.colors.secondary;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      this.ctx.fill();
    });
  }
  drawScore(score) {
    this._draw(() => {
      this.ctx.font = "bold " + this.scoreSize + this.font;
      this.ctx.fillStyle = this.colors.light;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(score.toString(), this.center.x, this.center.y);
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  _draw(callback) {
    this.ctx.restore();
    this.ctx.save();
    callback();
  }
}
customElements.define("game-canvas", Canvas, { extends: "canvas" });
