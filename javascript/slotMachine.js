function SlotMachine(totalReels) {

	const reels = [];

	const totalSlotsInReel = 5;

	const backgroundImage = "images/machine.png";
	const intervalBetweenSpin = 300;

	const gameResult = new GameResult();

	var onSpinEnded;
	var isSpinning = false;

	var currentReelToStop = 0;

	this.onAllowStop;
	this.onAllReelsStopped;

	const slotMachine = this;

	this.create = function() {
		setup();
		const mask = createMask();
		createSlotsCol(mask);
		setEvents();
	};

	this.update = function() {
		$.each(reels, function(i, reel) {
			reel.spin();
		});
	};

	function setup() {
		var background = new PIXI.Sprite(PIXI.loader.resources[backgroundImage].texture);
		background.width = backgroundWidth;
		background.height = backgroundHeight;

		helper.addToScene(background);
	};

	function createMask() {
		var mask = helper.createRoundSquare(47, 0, backgroundWidth - (47.5 * 2), 430, 30);
		mask.position.y = 106;
		helper.addToScene(mask);
		return mask;
	};

	function createSlotsCol(mask) {
		for (var i = 0; i < totalReels; i++) {
			var col = new Reel(totalSlotsInReel, i, mask);
			col.create();
			reels.push(col);
		}
	};

	function setEvents() {
		reels.last().readyToStop = function() {
			if (slotMachine.onAllowStop)
                slotMachine.onAllowStop();
		};

		reels.last().finishedSpin = calculateGameResult;
	}

	this.spin = function(callback) {
		if (isSpinning)
			return;

		currentReelToStop = 0;

		onSpinEnded = callback;

		isSpinning = true;
		$.each(reels, function(i, reel) {
			startSpinning(reel, i);
		});
	};

	function startSpinning(reel, index) {
		setTimeout(function() {
			reel.startSpinning();
		}, index * intervalBetweenSpin);
	}

	this.stopSpin = function() {
		if (currentReelToStop == totalReels)
			return;

		stopReelSpin(reels[currentReelToStop++]);

		if (currentReelToStop == totalReels)
			this.onAllReelsStopped();
	}

	function stopReelSpin(reel) {
		reel.endSpin();
	};

	function calculateGameResult() {
		const resultReels = []
        $.each(reels, function(i, reel) {
            resultReels.push(reel.getResult());
        });

		isSpinning = false;

		onSpinEnded(gameResult.calculateResult(resultReels), resultReels);
	};

	return this;
};

