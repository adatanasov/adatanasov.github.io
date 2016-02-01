var app = angular.module('NewRoute', []);

angular.module('NewRoute', []).controller('NewRouteController', function($scope, $q, $timeout) {
    $scope.courses = [ { 'stops' : [] } ];

    $scope.addCourse = function() {
        $scope.courses.push( { 'stops' : [] } );            
        $timeout(function() {
            $('.course-fields').last().find(".datetime-picker").kendoDateTimePicker({
                theme: "Metro"
            });
            
            var courses = document.getElementsByClassName("course-fields");
            var lastCourse = courses[courses.length - 1];
            var autos = lastCourse.getElementsByClassName('autocomplete');
            for(i=0; i < autos.length; i++) {
                var autocomplete = new google.maps.places.Autocomplete(
                    (autos[i]), {
                    types: ['(cities)']
                });
            }
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