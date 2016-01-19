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
    var mapInfo = getMapInfo();
	
	if (ROUTE_ID) {
        if (CLIENT_ID) {
            MODEL.Update('Client', CLIENT_ID, routeInfo.Client, function(result){});
        }        
        
        if (TRANSPORTER_ID) {
            MODEL.Update('Transporter', TRANSPORTER_ID, routeInfo.Transporter, function(result){});
        }        
        
        if (MAP_ID) {
            MODEL.Update('Map', MAP_ID, mapInfo, function(result){});
        }
                
        MODEL.Update('Route', ROUTE_ID, routeInfo.Route, function(result){
            successfulCreate();
        });
	} else {
		MODEL.Create('Client', routeInfo.Client, function(result){
			routeInfo.Route.ClientId = result.Id;
			MODEL.Create('Transporter', routeInfo.Transporter, function(result){
				routeInfo.Route.TransporterId = result.Id;	
                MODEL.Create('Map', mapInfo, function(result){
                    routeInfo.Route.MapId = result.Id;					
                    MODEL.Create('Route', routeInfo.Route, function(result){
                        ROUTE_ID = result.Id;
                        successfulCreate();
                    });
                });
			});
		});
	}
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
	var routeInfo = { Route: {}, Client: {}, Transporter: {} };
	
	routeInfo.Route.Start = $('#start').val();
	routeInfo.Route.StartDate = $('#start-time').val();
	routeInfo.Route.End = $('#end').val();
	routeInfo.Route.EndDate = $('#end-time').val();	
	routeInfo.Route.Stops = [];
	$('.stop').each(function() {
        routeInfo.Route.Stops.push({ 'Name' : $(this).val(), 'Time' : $(this).parent().find('.stop-time').val()});
    });
    
	routeInfo.Client.Order = $('#client-order').val();
	routeInfo.Client.Company = $('#client-company').val();
	routeInfo.Client.Contact = $('#client-contact').val();
	routeInfo.Client.Phone = $('#client-phone').val();
	routeInfo.Client.Email = $('#client-email').val();
    
	routeInfo.Transporter.Company = $('#transporter-company').val();
	routeInfo.Transporter.Contact = $('#transporter-contact').val();
	routeInfo.Transporter.Phone = $('#transporter-phone').val();
	routeInfo.Transporter.TruckType = $('#transporter-truck-type').val();
	routeInfo.Transporter.TruckPlates = $('#transporter-truck-plates').val();
	routeInfo.Transporter.DriverName = $('#transporter-driver-name').val();
	routeInfo.Transporter.DriverPhone = $('#transporter-driver-phone').val();
	
	return routeInfo;
};

function setRouteInfo(routeInfo) {
	$('#start').val(routeInfo.Start);
	$('#start-time').val(routeInfo.StartDate);
	$('#stop').val(routeInfo.Stop);
	$('#stop-time').val(routeInfo.StopDate);
	$('#end').val(routeInfo.End);
	$('#end-time').val(routeInfo.EndDate);
    
	$('#client-order').val(routeInfo.Client.Order);
	$('#client-company').val(routeInfo.Client.Company);
	$('#client-contact').val(routeInfo.Client.Contact);
	$('#client-phone').val(routeInfo.Client.Phone);
	$('#client-email').val(routeInfo.Client.Email);
    
	$('#transporter-company').val(routeInfo.Transporter.Company);
	$('#transporter-contact').val(routeInfo.Transporter.Contact);
	$('#transporter-phone').val(routeInfo.Transporter.Phone);
	$('#transporter-truck-type').val(routeInfo.Transporter.TruckType);
	$('#transporter-truck-plates').val(routeInfo.Transporter.TruckPlates);
	$('#transporter-driver-name').val(routeInfo.Transporter.DriverName);
	$('#transporter-driver-phone').val(routeInfo.Transporter.DriverPhone);
};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};