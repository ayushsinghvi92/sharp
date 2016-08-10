app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeController',
        resolve: {
         data : function ($http, homeFactory) {
            let source = homeFactory.getSource();
             return $http.get(source)
             .then(res => res.data)
            }
        }
    });
});