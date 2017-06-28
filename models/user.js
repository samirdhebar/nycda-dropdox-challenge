const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const fs = require("fs-extra");
const path = require("path");
const sql = require("../util/sql");
const File = require("./file");

function hashUserPassword(user) {
	if (user.password) {
		return bcrypt.genSalt()
			.then(function(salt) {
		    return bcrypt.hash(user.password, salt);
			})
			.then(function(hashedPw) {
				user.password = hashedPw;
			});
	}
}

const User = sql.define("user", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: Sequelize.STRING,
		notNull: true,
		unique: true,
	},
	password: {
		type: Sequelize.STRING(1000),
		notNull: true,
	},
}, {
	hooks: {
		beforeCreate: hashUserPassword,
		beforeUpdate: hashUserPassword,
	},
});

User.hasMany(File);

User.prototype.comparePassword = function(pw) {
	return bcrypt.compare(pw, this.get("password"));
};

User.prototype.upload = function(file) {
	return this.createFile({
		id: file.filename,
		size: file.size,
		originalName: file.originalname,
		mimeType: file.mimetype,
	})
	.then(function() {
		const ext = path.extname(file.originalname);
		const dest = "assets/files/" + file.filename + ext;
		return fs.copy(file.path, dest);
	})
	.then(function() {
		// If I'm an image, we should generate thumbnail
		// and preview images as well.
	});
}

module.exports = User;
