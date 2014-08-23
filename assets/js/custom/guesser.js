define(['testcase'], function(testcase) {
	var upperBound, lowerBound;
	var remaining;
	var haveSuccessResponse;
	var guesser = {
		initWithTC: function(numTC) {
			upperBound = testcase.getNVariable(numTC);
			lowerBound = 1;
			remaining = testcase.getQVariable(numTC);
			haveSuccessResponse = false;
		},
		nextGuess: function() {
			var nextGuess = lowerBound + upperBound;
			if(nextGuess%2 == 0) {
				return nextGuess/2;
			} else {
				if(Math.random() >= 0.5) {
					return (nextGuess+1)/2;
				} else {
					return (nextGuess-1)/2;
				}
			}
		},
		input: function(input, str) {
			if(str == "less") {
				lowerBound = input+1;
			} else if(str == "greater") {
				upperBound = input-1;
			} else {
				lowerBound = upperBound = input;
				haveSuccessResponse = true;
			}
			remaining--;
		},
		isPlayerCheat: function() {
			if(upperBound < lowerBound) {
				return true;
			} else {
				return false;
			}
		},
		haveRemainingMove: function() {
			return (remaining > 0);
		},
		knowAnswer: function() {
			return (lowerBound == upperBound);
		},
		getUpperBound: function() {
			return upperBound;
		},
		getRemainingMove: function() {
			return remaining;
		},
		isHaveSuccessResponse: function() {
			return haveSuccessResponse;
		},
	};
	return guesser;
});