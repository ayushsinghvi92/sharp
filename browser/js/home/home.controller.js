app.controller('homeController', function($scope, homeFactory, $localStorage, graphFactory, data, $state) {
    $localStorage.data = data;
    $scope.local
    $scope.graphs = graphFactory.getGraphs();
    if($localStorage.graphs) graphFactory.makeGraphs();

    $scope.changeSource = function () {
    	console.log($scope.source)
    	homeFactory.setSource($scope.source.address)
    	$state.go($state.current, {}, {reload:true})
    }
});