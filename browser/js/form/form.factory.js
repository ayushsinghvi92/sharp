app.factory('formFactory', function ($localStorage) {
	return {
		getDataPoints : function () {
			let data = $localStorage.data;
			let dataPoints = []
			for(let key in data[0]) {
				dataPoints.push(key)
			}
			return dataPoints
		}
	}
});