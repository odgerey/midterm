/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const { c } = require("tar");
const { query } = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
// const { user } = require("osenv");
// const { redirect } = require("statuses");
// const { query } = require("express");

module.exports = (db) => {
  /*  Index Routes  */

  //GET route to show index. Index displays all listings.
  router.get("/", (req, res) => {
    const queryString = `
    SELECT *
    FROM listings;
    `;
    db.query(queryString)
      .then((data) => {
        const products = data.rows;
        const templateVars = {};
        console.log(products);
        console.log("GET request for index page");
        res.render("listings", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to filter by price
  router.post("/:price", (req, res) => {
    const queryString = `
    SELECT price FROM listings
    GROUP BY price
    ORDER BY price ASC`;
    db.query(queryString)
      .then((data) => {
        const products = data.rows;
        console.log(products);
        res.render("index");
        console.log("POST request for filter by price");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // /* Login Routes */

  //GET request for login page
  router.get("login", (req, res) => {
    console.log("GET request for login page");
    res.render("login");
  });

  // Helper function to check username
  const loginVerification = function (email) {
    const emailFromDatabase = "";
    if (email === emailFromDatabase) {
      return true;
    }
    return false;
  };

  //POST route to login. Stores e-mail address in cookie
  router.post("/login", (req, res) => {
    const email = req.body.email;
    console.log("Email should be value of form: ");
    loginVerification(email)
      .then((email) => {
        if (!email) {
          console.log("Post login: Login credential error");
          res.send({ error: "error" });
          return;
        }
        email = req.session.email;
        console.log("Email should be cookie: ");
        console.log("Post login: Success");
        res.redirect("/");
      })
      .catch((e) => res.send(e));
  });

  // POST route to logout. Sets cookie to NULL
  router.post("/logout", (req, res) => {
    const userCookie = req.session.email;
    userCookie = null;
    res.redirect("/login");
  });

  /* User Specific Routes */

  //GET route for buyer's page. Shows all favourite items.
  router.get("/:user", (req, res) => {
    const queryString = `
    SELECT favorites.id as favorites, buyers.username
    FROM favorites
    JOIN buyers ON buyers.id = buyer_id`;
    db.query(queryString)
      .then((data) => {
        const products = data.rows;
        const templateVars = {};
        console.log(products);
        console.log("Get request for buyer page");
        res.render("user", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to add favourite
  router.post("/:price", (req, res) => {
    const queryString = `
    SELECT listings.*, favorites.*
    FROM favorites
    JOIN listings ON favorites.listing_id = listings.id`;
    db.query(queryString)
      .then((data) => {
        const products = data.rows;
        const templateVars = {};
        res.render("index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //GET route to view seller's listings
  router.get("/listings/:user", (req, res) => {
    const queryString = `
    SELECT listings.*, sellers.*
    FROM sellers
    JOIN listings ON sellers.listing_id = listings.id
    WHERE sellers.buyer_id = $1`;
    db.query(queryString)
      .then((data) => {
        const products = data.rows;
        const templateVars = {};
        console.log(products);
        console.log("GET request to view seller's listings");
        res.render("user-listings", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to edit seller's listings
  router.post("/listings/:user", (req, res) => {
    const queryString = ` SELECT * FROM listings
    WHERE listing_id = $1`;
    db.query(queryString)
      .then((data) => {
        const products = data.rows;
        console.log(products);
        console.log("POST request to edit items");
        res.render("user-listings");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to delete seller's listings
  router.post("/listings/:user/delete", (req, res) => {
    const queryString = ` SELECT * FROM listings
    WHERE listing_id = $1`;
    db.query(queryString)
      .then((data) => {
        const products = data.rows;
        console.log(products);
        console.log("POST request to delete items");
        res.render("user-listings");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  router.get("/errors", (req, res) => {
    let templateVars = {};
    res.render("urls_errors", templateVars);
  });

  // /* End of Routes */

  return router;
};
