function Game() {
	const totalReels = 3;
	var slotMachine = new SlotMachine(totalReels);

	var ui = new GameUi();

	var isSpinning = false;
	var canStop = false;

	var score = 0;
	var multiplier = 0;
	const points = 100;

	var previousTime = 0;

	this.init = function() {
		$.getJSON("json/images.json", function(json, text) {
			const images = [];
			$.each(json.images, function(i, img) {
				images.push(img);
			});

			PIXI.loader
			.add(images)
			.on('progress', onProgressCallback)
			.load(ready);
		});

		container.appendChild(renderer.view);
	};

	function onProgressCallback(progress) {
		// console.log(progress.progress);
	};

	function spin() {
		if (isSpinning && canStop) {
			slotMachine.stopSpin();
			return;
		}

		if (isSpinning)
			return;

		isSpinning = true;
		canStop = false;

		slotMachine.spin(spinResult);
		ui.toggleSpinButton();
	};

	function spinResult(win) {
		if (win) {
			multiplier++;
			var newScore = score + (multiplier * points);

			updateScore(newScore);
			ui.showMultiplierLabel(multiplier);
		}
		else if (score > 0){

			function concludeGameOver() {
				updateScore(0);
				multiplier = 0;
			};

			function shareScore() {
				facebook.requestPostScore(score);
			};

			ui.gameOver(concludeGameOver, shareScore);
			// facebook.requestPostScore(score);
		}
		
		isSpinning = false;
		ui.toggleStop();
		ui.toggleSpinButton();
    };

    function gameLoop(step) {
    	updateDeltaTime(step);

    	requestAnimationFrame(gameLoop);
    	slotMachine.update();
    	renderer.render(stage);
    };

    function ready() {
    	slotMachine.onAllowStop = onAllowStop;
    	slotMachine.onAllReelsStopped = onAllReelsStopped;
    	slotMachine.create();
    	ui.create();
    	ui.onSpin = spin;
    	updateScore(0);

		requestAnimationFrame(gameLoop);
    };

    function onAllowStop() {
        canStop = true;
        ui.toggleStop();
        ui.toggleSpinButton();
    };

    function onAllReelsStopped() {
    	ui.toggleSpinButton();
    };

    function updateScore(s) {
    	const previousScore = score;
        score = s;

        if (!score)
        	ui.updateScoreLabelValue(score)
        else
	        ui.updateScoreLabel(previousScore, s);
    };

    function updateDeltaTime(step) {
    	currentTime = step
    	deltaTime = (currentTime - previousTime) / 1000;
    	previousTime = currentTime;
    };
};

