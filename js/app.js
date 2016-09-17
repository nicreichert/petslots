var container;
const helper = new Helper();
const game = new Game();
const facebook = new Facebook();
var deltaTime = 0;

$(function() {
	container = document.createElement("div");
	container.className = "game-container";

	document.body.appendChild(container);

	facebook.init();

	game.init();
});

