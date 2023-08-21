import Game from "./Game.js";
import setControls from "./controls.js";

window.onload = () => {
  let myGame = setControls(new Game());

  document.getElementById("snake-game").appendChild(myGame.canvas);
};
