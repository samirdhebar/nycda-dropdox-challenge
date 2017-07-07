const express = require("express");
const User = require("../models/user");
const File = require("../models/file");

const router = express.Router();

router.get("/test", function(req, res) {
	res.json("Hello!");
})

router.post("/signup", function(req, res) {
	User.signup(req).then(function(user) {
		res.json({ user: user });
	})
	.catch(function(err) {
		console.error("Encountered error during API signup", err);
		res.status(400);
		res.json({ error: "Invalid username or password" });
	});
});


router.post("/login", function(req, res) {
	// ******************** //
	// *** EDIT IN HERE *** //
	// ******************** //
	User.login(req).then(function(user) {
		res.json({ user: user });
	})
	.catch(function(err) {
		console.error("Encountered error during API login", err);
		res.status(400);
		res.json({ error: "Inavalid username or password" });
	});
});


router.delete("/doc/:fileId", function(req, res) {
	File.findById(req.params.fileId).then(function(file) {
		if (file) {
			file.destroy();
			res.json({ file: file });
		}
		else {
			res.status(404);
			res.json({ error: "Unable to find file with ID " + req.params.fileId });
		}
	})
	.catch(function(err) {
		res.status(500);
		res.json({ error: "Unable to delete file" });
	});
});

module.exports = router;
