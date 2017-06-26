const express = require("express");
const User = require("../models/user");
const renderTemplate = require("../util/renderTemplate");
const requireLoggedIn = require("../middleware/requireLoggedIn");

const router = express.Router();
router.use(requireLoggedIn);

router.get("/", function(req, res) {
	renderTemplate(req, res, "My Documents", "docs", {
		username: req.user.get("username"),
		docs: [],
	});
});

router.get("/upload", function(req, res) {
	renderTemplate(req, res, "Upload a File", "upload");
});

/**
 * Place router.post("/upload") here! Refer to README's
 * instructions for what the route should do.
 */

router.get("/file/:fileId", function(req, res) {
	res.send(req.params.fileId);
});

module.exports = router;
