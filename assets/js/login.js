/* globals $ */

$(document).ready(function() {
	var $loginForm = $("#login-form");
	var $username = $loginForm.find("[name=username]");
	var $password = $loginForm.find("[name=password]");

	// Handle form login by POSTing to /api/login
	$loginForm.on("submit", function(ev) {
		ev.preventDefault();
		var username = $username.val();
		var password = $password.val();

		if (!username) {
			return alert("Username is required!");
		}

		if (!password) {
			return alert("Password is required!");
		}

		$.ajax("/api/login", {
			method: "POST",
			data: {
				username: username,
				password: password,
			},
			success: function() {
				window.location = "/docs";
			},
			error: function() {
				alert("Login failed, please fix username or password");
			},
		});
	});
});
