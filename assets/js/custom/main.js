define(['guesser', 'storage', 'jquery', 'testcase', 'notifier', 'textarea', 'player', 'game'], 
	function(guesser, storage, $, testcase, notifier, textarea, player, game) {
	
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
			player.init();
			game.init();
			textarea.reset();

			lock = false;
			done = false;

			textarea.insertLeft(testcase.getPlayerCount());

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
									notifier.createAlert("Anda Kalah! Tebakan anda salah.");
								}
							} else if(response === "right-win") {
								textarea.insertRight(playerRight + " MENANG");
								if(game.getMatchWinner() != playerRight) {
									done = true;
									notifier.createAlert("Anda Kalah! Tebakan anda salah.");
								}
							} else if(response === "tie") {
								textarea.insertRight("SERI");
								if(game.getMatchWinner() != 0) {
									done = true;
									notifier.createAlert("Anda Kalah! Tebakan anda salah.");
								}
							} else {
								textarea.insertRight("PASS");
								if(game.haveRemainingPass() === true) {
									if(game.getMatchWinner() === 0) {
										textarea.insertLeft("SERI");
										notifier.createAlert("Hasil Pertandingan: SERI");
									} else {
										textarea.insertLeft(game.getMatchWinner() + " MENANG");
										notifier.createAlert("Hasil Pertandingan: " + game.getMatchWinner() + " MENANG");
									}
								} else {
									done = true;
									notifier.createAlert("Anda Kalah! Jumlah PASS melebihi batas");
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

								//sudah selesai
								if(game.isGameFinish() === true) {
									notifier.createAlert("Anda Menang!");
									setSubtaskTrue(currentTC);
									done = true;
								}
								game.nextMatch();
							}, 750); 
						}
					};

					player.moveToMatch(playerLeft, playerRight);
					$("#buttonDiv").css("visibility","visible");
					$("#buttonDiv").css("opacity","0");
					$("#buttonDiv").animate({
						opacity: 1,
					});

					$("#left-win h2:first-child").text(playerLeft + " menang");
					$("#right-win h2:first-child").text(playerRight + " menang");

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
	});

});