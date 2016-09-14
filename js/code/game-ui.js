function GameUi() {

	self.onSpin;
	self.onIncreaseCurrentBet;
	self.onDecreaseCurrentBet;

	var betLabel;
	var coinsLabel;

	var ui = this;

    var multiplierLabel;

	this.create = function() {
		createSpinButton();
		createScoreLabel();
        createGameLogo();
        createMultiplierLabel();
	};

	function createScoreLabel() {
		coinsLabel = helper.parentCenter(createLabel({ x: 15, y: 20}));
		helper.addToScene(createSquare(80, 40, {x: backgroundWidth / 2 - 40, y: backgroundHeight - 55}, coinsLabel));
    };

    function createLabel(pos) {
    	const l = new PIXI.Text("", {font:"50px Arial", fill:"white"})
    	l.position = pos;
    	return l;
    };

    function createSquare(width, height, pos, child) {
    	const square = helper.createSquare(0, 0, width, height);
		square.position = pos;
        square.addChild(child);
        return square;
    };

    function createSpinButton() {
        const button = document.createElement("button");
        button.className = "spin-button";
        button.onclick = function() {
            ui.onSpin();
        };

        helper.addToStage(button);
    };

    function createGameLogo() {
        const div = document.createElement("div");
        div.className = "logo";

        helper.addToStage(div);
    };

    function createMultiplierLabel() {
        multiplierLabel = document.createElement("div");
        multiplierLabel.className = "multiplier";
        $(multiplierLabel).hide();

        helper.addToStage(multiplierLabel);
    };

    this.showMultiplierLabel = function(multiplier) {
        multiplierLabel.innerHTML = "<p>" + multiplier + "<span>x</span></p>";
        $(multiplierLabel).css("transform", "scale(0, 0)");
        $(multiplierLabel).show();

        $({ s: 0 }).animate({ s: 1 }, {
            duration: 1000,
            easing: "easeOutElastic",
            step: function(now) {
                $(multiplierLabel).css("transform", "scale(" + now + ", " + now + ")");
            },
            complete: function() {
                setTimeout(function() {
                    // $(multiplierLabel).toggle("scale");
                    hideMultiplierLabel();
                }, 1000);
            }
        });
    };

    function hideMultiplierLabel() {
        $({ s: 1 }).animate({ s: 0 }, {
            duration: 100,
            easing: "linear",
            step: function(now) {
                $(multiplierLabel).css("transform", "scale(" + now + ", " + now + ")");
            },
            complete: function() {
                $(multiplierLabel).hide();
            }
        })
    };

    this.updateScoreLabel = function(amount) {
    	coinsLabel.text = amount ? amount : "0";
    	return this;
    };

    return this;
};
