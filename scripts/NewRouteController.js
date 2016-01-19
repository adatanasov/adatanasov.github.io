var app = angular.module('NewRoute', []);

angular.module('NewRoute', []).controller('NewRouteController', function($scope, $q, $timeout) {
    $scope.courses = [ { 'stops' : [] } ];

    $scope.addCourse = function() {
        $scope.courses.push( { 'stops' : [] } );            
        $timeout(function() {
            $('.course-fields').last().find(".datetime-picker").kendoDateTimePicker({
                theme: "Metro"
            });
        }, 50);
    };

    $scope.addStop = function(index) {
        $scope.courses[index].stops.push({});
        $timeout(function() {
            var stops = document.getElementById('course-' + index).getElementsByClassName("autocomplete");
            var stop = new google.maps.places.Autocomplete(
                (stops[stops.length - 1]), {
                types: ['(cities)']
            });
            $('#course-' + index).find(".datetime-picker").last().kendoDateTimePicker({
                theme: "Metro"
            });
        }, 50);            
    };
});