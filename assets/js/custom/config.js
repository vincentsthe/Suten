require.config({
	paths: {
		'jquery': '../vendor/jquery',
		'bootstrap': '../vendor/bootstrap',
	},
	shim: {
		'jquery': {
			exports: '$',
		}
	}
});

require(['main']);