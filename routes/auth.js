const express = require("express");
const User = require("../models/user");
const renderTemplate = require("../util/renderTemplate");
const requireLoggedOut = require("../middleware/requireLoggedOut");

const router = express.Router();
router.use(requireLoggedOut);

router.get("/signup", function(req, res) {
	renderTemplate(req, res, "Signup", "signup");
});

router.post("/signup", function(req, res) {
	User.create({
		username: req.body.username,
		password: req.body.password,
	})
	.then(function(user) {
		req.session.userid = user.id;
		res.redirect("/docs");
	})
	.catch(function(err) {
		renderTemplate(req, res, "Signup", "signup", {
			error: "Invalid username or password",
		});
	});
});


router.get("/login", function(req, res) {
	renderTemplate(req, res, "Login", "login");
});

router.post("/login", function(req, res) {
	User.findOne({
		where: {
			username: req.body.username,
		},
	})
	.then(function(user) {
		if (user) {
			user.comparePassword(req.body.password).then(function(valid) {
				if (valid) {
					req.session.userid = user.get("id");
					res.redirect("/docs");
				}
				else {
					renderTemplate(req, res, "Login", "login", {
						error: "Incorrect password",
					});
				}
			});
		}
		else {
			renderTemplate(req, res, "Login", "login", {
				error: "Username not found",
			});
		}
	})
	.catch(function(err) {
		console.log(err);
		renderTemplate(req, res, "Login", "login", {
			error: "The database exploded, please try again",
		});
	});
});

router.get("/logout", function(req, res) {
	req.session.userid = null;
	req.user = null;

	console.log(req.session);
	res.redirect("/");
});

module.exports = router;
