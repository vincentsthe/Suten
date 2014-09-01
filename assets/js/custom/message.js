define(['testcase', 'storage'], function(testcase, storage) {
	var message = {
		help: function() {

			var str = "<p>Scroll down to read help in English</p><br>=================================================<br><p>Bahasa Indonesia</p>=================================================<br><p>Klik pada tombol 'next' untuk melanjutkan pada pertandingan berikutnya. Untuk setiap pertandingan, anda harus menebak hasil pertanding atau <i>pass</i>. Bila anda salah menebak hasil pertandingan, makan anda akan kalah dalam game ini. Bila anda memilih <i>pass</i>, maka anda akan diberitahu hasil pertandingan tersebut. Bila anda sudah melewati semua pertandingan dan jumlah <i>pass</i> tidak melebihi yang diperbolehkan, maka anda akan menang. Namun jika melebihi, anda akan kalah dalam game ini.</p><br><p>Untuk mengganti subtask yang ingin dimainkan, pilih subtask yang ingin dimainkan pada menu dropdown subtask dan klik tombol 'play'. Untuk Mengulang game klik tombol 'reset'.</p><p>Indikator subtask mengindikasikan subtask mana yang telah anda selesaikan, indikator bewarna hijau berarti anda telah berhasil menyelesaikan subtask tersebut. Tekan tombol 'Download Source Code' untuk menghasilkan source code yang berisi kode untuk menyelesaikan subtask yang telah anda selesaikan (anda bisa mengumpulkan source code ini).</p>=================================================<br><p>English</p>=================================================<br><p>Click 'next' button to advance to the next match. For every match, you have to guess the result of the match or choose pass. If you incorrectly guess the result, you will lose the game. If you advance through all match and your pass count doesn't exceed the amount allowed, you will win the game. But if your pass count exceed the amount allowed, you will lose the game.</p><br><p>To change the subtask played, choose the subtask you want to play in subtask dropdown menu and click 'play'. To reset the game, click on 'reset' button</p><p>Subtask Indicator indicate which subtask you have solve, green indicator means you hage successfully solve that subtask. Press 'Download Source Code' to generate source code that will solve the subtask you have solved (you can submit this source code).</p>";

			return str;
		},
		about: function() {
			var str = "<p>This game is created for the visualisation purpose of Olimpiade Sains Nasional (OSN) 2014 purpose.</p>&#169; 2014 TOKI";

			return str;
		},
		codeC: function() {
			var ans1,ans2;

			if(storage.isTrue(1)) {
				ans1 = testcase.getAnswer(1);
			} else {
				ans1 = "You have not solve this subtask.";
			}

			if(storage.isTrue(2)) {
				ans2 = testcase.getAnswer(2);
			} else {
				ans2 = "You have not solve this subtask.";
			}

			var str = '<pre>#include &lt;cstdio&gt;\n#include &lt;cstring&gt;\n\nusing namespace std;\nchar subtask[100];\n\nint main() {\n\tscanf("%s", subtask);\n\tif(!strcmp(subtask, ".1......")) { printf("' + ans1 + '"); }\n\tif(!strcmp(subtask, "..2....7")) { printf("' + ans2 + '"); }\n\treturn 0;\n}</pre>';

			return str;
		},
		codePas: function() {
			var ans1,ans2;

			if(storage.isTrue(1)) {
				ans1 = testcase.getAnswer(1);
				ans1 = ans1.replace(/\\n/g, "'#10'");
			} else {
				ans1 = "You have not solve this subtask.";
			}

			if(storage.isTrue(2)) {
				ans2 = testcase.getAnswer(2);
				ans2 = ans2.replace(/\\n/g, "'#10'");
			} else {
				ans2 = "You have not solve this subtask.";
			}

			var str = '<pre>var\n\ts: string;\n\nbegin\n\treadln(s);\n\tif(s = \'.1....\') then\n\tbegin\n\t\t write(\'' + ans1 + '\');\n\tend else if(s = \'..2...\') then begin \n\t\twrite(\'' + ans2 + '\');\n\tend else begin\n\t\t{ General Solution }\n\tend;\nend.</pre>';

			return str;
		},
	};

	return message;
});