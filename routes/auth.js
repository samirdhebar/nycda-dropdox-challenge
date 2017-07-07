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
	User.signup(req).then(function() {
		res.redirect("/docs");
	})
	.catch(function(err) {
		res.status(400);
		renderTemplate(req, res, "Signup", "signup", {
			error: "Invalid username or password",
		});
	});
});


router.get("/login", function(req, res) {
	renderTemplate(req, res, "Login", "login");
});

router.post("/login", function(req, res) {
	User.login(req).then(function() {
		res.redirect("/docs");
	})
	.catch(function(err) {
		res.status(400);
		renderTemplate(req, res, "Login", "login", {
			error: err.message,
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
