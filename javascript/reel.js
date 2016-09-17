function Reel(totalSlots, colId, mask) {

	this.id = colId;
	
	var isSpinning = false;
	var moveLeft = this.id % 2 == 0;

	const slots = [];
	var positionX = 0;
	
	const deltaPosX = 300;
	const anchorPosX = -90 - deltaPosX;

	const deltaPosY = 380 / 3;
	const anchorPosY = 155 + (this.id * deltaPosY);

	var spinSpeed = 0;
	const maxSpinSpeed = 2000;

	const animationSpeed = 500;

	this.readyToStop;
	this.finishedSpin;

	const reel = this;

	this.create = function() {
		for(var i = 0; i < totalSlots; i++) {

			var slot = new Slot(Slots[i % Slots.length], mask, this.id);
			slot.create();
			slots.push(slot);
			
			helper.addToScene(slot.sprite);
		}

		positionSlotsInCol();
	};

	function positionSlotsInCol() {
		$.each(slots, function(i, slot) {
			slot.sprite.position.y = anchorPosY;
			slot.sprite.position.x = positionX + anchorPosX + (i * deltaPosX);
		});
	};

	this.spin = function() {
		if (!isSpinning)
			return;

		moveSlotsWithSpeed(spinSpeed);
	};

	this.startSpinning = function() {
		isSpinning = true;

		var reel = this;
		$({ speed: 0 }).animate({ speed: maxSpinSpeed }, {
			duration: animationSpeed,
			step: function(now) {
				spinSpeed = now;
			},
			complete: function() {
				if (reel.readyToStop != null)
					reel.readyToStop();
			}
		});
	};

	function moveSlotsWithSpeed(speed) {
		const delta = speed * deltaTime;

		$.each(slots, function(i, slot) {
			slot.sprite.position.x = moveLeft ? slot.sprite.position.x - delta : slot.sprite.position.x + delta;
		});

		positionX = moveLeft ? positionX - delta : positionX + delta;

		if (Math.abs(positionX) >= deltaPosX)
			resetColPosition();
	};

	function resetColPosition() {
	    var lastSlot;

	    if (moveLeft) {
			lastSlot = slots.first();
			slots.splice(0, 1);
			slots.push(lastSlot);
	    }
	    else {
		    lastSlot = slots.last();
			slots.pop();
			slots.splice(0, 0, lastSlot);
		}

		positionX = moveLeft ? positionX + deltaPosX : positionX - deltaPosX;
		lastSlot.sprite.position.x = moveLeft ? slots[slots.length - 2].sprite.position.x + deltaPosX : slots[1].sprite.position.x - deltaPosX;
	};

	this.endSpin = function() {
		isSpinning = false;

		var ss = spinSpeed;

		$({ speed: 0 }).animate({ speed: ss }, {
			duration: animationSpeed * 3,
			step: function(now) {
				moveSlotsWithSpeed(ss - now);
			},
			complete: function() { endSpinAnimation(); }
		});
	};

	function endSpinAnimation() {
		const halfWay = Math.abs(positionX) > deltaPosX / 2;

		const minPos = positionX;
		const maxPos = halfWay
                           ? positionX >= 0 ? deltaPosX : deltaPosX * -1
                           : 0;

		$({ x: minPos }).animate({ x: maxPos }, {
			duration: animationSpeed * 2,
			easing: "easeOutElastic",
			step: function(now) {
				positionX = Math.round(now);
				positionSlotsInCol();
			},
			complete: function() {
				if (halfWay)
					resetColPosition();

				if (reel.finishedSpin)
					reel.finishedSpin();
			}
		});
	};

	this.getResult = function() {
		return slots[2];
	};

	return this;
};

