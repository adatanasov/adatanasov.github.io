var ROUTE_ID;

$('document').ready(function(){
	ROUTE_ID = getParameterByName('routeId');
	$(".datetime-picker").kendoDateTimePicker({
		theme: "Metro",
		// value:new Date()
    });
	
	if (ROUTE_ID) {
		showRouteInfo();
	}
});

function showRouteInfo() {
	$.ajax({
		type: "GET",
		url: 'http://api.everlive.com/v1/NZCsBulPD19OCNSf/Route/' + ROUTE_ID,
		headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH')},
		contentType: "application/json",
		success: function (data) {
			setRouteInfo(data.Result);
		},
		error: function (error) {
			alert(error.responseJSON.message);
			alert(JSON.stringify(error));
		}
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
	
	if (ROUTE_ID != '') {
		// update the route
		$.ajax({
			type: "PUT",
			url: 'http://api.everlive.com/v1/NZCsBulPD19OCNSf/Route/' + ROUTE_ID,
			headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH') },
			contentType: "application/json",
			data: JSON.stringify(routeInfo),
			success: function (data) {
				alert('Route successfully updated!');
				alert(JSON.stringify(data));
			},
			error: function (error) {
				alert(error.responseJSON.message);
				alert(JSON.stringify(error));
			} 
		});
	} else {
		// create the route 
/* 		$.ajax({
			type: "POST",
			url: 'http://api.everlive.com/v1/NZCsBulPD19OCNSf/Route',
			headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH') },
			contentType: "application/json",
			data: JSON.stringify(routeInfo),
			success: function (data) {
				alert('Route successfully created!');
				alert(JSON.stringify(data));
				ROUTE_ID = data.Result.Id;
			},
			error: function (error) {
				alert(error.responseJSON.message);
				alert(JSON.stringify(error));
			} 
		}); */
		var clientId, transporterId, driverId
		MODEL.Create('Client', routeInfo.Client, function(result){
			clientId = result.Id;
			MODEL.Create('Client', routeInfo.Transporter, function(result){
				transporterId = result.Id;
				MODEL.Create('Driver', routeInfo.Driver, function(result){
					driverId = result.Id;
					routeInfo.Client = clientId;
					routeInfo.Transporter = transporterId;
					routeInfo.Driver = driverId;
					MODEL.Create('Route', routeInfo, function(result){
						ROUTE_ID = result.Id;
					});
				});
			});
		});
	}
});

function getRouteInfo() {
	var routeInfo = { ClientInfo: {}, TransporterInfo: {}, DriverInfo: {} };
	
	routeInfo.Start = $('#start').val();
	routeInfo.StartDate = $('#start-time').val();
	routeInfo.Stop = $('#stop').val();
	routeInfo.StopDate = $('#stop-time').val();
	routeInfo.End = $('#end').val();
	routeInfo.EndDate = $('#end-time').val();	
	routeInfo.ClientInfo.CompanyName = $('#client-company').val();
	routeInfo.ClientInfo.ContactName = $('#client-contact').val();
	routeInfo.ClientInfo.Phone = $('#client-phone').val();
	routeInfo.ClientInfo.Email = $('#client-email').val();
	routeInfo.TransporterInfo.CompanyName = $('#transporter-company').val();
	routeInfo.TransporterInfo.ContactName = $('#transporter-contact').val();
	routeInfo.TransporterInfo.Phone = $('#transporter-phone').val();
	routeInfo.TransporterInfo.Email = $('#transporter-email').val();
	routeInfo.DriverInfo.Name = $('#driver-name').val();
	routeInfo.DriverInfo.Phone = $('#driver-phone').val();
	routeInfo.DriverInfo.Truck = $('#driver-truck').val();
	
	return routeInfo;
};

function setRouteInfo(routeInfo) {
	$('#start').val(routeInfo.Start);
	$('#start-time').val(routeInfo.StartDate);
	$('#stop').val(routeInfo.Stop);
	$('#stop-time').val(routeInfo.StopDate);
	$('#end').val(routeInfo.End);
	$('#end-time').val(routeInfo.EndDate);
	$('#client-company').val(routeInfo.Client.CompanyName);
	$('#client-contact').val(routeInfo.Client.ContactName);
	$('#client-phone').val(routeInfo.Client.Phone);
	$('#client-email').val(routeInfo.Client.Email);
	$('#transporter-company').val(routeInfo.Transporter.CompanyName);
	$('#transporter-contact').val(routeInfo.Transporter.ContactName);
	$('#transporter-phone').val(routeInfo.Transporter.Phone);
	$('#transporter-email').val(routeInfo.Transporter.Email);
	$('#driver-name').val(routeInfo.Driver.Name);
	$('#driver-phone').val(routeInfo.Driver.Phone);
	$('#driver-truck').val(routeInfo.Driver.Truck);
}

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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};