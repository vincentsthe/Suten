define([], function() {
	var tc = [];
	var currentTC;
	var nPlayer = [0, 5, 8];
	var pass = [0, 2, 5];

	/**
		0 = kelingking,
		1 = telunjuk,
		2 = ibu jari,
	*/
	var suten = [
		[],
		[0, 1, 0, 2, 0, 1],
		[0, 1, 0, 0, 1, 1, 2, 1, 0]
	];

	var testcase = {
		init: function(numTC) {
			currentTC = numTC;
		},
		getPlayerCount: function() {
			return nPlayer[currentTC];
		},
		getPassCount: function() {
			return pass[currentTC];
		},
		getPlayerHand: function(num) {
			return suten[currentTC][num];
		},
	};

	return testcase;
});