export default class Snake {
  constructor(direction, ...bodyParts) {
    this.bodyParts = bodyParts;
    this._direction = direction;
    this.ateApple = false;
  }

  advance() {
    const offsets = {
      up: [0, -1],
      right: [1, 0],
      down: [0, 1],
      left: [-1, 0],
    };

    const headPosition = this.bodyParts[0].slice(); // copy from head position
    const nextPositionOffset = offsets[this._direction];
    const newHeadPosition = headPosition.map(
      (axis, i) => axis + nextPositionOffset[i]
    );
    this.bodyParts.unshift(newHeadPosition);

    if (!this.ateApple) this.bodyParts.pop();
    else this.ateApple = false;
  }

  isColliding(widthInBlocks, heightInBlocks) {
    return (
      this._isCollidingWalls(widthInBlocks, heightInBlocks) ||
      this._isCollidingWithItself()
    );
  }
  _isCollidingWalls(widthInBlocks, heightInBlocks) {
    const [headX, headY] = this.bodyParts.at(0);

    const [minX, maxX] = [-1, widthInBlocks];
    const [minY, maxY] = [-1, heightInBlocks];
    const isCollidingX = [minX, maxX].includes(headX);
    const isCollidingY = [minY, maxY].includes(headY);

    return isCollidingX || isCollidingY;
  }

  _isCollidingWithItself() {
    const [head, ...headlessBody] = this.bodyParts;

    return headlessBody.some(
      (part) => part[0] === head[0] && part[1] === head[1]
    );
  }

  isEatingApple(apple) {
    const head = this.bodyParts[0];
    return (this.ateApple = head.every(
      (axisPos, i) => axisPos === apple.position[i]
    ));
  }

  set direction(direction) {
    if (this._canTurn(direction)) this._direction = direction;
  }

  get direction() {
    return this._direction;
  }

  _canTurn(direction) {
    const permissions = {
      up: ["left", "right"],
      right: ["up", "down"],
      down: ["left", "right"],
      left: ["up", "down"],
    };

    return permissions[this._direction].includes(direction);
  }
}
