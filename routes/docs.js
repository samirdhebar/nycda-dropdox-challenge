const express = require("express");
const User = require("../models/user");
const File = require("../models/file");
const renderTemplate = require("../util/renderTemplate");
const requireLoggedIn = require("../middleware/requireLoggedIn");

const router = express.Router();
router.use(requireLoggedIn);

router.get("/", function(req, res) {
	req.user.getFiles().then(function(docs) {
		renderTemplate(req, res, "My Documents", "docs", {
			username: req.user.get("username"),
			docs: docs,
		});
	});
});

router.get("/upload", function(req, res) {
	renderTemplate(req, res, "Upload a File", "upload");
});

/**
 * Place router.post("/upload") here! Refer to README's
 * instructions for what the route should do. Refer to
 * models/file.js for what a file consists of.
 */

router.get("/file/:fileId", function(req, res) {
	File.findById(req.params.fileId).then(function(file) {
		if (file) {
			res.download("uploads/" + file.get("id"), file.get("originalName"));
		}
		else {
			res.status(404).send("No file found");
		}
	})
	.catch(function(err) {
		console.error(err);
		res.status(500).send("Something went wrong");
	});
});

module.exports = router;
