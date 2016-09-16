var container;
const helper = new Helper();
const game = new Game();
const facebook = new Facebook();

$(function() {
	container = document.createElement("div");
	container.className = "game-container";

	document.body.appendChild(container);

	facebook.init();

	game.init();
});

