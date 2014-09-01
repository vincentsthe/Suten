define(['guesser', 'storage', 'jquery', 'testcase', 'notifier', 'textarea', 'player', 'game', 'message'], 
	function(guesser, storage, $, testcase, notifier, textarea, player, game, message) {
	
	$(document).ready(function() {
		var done;
		var currentTC;
		var lock;
		var currentGuess;
		var remaining;

		var colorSubtask = function() {
			for(var i=1 ; i<=2 ; i++) {
				if(storage.isTrue(i)) {
					$("#tc-" + i).css("background-color", "#2ca02c");
				}
			}
		}

		var setSubtaskTrue = function(numTC) {
			storage.setTrue(numTC);
			colorSubtask();
		};

		var init = function(numTC) {
			currentTC = numTC;
			testcase.init(numTC);
			storage.init();
			colorSubtask();
			player.init();
			game.init();
			textarea.reset();
			textarea.insertLeft(testcase.getHeader());

			lock = false;
			done = false;

			$("#match").html("");

			textarea.insertLeft(testcase.getPlayerCount() + " " + testcase.getPassCount());

			$("#buttonDiv").css("visibility","hidden");

			$("#nextButton").click(function() {
				if((lock === false) && (done === false)) {				
					lock = true;
					var playerLeft = game.getPlayer().left;
					var playerRight = game.getPlayer().right;
					textarea.insertLeft(playerLeft + " " + playerRight);

					var answer = function(response) {
						if(lock === true) {
							if(response === "left-win") {
								textarea.insertRight(playerLeft + " MENANG");
								if(game.getMatchWinner() != playerLeft) {
									done = true;
									notifier.createAlert("You Lose! Your guess is wrong.");
								}
							} else if(response === "right-win") {
								textarea.insertRight(playerRight + " MENANG");
								if(game.getMatchWinner() != playerRight) {
									done = true;
									notifier.createAlert("You Lose! Your guess is wrong.");
								}
							} else if(response === "tie") {
								textarea.insertRight("SERI");
								if(game.getMatchWinner() != 0) {
									done = true;
									notifier.createAlert("You Lose! Your guess is wrong.");
								}
							} else {
								textarea.insertRight("PASS");
								game.doPass();
								if(game.getMatchWinner() === 0) {
									textarea.insertLeft("SERI");
									notifier.createAlert("Match Result: tie");
								} else {
									textarea.insertLeft(game.getMatchWinner() + " MENANG");
									notifier.createAlert("Match Result: " + game.getMatchWinner() + " WIN");
								}
								
							}

							player.resetPosition();
							$("#buttonDiv").animate({
								opacity: 0,
							});
							$("#left-win").unbind();
							$("#right-win").unbind();
							$("#tie").unbind();
							$("#pass").unbind();
							setTimeout(function() {
								$("#buttonDiv").css("visibility","hidden");
								lock = false;
								game.nextMatch();

								//sudah selesai
								if(game.isGameFinish() === true) {
									if(game.successPass()) {
										$("#match").html("<h1>You Win</h1>");
										setSubtaskTrue(currentTC);
										done = true;
									} else {
										$("#match").html("<h1>You Lose!</h1>You use pass button exceeding the amount allowed.");
										done = true;
									}
								}
							}, 750); 
						}
					};

					player.moveToMatch(playerLeft, playerRight);
					$("#buttonDiv").css("visibility","visible");
					$("#buttonDiv").css("opacity","0");
					$("#buttonDiv").animate({
						opacity: 1,
					});

					$("#left-win h2:first-child").text(playerLeft + " win");
					$("#right-win h2:first-child").text(playerRight + " win");

					$("#left-win").click(function() {
						answer("left-win");
					});
					$("#right-win").click(function() {
						answer("right-win");
					});
					$("#tie").click(function() {
						answer("tie");
					});
					$("#pass").click(function() {
						answer("pass");
					});
				}
			});
		};

		init(1);

		$("#reset").click(function() {
			init(currentTC);
		});

		$("#play").click(function() {
			init($("#testcase").val());
		});

		$("#help").click(function() {
			notifier.createText(message.help());
		});

		$("#about").click(function() {
			notifier.createText(message.about());
		});

		$("#source").click(function() {
			notifier.createSource(message.codeC(), message.codePas());
		});
	});

});