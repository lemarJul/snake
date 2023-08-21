export default function setUpControls(game) {
  document.onkeydown = (e) => {
    const key = e.code;
    let newDirection;
    switch (key) {
      case "ArrowLeft":
        newDirection = "left";
        break;
      case "ArrowUp":
        newDirection = "up";
        break;
      case "ArrowRight":
        newDirection = "right";
        break;
      case "ArrowDown":
        newDirection = "down";
        break;
      case "Space":
        game.launch();
        return;
      default:
        return;
    }
    game.snake.direction = newDirection;
  };

  return game;
}
