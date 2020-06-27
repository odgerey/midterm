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
module.exports = (db) => {
  /*


  Routes Below


  */

  /*
  Index Routes
  */


 router.get("/", (req, res) => {
  db.query(`

  query to get all of the listings


  `)
    .then(data => {
      const users = data.rows;
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


  //Post route to filter by price

  router.post("/:price", (req, res) => {
    db.query(`
    query to get afilter the listings by price

    `)
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


  //Login Routes
  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */

   //helper function
  const login = function (email) {

    //user check

    return email

  };


//login get route

  router.post("/login", (req, res) => {
    const { email } = req.body;
    login(email)
      .then((email) => {
        if (!email) {
          res.send({ error: "error" });
          return;
        }
        req.session.email = email;
      })
      .catch((e) => res.send(e));
  });

  // Logout Post

  router.post("/logout", (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  /*
    User Specific Routes
  */

  //Get user page
  router.get("/:user", (req, res) => {
    database
      .getAllFavorites(req.query)
      .then((listings) => res.send({ listings }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // //Get user page
  // app.get("/:user", (req, res) => {
  //   const queryString = `
  //   query to pull all user's favourite products
  //   `;
  //   pool
  //     .query(queryString)
  //     .then((res) => res.rows)
  //     .then((products) => {
  //       res.render("user_page");
  //       console.log("Get request for individual user page");
  //     });
  // });

  /*

    End of routes


    */

  return router;
};
