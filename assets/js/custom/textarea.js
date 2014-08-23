define([], function() {

	var textarea = {
		reset: function() {
			$("#textarea").val("");
		},
		insertLeft: function(msg) {
			$("#textarea").val($("#textarea").val() + msg + "\n");
		},
		insertRight: function(msg) {
			var width = document.getElementById("textarea").cols-1;
			width = 70;
			var length = msg.length;
			for(var i=0 ; i<width-length ; i++) {
				$("#textarea").val($("#textarea").val() + " ");
			}
			$("#textarea").val($("#textarea").val() + msg + "\n");
		},
	};

	return textarea;
});