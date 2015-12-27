var app = angular.module('Routes', []);

angular.module('Routes', []).controller('RoutesController', function($scope, $q, $timeout) {
    getRoutesForUser($q).then(function(data){
		$scope.routes = data;
		
		for(var i=0; i<$scope.routes.length; i++) {			
			$scope.routes[i].StartDate = Date.parse($scope.routes[i].StartDate);
			$scope.routes[i].EndDate = Date.parse($scope.routes[i].EndDate);
		}
        
        $timeout(loadRouteButtons, 300);
	});
});

function getRoutesForUser($q) {
	var deferred = $q.defer();
	
	$.ajax({
		type: "GET",
		url: 'http://api.everlive.com/v1/NZCsBulPD19OCNSf/Route',
		headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH')},
		contentType: "application/json",
		success: function (data) {
			var routes = data.Result;						
			deferred.resolve(routes);
		},
		error: function (error) {
			alert(error.responseJSON.message);
			alert(JSON.stringify(error));
			deferred.reject(error);
		} 
	});
	
	return deferred.promise;
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
			c = c.substring(1);
		}
        if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		} 
    }
    return "";
};