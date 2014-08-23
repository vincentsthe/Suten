define(['testcase'], function(testcase) {
	var n1, n2;
	var remainingPass;
	var player;

	var game = {
		init: function() {
			n1 = 1;
			n2 = 2;
			player = testcase.getPlayerCount();
			remainingPass = testcase.getPassCount();
		},
		getPlayer: function() {
			return {
				left: n1,
				right: n2,
			};
		},
		haveRemainingPass: function() {
			return (remainingPass !== 0);
		},
		isGameFinish: function() {
			return ((n1 === player-1) && (n2 === player));
		},
		getMatchWinner: function() {
			hand1 = testcase.getPlayerHand(this.getPlayer().left);
			hand2 = testcase.getPlayerHand(this.getPlayer().right);

			if(((hand1 == 1)&&(hand2 == 0)) || ((hand1 == 2)&&(hand2 == 1)) || ((hand1 == 0)&&(hand2 == 2))) {
				return n1;
			} else if(((hand1 == 0)&&(hand2 == 1)) || ((hand1 == 1)&&(hand2 == 2)) || ((hand1 == 2)&&(hand2 == 0))) {
				return n2;
			} else {
				return 0;
			}
		},
		nextMatch: function() {
			n2++;
			if(n2>player) {
				n1++;
				n2 = n1 + 1;
			}
		},
		doPass: function() {
			remainingPass--;
		},
	};

	return game;
});