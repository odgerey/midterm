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
const bcrypt = require("bcrypt");

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

//bcrypt
const saltRounds = 10;

//Cookie-session
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["user_id"],
  })
);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

/*
Index for testing
*/

app.get("/", (req, res) => {
  res.render("index");
  console.log("Get request for index page");
});

// Remove comments below to begin working on routes

// /*
// Main page routes
// */

// Index
app.get("/", (req, res) => {
  //Need to add conditional to see if the user is logged in
  const queryString = `
  SELECT * FROM listings
  `;
  pool
    .query(queryString)
    .then((res) => res.rows)
    .then((products) => {
      res.render("index");
      console.log("Get request for index page");
    });
});

//Post request to filter by price
app.post("/:user", (req, res) => {
  const queryString = `
  SELECT price FROM listings
  GROUP BY price
  ORDER BY price ASC
  `;
  pool
    .query(queryString)
    .then((res) => res.rows)
    .then((products) => {
      res.render("index");
      console.log("Post request to filter items by price");
    });
});

/*
Login Routes
*/

//Login Get Route
app.get("/login", (req, res) => {

  res.render("login");
});

// Post routes?

/*
User Account Routes
*/

//Get user page
app.get("/:user", (req, res) => {
  const queryString = `

  `;
  pool
    .query(queryString)
    .then((res) => res.rows)
    .then((products) => {
      res.render("user_page");
      console.log("Get request for individual user page");
    });
});

//Post request to add favourite
app.post("/:user", (req, res) => {
  const queryString = `

  `;
  pool
    .query(queryString)
    .then((res) => res.rows)
    .then((products) => {
      res.render("user_page");
      console.log("Post request to add favourite product");
    });
});

//Get user listings
app.get("/:user/listings", (req, res) => {
  const queryString = `


  `;
  pool
    .query(queryString)
    .then((res) => res.rows)
    .then((products) => {
      res.render("listings");
      console.log("Get request for individual user listings page");
    });
});

//Post to edit user listings
//Need conditional to check if the user is logged in
app.post("/:user/listings", (req, res) => {
  const queryString = `
  query to edit product in user listing
  `;
  pool
    .query(queryString)
    .then((res) => res.rows)
    .then((products) => {
      res.render("user_listings");
      console.log("Post request to edit individual user listing");
    });
});

//Post to edit delete user listing
//Need conditional to check if the user is logged in
app.post("/:user/listings/:id/delete", (req, res) => {
  const queryString = `
  query to delete individual product in user listing
  `;
  pool
    .query(queryString)
    .then((res) => res.rows)
    .then((products) => {
      res.render("user_listings");
      console.log("Post request to delete individual product");
    });
});

app.listen(PORT, () => {
  console.log(`pp listening on port ${PORT}`);
});
