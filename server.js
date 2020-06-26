// load .env data into process.env
require("dotenv").config();

//Cookie-session
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["user_id"],
  })
);

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
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
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("index");
//   console.log("Get request for index page");
// });

// Index
app.get("/", (req, res) => {
  //Need to add conditional to see if the user is logged in
  const queryString = `
  query to pull all products
  `;
  pool
    .query(queryString)
    .then((res) => res.rows)
    .then((products) => {
      res.render("index");
      console.log("Get request for index page");
    });

  // } else {
  //   res.redirect("/login");
  //   console.log("Get request for login page via Index conditional");
  // }
});

// Login Routes

// Get route
// Post route

// My account
// Get route needs to get all products that are in the favourite db
// Post route neeeds to post products that are set as favourite

// Main page
// Get route needs to show all products that are in the database
// post route to filter by price
// post route to send a message

// Admin page
// Get route needs to only be shown if the admin user is logged in. else redirects to login page
// Post edit
// Post delete
// Post route new listings

// Error page
// Get route

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
