function Slot(slotType, mask, reelId) {
	this.type = slotType;

	const spritePath = helper.getSlotTypeFileName(this.type);
	const spriteSize = backgroundHeight * 0.6333333;

 	this.create = function() {
 	    var baseTexture = PIXI.loader.resources[spritePath].texture;
	    var rectangle = new PIXI.Rectangle(0, reelId * (baseTexture.height / 3), baseTexture.width, baseTexture.height / 3);

		var texture = new PIXI.Texture(baseTexture, rectangle);

		this.sprite = new PIXI.Sprite(texture);
		this.sprite.width = spriteSize;
		this.sprite.height = spriteSize / 3;

		this.sprite.anchor.set(0,0);

		this.sprite.mask = mask;
	};

 	return this;
};
