app.factory('homeFactory', function ($http) {
	let source;
	return {
		setSource : function (sourceInput) {
			source = sourceInput;
		},
		getSource : function () {
			let x = source || '/data.json';
			console.log(x)
			return x
		}

	}
});