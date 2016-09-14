function GameResult() {

	this.calculateResult = function(reels) {

		var previousSlot = null;
		for (var i = 0; i < reels.length; i++) {
			if (previousSlot) {
				if (reels[i].type !== previousSlot) return false;
			}
			else {
				previousSlot = reels[i].type;
			}
		}

		return true;
	};

};
