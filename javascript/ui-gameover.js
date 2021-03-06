function GameOver() {

	var gameOverScreen;

	var restartGame;
	var shareResult;

	const parent = ".game-container";

	const fadeTime = 100;

	this.create = function() {
		gameOverScreen = document.createElement("div");
		gameOverScreen.className = "game-over";

		$(gameOverScreen).hide();

		var restartGameButton = document.createElement("button");
		restartGameButton.className = "btn-restar";
		restartGameButton.innerHTML = "RESTART";
		restartGameButton.onclick = onNewGameButtonPressed;

		var shareResultButton = document.createElement("button");
		shareResultButton.className = "btn-share";
		shareResultButton.innerHTML = "SHARE";
		shareResultButton.onclick = onShareResultButtonPressed;

		gameOverScreen.appendChild(shareResultButton);
		gameOverScreen.appendChild(restartGameButton);

		helper.addToParent(parent, gameOverScreen);
	};

	function onNewGameButtonPressed() {
		if (!restartGame)
			return;

		restartGame();
		restartGame = null;

		$(gameOverScreen).fadeOut(fadeTime);
	};

	function onShareResultButtonPressed() {
		if (shareResult)
			shareResult();
	};

	this.showGameOverScreen = function(restart, share) {
		restartGame = restart;
		shareResult = share;

		$(gameOverScreen).fadeIn(fadeTime);
	};

	return this;
}

