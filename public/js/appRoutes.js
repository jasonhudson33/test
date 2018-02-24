angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/children', {
			templateUrl: 'views/children.html',
			controller: 'ChildrenController'
		})

		.when('/care-centers', {
			templateUrl: 'views/care-centers.html',
			controller: 'CareCentersController'	
		});

	$locationProvider.html5Mode(true);

}]);