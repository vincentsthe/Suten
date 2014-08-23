 define([], function() {
	var storage = {
		init: function() {
			if(!(localStorage.subtasksu1)) {
				localStorage.subtasksu1 = "false";
			};
			if(!(localStorage.subtasksu2)) {
				localStorage.subtasksu2 = "false";
			};
		},
		setTrue: function(n) {
			if(n === 1) {
				localStorage.subtasksu1 = "true";
			} else if(n === 2) {
				localStorage.subtasksu2 = "true";
			}
		},
		isTrue: function(n) {
			if(n == 1) {
				return (localStorage.subtasksu1 === "true");
			} else if(n == 2) {
				return (localStorage.subtasksu2 === "true");
			}
		}
	};
	return storage;
});