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

    function setCookie(name, value, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires;
    };
    
    model.Login = function(user) {
        $.ajax({
            type: "POST",
            url: 'http://api.everlive.com/v1/' + API_KEY + '/oauth/token',
            contentType: "application/json",
            data: JSON.stringify(user),
            success: function (data) {
                setCookie('MYSPEDITOR_AUTH', data.Result.access_token, 1);
                window.location.href = 'main.html'; 
            },
            error: function (error) {
                console.log(error);
            }
        });
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
        var expand = {
            "ClientId" : {
                "TargetTypeName" : "Client", 
                "ReturnAs" : "Client"
            },
            "TransporterId" : {
                "TargetTypeName" : "Transporter", 
                "ReturnAs" : "Transporter" 
            }
        };
        
        $.ajax({
            type: "GET",
            url: 'http://api.everlive.com/v1/'+ API_KEY + '/' + entity + '/' + id,
            headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH'),
                        "X-Everlive-Expand" : JSON.stringify(expand) },
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
        var expand = {
            "ClientId" : {
                "TargetTypeName" : "Client", 
                "ReturnAs" : "Client"
            },
            "TransporterId" : {
                "TargetTypeName" : "Transporter", 
                "ReturnAs" : "Transporter" 
            }
        };
        
        $.ajax({
            type: "GET",
            url: 'http://api.everlive.com/v1/'+ API_KEY + '/' + entity,
            headers: { "Authorization" : "Bearer " + getCookie('MYSPEDITOR_AUTH'),
                        "X-Everlive-Expand" : JSON.stringify(expand) },
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