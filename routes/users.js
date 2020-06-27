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
  /*


  Routes Below


  */

  /*
  Index Routes
  */

  router.get("/", (req, res) => {
    db.query(
      `
      SELECT * FROM listings
  `
    )
      .then((data) => {
        const users = data.rows;
        res.json({ users });
        res.render("index");
        console.log("test");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Post route to filter by price

  router.post("/:price", (req, res) => {
    db.query(
      `
      SELECT price FROM listings
      `
    )
      .then((data) => {
        const products = data.rows;
        res.json({ products });
        res.render("index");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Helper function to check username
  const login = function (email) {};
  router.post("/login", (req, res) => {
    const { email } = req.body;
    login(email)
      .then((email) => {
        if (!email) {
          res.send({ error: "error" });
          return;
        }
        req.session.email = email;
        res.redirect("/");
      })
      .catch((e) => res.send(e));
  });

  // Logout Post

  router.post("/logout", (req, res) => {
    req.session.email = null;
    res.redirect("login/");
  });

  //   /*
  //     User Specific Routes
  //   */

  //   //Get user profile page
  //   router.get("/:user", (req, res) => {
  //     database
  //       .getAllFavorites(req.query)
  //       .then((listings) => res.send({ listings }))
  //       .catch((e) => {
  //         console.error(e);
  //         res.send(e);
  //       });
  //   });

  //   // //Get user page
  //   // app.get("/:user", (req, res) => {
  //   //   const queryString = `
  //   //   query to pull all user's favourite products
  //   //   `;
  //   //   pool
  //   //     .query(queryString)
  //   //     .then((res) => res.rows)
  //   //     .then((products) => {
  //   //       res.render("user_page");
  //   //       console.log("Get request for individual user page");
  //   //     });
  //   // });

  //   /*

  //     End of routes

  //     */

  return router;
};
