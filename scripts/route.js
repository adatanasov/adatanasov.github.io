var ROUTE_ID, CLIENT_ID, TRANSPORTER_ID, MAP_ID, MAP_INFO;

$('document').ready(function(){
	ROUTE_ID = getParameterByName('routeId');	
	if (ROUTE_ID) {
		showRouteInfo();
	}    
    
    $(".datetime-picker").kendoDateTimePicker({
		theme: "Metro"
    });

    $('.save-route').on('click', function(){
        saveRoute(function(){});  
    });
    $('.save-close-route').on('click', function(){
        saveRoute(function(){
            window.location.href = 'main.html'; 
        });  
    });
});

function addAutocomplete() {
    var autocompleteInputs = document.getElementsByClassName('autocomplete');
    for (var i = 0; i < autocompleteInputs.length; i++) {
        new google.maps.places.Autocomplete(
            autocompleteInputs[i], {
                types: ['(cities)']
            });
    }
};

function showRouteInfo() {
    MODEL.GetAllRouteInfoById('Route', ROUTE_ID, function (data) {
        CLIENT_ID = data.ClientId;
        TRANSPORTER_ID = data.TransporterId;
        MAP_ID = data.MapId;
        setRouteInfo(data);
    });
};

function saveRoute(successfulCreate) {
    var routeInfo = getRouteInfo();
    //var mapInfo = getMapInfo();
	
	if (ROUTE_ID) {
        // if (CLIENT_ID) {
        //     MODEL.Update('Client', CLIENT_ID, routeInfo.Client, function(result){});
        // }        
        
        // if (TRANSPORTER_ID) {
        //     MODEL.Update('Transporter', TRANSPORTER_ID, routeInfo.Transporter, function(result){});
        // }        
        
        // if (MAP_ID) {
        //     MODEL.Update('Map', MAP_ID, mapInfo, function(result){});
        // }
                
        // MODEL.Update('Route', ROUTE_ID, routeInfo.Route, function(result){
        //     successfulCreate();
        // });
	} else {
		MODEL.Create('Client', routeInfo.Client, function(result){
            routeInfo.Route.ClientId = result.Id;        
            saveRouteSync(routeInfo, 0, successfulCreate);  
        });	
	}
};

function saveRouteSync(routeInfo, counter, successfulCreate) {
    var total = routeInfo.Courses.length;
    if (counter >= total) {
        return;
    }
    
    MODEL.Create('Transporter', routeInfo.Courses[counter].Transporter, function(result){
        routeInfo.Courses[counter].TransporterId = result.Id;	
        delete routeInfo.Courses[counter].Transporter;
        
        MODEL.Create('Course', routeInfo.Courses[counter], function(result){
            routeInfo.Route.CourseIds.push(result.Id);
            
            if (counter === total - 1) {
                MODEL.Create('Route', routeInfo.Route, function(result){
                    ROUTE_ID = result.Id;
                    successfulCreate();
                });
            } else {
                saveRouteSync(routeInfo, counter + 1, successfulCreate); 
            }
        });
    });
};

function getMapInfo() {
    var mapInfo = {};
    var startPlace = MAP_INFO.StartElement.getPlace();
    mapInfo.Start = { 'lat' : startPlace.geometry.location.lat(), 'lng' : startPlace.geometry.location.lng() };
    
    var endPlace = MAP_INFO.EndElement.getPlace();
    mapInfo.End = { 'lat' : endPlace.geometry.location.lat(), 'lng' : endPlace.geometry.location.lng() };
    
    mapInfo.Waypoints = [];  
    
    for(i=0; i < MAP_INFO.Waypoints.length; i++) {
        var currentPlace = MAP_INFO.Waypoints[i].getPlace();
        mapInfo.Waypoints.push({ 'lat' : currentPlace.geometry.location.lat(), 'lng' : currentPlace.geometry.location.lng() });  
    }
    
    return mapInfo;  
};

function getRouteInfo() {
	var routeInfo = { Route: { CourseIds: [] }, Client: {}, Courses: [] };
    
	routeInfo.Client.Order = $('#client-order').val();
	routeInfo.Client.Company = $('#client-company').val();
	routeInfo.Client.Contact = $('#client-contact').val();
	routeInfo.Client.Phone = $('#client-phone').val();
	routeInfo.Client.Email = $('#client-email').val();
    
    var allCourses = $('.course-fields');
    allCourses.each(function() {
        var Course = {};        
        Course.Start = $(this).find('.start-name').val();
        Course.StartDate = $(this).find('input.start-time').val();
        Course.End = $(this).find('.end-name').val();
        Course.EndDate = $(this).find('input.end-time').val();
        
        Course.Stops = [];
        $(this).find('.stop').each(function() {
            Course.Stops.push({ 'Name' : $(this).find('.stop-name').val(), 'Time' : $(this).find('input.stop-time').val()});
        });
        
        Course.Transporter = {};
        Course.Transporter.Company = $(this).find('.transporter-company').val();
        Course.Transporter.Contact = $(this).find('.transporter-contact').val();
        Course.Transporter.Phone = $(this).find('.transporter-phone').val();
        Course.Transporter.TruckType = $(this).find('.transporter-truck-type').val();
        Course.Transporter.TruckPlates = $(this).find('.transporter-truck-plates').val();
        Course.Transporter.DriverName = $(this).find('.transporter-driver-name').val();
        Course.Transporter.DriverPhone = $(this).find('.transporter-driver-phone').val();
        
        routeInfo.Courses.push(Course);
    });
	
	return routeInfo;
};

function setRouteInfo(routeInfo) {
	$('.start-name').val(routeInfo.Start);
	$('input.start-time').val(routeInfo.StartDate);
	$('.stop-name').val(routeInfo.Stop);
	$('input.stop-time').val(routeInfo.StopDate);
	$('.end-name').val(routeInfo.End);
	$('input.end-time').val(routeInfo.EndDate);
    
	$('.client-order').val(routeInfo.Client.Order);
	$('.client-company').val(routeInfo.Client.Company);
	$('.client-contact').val(routeInfo.Client.Contact);
	$('.client-phone').val(routeInfo.Client.Phone);
	$('.client-email').val(routeInfo.Client.Email);
    
	$('.transporter-company').val(routeInfo.Transporter.Company);
	$('.transporter-contact').val(routeInfo.Transporter.Contact);
	$('.transporter-phone').val(routeInfo.Transporter.Phone);
	$('.transporter-truck-type').val(routeInfo.Transporter.TruckType);
	$('.transporter-truck-plates').val(routeInfo.Transporter.TruckPlates);
	$('.transporter-driver-name').val(routeInfo.Transporter.DriverName);
	$('.transporter-driver-phone').val(routeInfo.Transporter.DriverPhone);
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};