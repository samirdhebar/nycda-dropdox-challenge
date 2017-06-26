require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const connectSessionSequelize = require("connect-session-sequelize");

const sql = require("./util/sql");
const deserializeUserMW = require("./middleware/deserializeUser");
const renderTemplate = require("./util/renderTemplate");

const app = express();
const cookieSecret = process.env.COOKIE_SECRET || "dev";
const SessionStore = connectSessionSequelize(session.Store);

const docsRoutes = require("./routes/docs");
const authRoutes = require("./routes/auth");



// ********************* //
// *** Configuration *** //
// ********************* //
app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));
app.use(session({
	secret: cookieSecret,
	store: new SessionStore({ db: sql }),
}));
app.use(deserializeUserMW);



// ************** //
// *** Routes *** //
// ************** //
app.get("/", function(req, res) {
	if (req.user) {
		return res.redirect("/docs");
	}

	renderTemplate(req, res, "Welcome", "index");
});

app.use("/auth", authRoutes);
app.use("/docs", docsRoutes);

app.all("*", function(req, res) {
	res.status(404);
	renderTemplate(req, res, "Not Found", "404");
});


// *************** //
// *** Startup *** //
// *************** //
sql.sync().then(function() {
	console.log("Database sync'd");
	const port = process.env.PORT || 3000;
	app.listen(port, function() {
		console.log("App is available at http://localhost:" + port);
	});
});
