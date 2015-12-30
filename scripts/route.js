var ROUTE_ID, CLIENT_ID, TRANSPORTER_ID;

$('document').ready(function(){
	ROUTE_ID = getParameterByName('routeId');
	$(".datetime-picker").kendoDateTimePicker({
		theme: "Metro"
    });
	
	if (ROUTE_ID) {
		showRouteInfo();
	}
});

function showRouteInfo() {
    MODEL.GetAllRouteInfoById('Route', ROUTE_ID, function (data) {
        CLIENT_ID = data.ClientId;
        TRANSPORTER_ID = data.TransporterId;
        setRouteInfo(data);
    });
};

function addAutocomplete() {
  var start = new google.maps.places.Autocomplete(
      (document.getElementById('start')), {
        types: ['(cities)']
      });
	  
  var stop = new google.maps.places.Autocomplete(
      (document.getElementById('stop')), {
        types: ['(cities)']
      });

  var end = new google.maps.places.Autocomplete(
      (document.getElementById('end')), {
        types: ['(cities)']
      });
};

$('.save-route').on('click', function () {
	var routeInfo = getRouteInfo();
	
	if (ROUTE_ID) {
        if (CLIENT_ID) {
            MODEL.Update('Client', CLIENT_ID, routeInfo.Client, function(result){});
        }        
        
        if (TRANSPORTER_ID) {
            MODEL.Update('Transporter', TRANSPORTER_ID, routeInfo.Transporter, function(result){});
        }
                
        MODEL.Update('Route', ROUTE_ID, routeInfo.Route, function(result){});
	} else {
		var clientId, transporterId;
		MODEL.Create('Client', routeInfo.Client, function(result){
			clientId = result.Id;
			MODEL.Create('Transporter', routeInfo.Transporter, function(result){
				transporterId = result.Id;				
                routeInfo.Route.ClientId = clientId;
                routeInfo.Route.TransporterId = transporterId;
                MODEL.Create('Route', routeInfo.Route, function(result){
                    ROUTE_ID = result.Id;
                    window.location.href = 'main.html';
                });
			});
		});
	}
});

function getRouteInfo() {
	var routeInfo = { Route: {}, Client: {}, Transporter: {} };
	
	routeInfo.Route.Start = $('#start').val();
	routeInfo.Route.StartDate = $('#start-time').val();
	routeInfo.Route.Stop = $('#stop').val();
	routeInfo.Route.StopDate = $('#stop-time').val();
	routeInfo.Route.End = $('#end').val();
	routeInfo.Route.EndDate = $('#end-time').val();	
    
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