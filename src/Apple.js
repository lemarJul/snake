export default class Apple {
  constructor(position = [10, 10]) {
    this.position = position;
  }

  generateNewPosition(widthInBlocks, heightInBlocks) {
    const newX = Math.round(Math.random() * (widthInBlocks - 1));
    const newY = Math.round(Math.random() * (heightInBlocks - 1));
    return (this.position = [newX, newY]);
  }

  isOnSnake(snakeBody) {
    return snakeBody.some(
      (part) => part[0] === this.position[0] && part[1] === this.position[1]
    );
  }
}
