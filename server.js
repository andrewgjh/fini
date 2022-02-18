// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Imports the routers

const userHomeRoutes = require("./routes/login");
const mainPageRoutes = require("./routes/main");
const userRegister = require("./routes/register");
// *** FOLLOW UP we may need to remove categories route ***
const dbRoutes = require("./routes/db");
const logoutRoutes = require("./routes/logout");
const usersRoutes = require("./routes/users");
const categoriesRoutes = require("./routes/categories");

// Tells express to use the routers as middleware
// Mount all resource routes

app.use("/users", usersRoutes(db));
app.use("/login", userHomeRoutes(db));
app.use("/", mainPageRoutes());
app.use("/categories", categoriesRoutes());
app.use("/register", userRegister(db));
app.use("/db", dbRoutes(db));
// *** FOLLOW UP we may need to remove categories route ***
app.use("/logout", logoutRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("main");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
