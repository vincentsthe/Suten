define(['testcase'], function(testcase) {
	var turn;
	var remainingPass;
	var player;

	var game = {
		init: function() {
			turn = 0;
			player = testcase.getPlayerCount();
			remainingPass = testcase.getPassCount();
		},
		getPlayer: function() {
			return {
				left: testcase.getTurn(turn)[0],
				right: testcase.getTurn(turn)[1],
			};
		},
		successPass: function() {
			return (remainingPass >= 0);
		},
		isGameFinish: function() {
			var count = testcase.getPlayerCount();
			return (turn == (count*(count-1))/2);
		},
		getMatchWinner: function() {
			hand1 = testcase.getPlayerHand(this.getPlayer().left);
			hand2 = testcase.getPlayerHand(this.getPlayer().right);

			if(((hand1 == 1)&&(hand2 == 0)) || ((hand1 == 2)&&(hand2 == 1)) || ((hand1 == 0)&&(hand2 == 2))) {
				return this.getPlayer().left;
			} else if(((hand1 == 0)&&(hand2 == 1)) || ((hand1 == 1)&&(hand2 == 2)) || ((hand1 == 2)&&(hand2 == 0))) {
				return this.getPlayer().right;
			} else {
				return 0;
			}
		},
		nextMatch: function() {
			turn++;
		},
		doPass: function() {
			remainingPass--;
		},
	};

	return game;
});