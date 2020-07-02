// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const helperFunctions = require("./helperFunctions");

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
//Cookie-session
app.use(
  cookieSession({
    name: "session",
    keys: ["email", "buyer_id"],
  })
);
app.use(express.static("public"));

//Must be after Cookie Session
app.use(helperFunctions.logInMiddleware);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const indexRoutes = require("./routes/index");
const usersRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const listingsRoutes = require("./routes/listings");
const favoritesRoutes = require("./routes/favorites");
const messagesRoutes = require("./routes/messages");
const adminRoutes = require("./routes/messages");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", indexRoutes(db));
app.use("/users", usersRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/listings", listingsRoutes(db));
app.use("/favorites", favoritesRoutes(db));
app.use("/messages", messagesRoutes(db));
app.use("/admin", messagesRoutes(db));

// app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

//GET route to show index. Index displays all listings.
// app.get("/", (req, res) => {
//   console.log("working");
//   res.redirect("/listings");
// });

// app.post("/login", (req, res) => {
//   db.query(``)
//   console.log(req);
//   // res.render("login");
//   console.log("GET request for login page");
// });

// app.get("/listings", (req, res) => {
//   res.render("listings");
//   console.log("GET request for listings page");
// });

// app.get("/user", (req, res) => {
//   res.render("user");
//   console.log("GET request for the user page");
// });

// app.get("/listings/:id", (req, res) => {
//   res.render("specific_listing.ejs");
//   console.log("GET request for the specific listing page");
// });

// app.post("/listings/new", (req, res) => {
//   res.render("new_listing.ejs");
//   console.log("GET request for a new listing page");
// });

// app.get("/listings/new", (req, res) => {
//   res.render("new_listing.ejs");
//   console.log("GET request for a new listing page");
// });

// app.get("/new_message", (req, res) => {
//   res.render("new_message.ejs");
//   console.log("GET request for a page to send a new message to the seller");
// });

// app.get("/error", (req, res) => {
//   res.render("error.ejs");
//   console.log("GET request for a page with the error description");
// });

// app.post("/login", (req, res) => {
//   console.log("POST request for Login");
// });

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

//console.log
