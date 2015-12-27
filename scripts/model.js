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
				alert(entity + ' successfully created!');
				alert(JSON.stringify(data));
				callback(data.Result);
			},
			error: function (error) {
				alert(error.responseJSON.message);
				alert(JSON.stringify(error));
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
				alert(entity + ' with id ' + id + ' successfully deleted!');
				alert(JSON.stringify(data));
				callback(data.Result);
			},
			error: function (error) {
				alert(error.responseJSON.message);
				alert(JSON.stringify(error));
			} 
		});
	};

	return model;
}());