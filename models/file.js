const Sequelize = require("sequelize");
const fs = require("fs");
const sql = require("../util/sql");

const File = sql.define("file", {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	size: {
		type: Sequelize.INTEGER,
		notNull: true,
	},
	originalName: {
		type: Sequelize.STRING,
		notNull: true,
	},
	mimeType: {
		type: Sequelize.STRING,
		notNull: true,
	},
});

File.prototype.getThumbnailSrc = function() {
	// Check if I have a thumbnail available in assets/thumbnails!
	// Otherwise return this default icon
	const filePath = "/thumbnails/" + this.get("id") + ".jpg";
	if (fs.existsSync("assets" + filePath)) {
		return filePath;
	}
	else {
		return "/icons/file.svg";
	}
};

File.prototype.getPreviewSrc = function() {
	// Check if I have a preview available in assets/previews!
	// Otherwise return null, to display a "no preview" message
	const filePath = "/previews/" + this.get("id") + ".jpg";
	if (fs.existsSync("assets" + filePath)) {
		return filePath;
	}

	return null;
};

module.exports = File;
