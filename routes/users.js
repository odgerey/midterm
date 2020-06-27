/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
module.exports = (db) => {
  /*


  Routes Below


  */

  /*
  Index Routes
  */

  // Index (get all listings)
  router.get("/", (req, res) => {
    database
      .getAllListings(req.query)
      .then((listings) => res.send({ listings }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  //Post route to filter by price

  router.post("/", (req, res) => {
    database
      .getAllListingsByPrice(req.query)
      .then((listings) => res.send({ listings }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  // //Post request to filter by price
  // app.post("/:user", (req, res) => {
  //   const queryString = `
  //   query to sort products by price
  //   `;
  //   pool
  //     .query(queryString)
  //     .then((res) => res.rows)
  //     .then((products) => {
  //       res.render("index");
  //       console.log("Post request to filter items by price");
  //     });
  // });

  //Login Routes
  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login = function (email, password) {
    return database.getUserWithEmail(email).then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  };
  exports.login = login;

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    login(email, password)
      .then((user) => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        req.session.userId = user.id;
        res.send({ user: { name: user.name, email: user.email, id: user.id } });
      })
      .catch((e) => res.send(e));
  });

  // Logout Post

  router.post("/logout", (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  /*

    End of routes


    */

  return router;
};
