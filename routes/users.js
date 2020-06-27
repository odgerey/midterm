/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { user } = require("osenv");
const { redirect } = require("statuses");
module.exports = (db) => {
  /*  Index Routes  */

  // GET route to show index. Index displays all listings.
  router.get("/", (req, res) => {
    db.query(
      `
      SELECT *
      FROM listings;
  `
    )
      .then((data) => {
        const products = data.rows;
        const templateVars = {};
        console.log("GET request for index page");
        res.render("index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to filter by price
  router.post("/:price", (req, res) => {
    db.query(
      `
        SELECT price FROM listings
        `
    )
      .then((data) => {
        const products = data.rows;
        res.render("index");
        console.log("Post request for filter by price");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  /* Login Routes */

  // Helper function to check username
  const loginVerification = function (email) {
    const emailFromDatabase = "";
    if (email === emailFromDatabase) {
      return true;
    }
    false;
  };

  //POST route to login. Stores e-mail address in cookie
  router.post("/login", (req, res) => {
    const email = req.body.email;
    loginVerification(email)
      .then((email) => {
        if (!email) {
          console.log("Post login: Login credential error");
          res.send({ error: "error" });
          return;
        }
        email = req.session.email;
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
    db.query(
      `
      query to show all user's favourites

      `
    )
      .then((data) => {
        const products = data.rows;
        const templateVars = {};
        console.log("Get request for user page");
        res.render("user", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to add favourite
  router.post("/:price", (req, res) => {
    db.query(
      `
      Query to add favourite
      `
    )
      .then((data) => {
        const products = data.rows;
        const templateVars = {};
        console.log("POST request to add favourite");
        res.render("index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //GET route to view seller's listings
  router.get("/listings:user", (req, res) => {
    db.query(
      `
      Query to view specific seller's items
      `
    )
      .then((data) => {
        const products = data.rows;
        const templateVars = {};
        console.log("GET request to view seller's listings");
        res.render("user-listings", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to edit seller's listings
  router.post("/listings:user", (req, res) => {
    db.query(
      `
      Query to edit items
      `
    )
      .then((data) => {
        const products = data.rows;
        console.log("POST request to edit items");
        res.render("user-listings");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to delete seller's listings
  router.post("/listings:user/delete", (req, res) => {
    db.query(
      `
      Query to delete items
      `
    )
      .then((data) => {
        const products = data.rows;
        console.log("POST request to delete items");
        res.render("user-listings");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  /* End of Routes */

  return router;
};
