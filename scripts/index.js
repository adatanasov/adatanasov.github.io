$('#login-form').on('submit', function () {
	var user = {
		"username": $('#username').val().toLowerCase(),
		"password": $('#password').val(),
		"grant_type": "password"
	};

	MODEL.Login(user);
	
	return false;
});