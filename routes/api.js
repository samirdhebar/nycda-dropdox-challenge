const express = require("express");
const User = require("../models/user");
const File = require("../models/file");

const router = express.Router();

router.post("/signup", function(req, res) {
	User.signup(req).then(function(user) {
		res.json({ user: user });
	})
	.catch(function(err) {
		res.status(400);
		res.json({ error: "Invalid username or password" });
	});
});


router.post("/login", function(req, res) {
	// ******************** //
	// *** EDIT IN HERE *** //
	// ******************** //
	res.status(500);
	res.json({ implemented: false });
});


router.delete("/doc/:fileId", function(req, res) {
	// ******************** //
	// *** EDIT IN HERE *** //
	// ******************** //
	res.status(500);
	res.json({ implemented: false });
});

module.exports = router;
