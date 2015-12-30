var app = angular.module('Routes', []);

angular.module('Routes', []).controller('RoutesController', function($scope, $q, $timeout) {
    getRoutesForUser($q).then(function(data){
		$scope.routes = data;
		
		for(var i=0; i<$scope.routes.length; i++) {			
			$scope.routes[i].StartDate = Date.parse($scope.routes[i].StartDate);
			$scope.routes[i].StopDate = Date.parse($scope.routes[i].StopDate);
			$scope.routes[i].EndDate = Date.parse($scope.routes[i].EndDate);
		}
        
        $timeout(loadRouteButtons, 300);
	});
});

function getRoutesForUser($q) {
	var deferred = $q.defer();
	
    MODEL.GetAllRouteInfoForUser('Route', function (data) {		
			deferred.resolve(data);
        }, function (error) {
                deferred.reject(error);
    });
	
	return deferred.promise;
};