function Facebook() {
	var fb = this;

	this.init = function() {
		$.ajaxSetup({ cache: true });
		$.getScript('//connect.facebook.net/en_US/sdk.js', function(){
			FB.init({
				appId: '1782765781940954',
				version: 'v2.7' // or v2.1, v2.2, v2.3, ...
			});
		});
	};

	this.requestPostScore = function(score, callback) {

		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				// var uid = response.authResponse.userID;
				// var accessToken = response.authResponse.accessToken;

				postScore(score, callback);
			} 
			else {
				fb.login(function() {
					postScore(score, callback);
				});
			}
		});
	};

	function postScore(score) {
		var body = 'Hey! I just scored ' + score + ' points on PetSlot!';
		FB.api('/me/feed', 'post', {
		    message:body,
		    link:"http://nicolasjr.github.io/petslots",
		    picture:"http://nicolasjr.github.io/petslots/images/machine.png",
		    name: 'My PetSlot Score!',
		    description: 'Post PetSlot Score on Wall.'
		},function(data) {
		    // console.log(data);
		    callback();
		});
	}

	this.login = function(successCallback) {
		FB.login(function(response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me', function(response) {
					console.log('Good to see you, ' + response.name + '.');
				});

				successCallback();
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		}, {scope:"publish_actions"});
	};

	return this;
}
