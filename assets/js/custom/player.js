define(['testcase', 'jquery'], function(testcase, $) {
	var getXCoordinate = function(num) {
		return $("#player").position().left + 20 + ((parseInt($("#player").width())/4) * ((num-1)%4));
	};
	var getYCoordinate = function(num) {
		return $("#player").position().top + Math.floor((num-1) / 4)*120;
	};

	var leftMatchCoordinate = $("#match").position().left + 150;
	var rightMatchCoordinate = $("#match").position().left + 480;
	var yMatchCoordinate = $("#match").position().top;

	var player = {
		init: function() {
			$("#player").empty();

			for(var i=1 ; i<=testcase.getPlayerCount() ; i++) {
				var div = document.createElement("div");
				div.setAttribute("id", "player-" + i);
				div.setAttribute("class", "player-box");
				document.getElementById("player").appendChild(div);

				var span = document.createElement("span");
				span.setAttribute("class", "fa-stack fa-5x");
				div.appendChild(span);

				var icon = document.createElement("i");
				icon.setAttribute("class", "fa fa-user fa-stack-2x");
				span.appendChild(icon);

				var text = document.createElement("strong");
				text.setAttribute("class", "fa-stack-1x player-number");
				text.innerHTML = i + "";
				span.appendChild(text);

				div.style.left = getXCoordinate(i) + "px";
				div.style.top = getYCoordinate(i) + "px";
			}
		},
		moveToMatch: function(n1, n2) {
			$("#player-" + n1).animate({
				left: leftMatchCoordinate,
				top: yMatchCoordinate,
			});

			$("#player-" + n2).animate({
				left: rightMatchCoordinate,
				top: yMatchCoordinate,
			});
		},
		resetPosition: function() {
			var move = function(x) {
				$("#player-" + x).animate({
					left: getXCoordinate(x),
					top: getYCoordinate(x),
				});
			};

			for(var i=1 ; i<=testcase.getPlayerCount() ; i++) {
				move(i);
			}
		},
	};

	return player;
});