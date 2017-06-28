const express = require("express");
const multer = require("multer");

const User = require("../models/user");
const File = require("../models/file");
const renderTemplate = require("../util/renderTemplate");
const requireLoggedIn = require("../middleware/requireLoggedIn");

const uploader = multer({ dest: "uploads/" });
const router = express.Router();
router.use(requireLoggedIn);

router.get("/", function(req, res) {
	let message = "";

	if (req.query.success) {
		message = "File uploaded succesfully!";
	}

	req.user.getFiles().then(function(docs) {
		renderTemplate(req, res, "My Documents", "docs", {
			username: req.user.get("username"),
			docs: docs,
			message: message,
		});
	});
});

router.get("/upload", function(req, res) {
	renderTemplate(req, res, "Upload a File", "upload");
});

router.post("/upload", uploader.single("file"), function(req, res) {
	// Make sure they sent a file
	if (!req.file) {
		return renderTemplate(req, res, "Upload a File", "upload", {
			error: "You must choose a file to upload",
		});
	}

	// Otherwise, try an upload
	req.user.upload(req.file).then(function() {
		res.redirect("/docs?success=1")
	})
	.catch(function(err) {
		console.error("Something went wrong with upload", err);
		renderTemplate(req, res, "Upload a File", "upload", {
			error: "Something went wrong, please try a different file",
		});
	});
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
