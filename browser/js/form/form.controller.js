app.controller('formCtrl', function ($localStorage, formFactory, $scope, graphFactory, $state) {
	$scope.dataPoints = formFactory.getDataPoints();
	$scope.addGraph = function () {
		$('#myModalHorizontal').modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		$scope.requirements.data = $localStorage.data;
		graphFactory.addGraph($scope.requirements)
		$state.go($state.current, {}, {reload: true})
	}

});
