function GameResult() {

	this.calculateResult = function(reels) {
		const baseSlot = reels[0].type;

		for (var i = 1; i < reels.length; i++)
			if (reels[i].type !== baseSlot) return false;

		return true;
	};
};

