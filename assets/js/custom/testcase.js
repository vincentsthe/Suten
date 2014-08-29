define([], function() {
	var tc = [];
	var currentTC;
	var nPlayer = [0, 5, 8];
	var pass = [0, 6, 7];
	var header = ["", ".1......", "..2....7"];

	/**
		0 = kelingking,
		1 = telunjuk,
		2 = ibu jari,
	*/
	var suten = [
		[],
		[0, 1, 0, 1, 2, 2],
		[0, 2, 2, 0, 1, 1, 1, 2, 0]
	];

	var urutan = [
		[],
		[
			[1, 2],
			[1, 3],
			[1, 4],
			[1, 5],
			[2, 3],
			[2, 4],
			[2, 5],
			[3, 4],
			[3, 5],
			[4, 5]
		],
		[
			[6, 7],
			[3, 2],
			[6, 1],
			[7, 1],
			[1, 3],
			[7, 2],
			[7, 4],
			[3, 6],
			[4, 6],
			[7, 8],
			[8, 3],
			[1, 8],
			[4, 5],
			[5, 7],
			[2, 8],
			[2, 1],
			[5, 6],
			[4, 2],
			[6, 8],
			[5, 3],
			[4, 8],
			[2, 5],
			[4, 1],
			[5, 8],
			[3, 4],
			[3, 7],
			[5, 1],
			[6, 2]
		]
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
		getTurn: function(num) {
			return urutan[currentTC][num];
		},
		getHeader: function() {
			return header[currentTC];
		},
		getAnswer: function(num) {
			var ans = '';
			for(var i=0 ; i<urutan[num].length ; i++) {
				var n1 = suten[num][urutan[num][i][0]];
				var n2 = suten[num][urutan[num][i][1]];

				if(((n1==1)&&(n2==0)) || ((n1==2)&&(n2==1)) || ((n1==0)&&(n2==2))) {
					ans = ans + urutan[num][i][0] + " MENANG";
				} else if(((n2==1)&&(n1==0)) || ((n2==2)&&(n1==1)) || ((n2==0)&&(n1==2))) {
					ans = ans + urutan[num][i][1] + " MENANG";
				} else {
					ans = ans + "SERI";
				}

				ans = ans + "\\n"
			}

			return ans;
		},
	};

	return testcase;
});