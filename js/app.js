var container;

$(function() {
	container = document.createElement("div");
	container.className = "game-container";

	document.body.appendChild(container);

	game.init();
});