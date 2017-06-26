const Sequelize = require("sequelize");
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
	name: {
		type: Sequelize.STRING,
		notNull: true,
	},
	mime: {
		type: Sequelize.STRING,
		notNull: true,
	},
});

module.exports = File;
