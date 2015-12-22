$('#login-form').on('submit', function () {
	var user = {
		"username": $('#username').val().toLowerCase(),
		"password": $('#password').val(),
		"grant_type": "password"
	};

	$.ajax({
		type: "POST",
		url: 'http://api.everlive.com/v1/NZCsBulPD19OCNSf/oauth/token',
		contentType: "application/json",
		data: JSON.stringify(user),
		success: function (data) {
			setCookie('MYSPEDITOR_AUTH', data.Result.access_token, 1);
			window.location.href = 'main.html'; 
		},
		error: function (error) {
			alert(error.responseJSON.message);
			/* alert(JSON.stringify(error)); */
		}
	});
	
	return false;
});

function setCookie(name, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
};