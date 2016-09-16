function GameUi() {

	self.onSpin;
	self.onIncreaseCurrentBet;
	self.onDecreaseCurrentBet;

	var coinsLabel;

	var ui = this;

    var multiplierLabel;

    var scoreLabel;

    var spinButton;

    const gameOver = GameOver();

	this.create = function() {
		createSpinButton();
		createScoreLabel();
        createGameLogo();
        createMultiplierLabel();

        gameOver.create();
	};

	function createScoreLabel() {
		scoreLabel = document.createElement("div");
        scoreLabel.className = "score-label";
        for (var i = 0; i < 7; i++) {
            var entry = document.createElement("div");
            entry.className = "entry";

            scoreLabel.appendChild(entry);
        }

        helper.addToStage(scoreLabel);
    };

    function createSpinButton() {
        spinButton = document.createElement("button");
        spinButton.className = "spin-button";
        spinButton.onclick = function() {
            ui.onSpin();
        };

        helper.addToStage(spinButton);
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
        });
    };

    this.toggleSpinButton = function() {
        spinButton.disabled = !spinButton.disabled;
    };

    this.toggleStop = function() {
        $(spinButton).toggleClass("spinning");
    };

    this.updateScoreLabel = function(previousScore, currentScore) {
        $({ s: previousScore }).animate({ s: currentScore }, {
            duration: 1000,
            step: function(now) {
                ui.updateScoreLabelValue(now.toFixed(0));
            }
        });
    };

    this.updateScoreLabelValue = function(amount) {
        const amountString = amount.toString().reverse();
        const entries = $(scoreLabel).find(".entry");

        for (var i = 0; i < entries.length; i++) {
            if (i < amountString.length) {
                entries[i].innerHTML = amountString[i];
            }
            else {
                entries[i].innerHTML = "0";
            }
        };
    }

    this.gameOver = function(restart, share) {
        gameOver.showGameOverScreen(restart, share);
    };

    return this;
};
