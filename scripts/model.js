var MODEL = (function () {
	var model = {};
	var API_KEY = 'NZCsBulPD19OCNSf';
	
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
	
	model.Create = function(entity, data, callback) {
		$.ajax({
			type: "POST",
			url: 'http://api.everlive.com/v1/'+ API_KEY + '/' + entity,
			headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH') },
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function (data) {
				console.log(entity + ' successfully created!');
				callback(data.Result);
			},
			error: function (error) {
				console.log(error);
			} 
		});
	};
    
    model.GetById = function(entity, id, callback) {
        $.ajax({
            type: "GET",
            url: 'http://api.everlive.com/v1/'+ API_KEY + '/' + entity + '/' + id,
            headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH')},
            contentType: "application/json",
            success: function (data) {
                console.log(entity + ' successfully read!');
				callback(data.Result);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    
    model.GetAllRouteInfoById = function(entity, id, callback, errorCallback) {
        $.ajax({
            type: "GET",
            url: 'http://api.everlive.com/v1/'+ API_KEY + '/' + entity + '/' + id,
            headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH'),
                        "X-Everlive-Expand": "{ \"ClientId\": {\"TargetTypeName\" : \"Client\", \"ReturnAs\" : \"Client\"}, \"TransporterId\": {\"TargetTypeName\" : \"Transporter\", \"ReturnAs\" : \"Transporter\"} }" },
            contentType: "application/json",
            success: function (data) {		
                console.log(entity + ' successfully read!');			
                callback(data.Result);
            },
            error: function (error) {
                console.log(error);
                errorCallback(error);
            } 
        });
    };
    
    model.GetAllForUser = function(entity, callback, errorCallback) {
        $.ajax({
            type: "GET",
            url: 'http://api.everlive.com/v1/'+ API_KEY + '/' + entity,
            headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH')},
            contentType: "application/json",
            success: function (data) {		
                console.log(entity + ' successfully read!');			
                callback(data.Result);
            },
            error: function (error) {
                console.log(error);
                errorCallback(error);
            } 
        });
    };
    
    model.GetAllRouteInfoForUser = function(entity, callback, errorCallback) {
        $.ajax({
            type: "GET",
            url: 'http://api.everlive.com/v1/'+ API_KEY + '/' + entity,
            headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH'),
                        "X-Everlive-Expand": "{ \"ClientId\": {\"TargetTypeName\" : \"Client\", \"ReturnAs\" : \"Client\"}, \"TransporterId\": {\"TargetTypeName\" : \"Transporter\", \"ReturnAs\" : \"Transporter\"} }" },
            contentType: "application/json",
            success: function (data) {		
                console.log(entity + ' successfully read!');			
                callback(data.Result);
            },
            error: function (error) {
                console.log(error);
                errorCallback(error);
            } 
        });
    };
    
    model.Update = function(entity, id, newData, callback) {
        $.ajax({
			type: "PUT",
			url: 'http://api.everlive.com/v1/'+ API_KEY + '/' + entity + '/' + id,
			headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH') },
			contentType: "application/json",
			data: JSON.stringify(newData),
			success: function (data) {
				console.log(entity + ' successfully updated!');
				callback(data.Result);
			},
			error: function (error) {
				console.log(error);
			} 
		});
    };
    
    model.Delete = function(entity, id, callback) {
		$.ajax({
			type: "DELETE",
			url: 'http://api.everlive.com/v1/'+ API_KEY + '/' + entity + '/' + id,
			headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH') },
			contentType: "application/json",
			success: function (data) {
				console.log(entity + ' with id ' + id + ' successfully deleted!');
				callback(data.Result);
			},
			error: function (error) {
				console.log(error);
			} 
		});
	};

	return model;
}());