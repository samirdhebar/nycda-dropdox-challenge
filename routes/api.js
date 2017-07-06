const express = require("express");
const User = require("../models/user");
const File = require("../models/file");

const router = express.Router();

router.post("/signup", function(req, res) {
	// ******************** //
	// *** EDIT IN HERE *** //
	// ******************** //
	res.status(500);
	res.json({ implemented: false });
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
