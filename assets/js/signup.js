/* globals $ */

$(document).ready(function() {
	var $signupForm = $("#signup-form");
	var $username = $signupForm.find("[name=username]");
	var $password = $signupForm.find("[name=password]");

	// Handle form login by POSTing to /api/signup
	$signupForm.on("submit", function(ev) {
		ev.preventDefault();
		var username = $username.val();
		var password = $password.val();

		if (!username) {
			return alert("Username is required!");
		}

		if (!password) {
			return alert("Password is required!");
		}

		$.ajax("/api/signup", {
			method: "POST",
			data: {
				username: username,
				password: password,
			},
			success: function() {
				window.location = "/docs";
			},
			error: function() {
				alert("Signup failed, please fix username or password");
			},
		});
	});
});
