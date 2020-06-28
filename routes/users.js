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
const cookieSession = require("cookie-session");

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
        const templateVars = { products };
        console.log(products);

        console.log("GET request for index page");
        res.render("listings", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to filter by price
  router.post("/listings", (req, res) => {
    const queryString = `
    SELECT *
    FROM listings
    ORDER BY price ASC;
    `;
    db.query(queryString)
      .then((data) => {
        const products = data.rows;
        const templateVars = { products };
        console.log(products);
        res.render("listings", templateVars);
        console.log("POST request for filter by price");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  /*

  Login Routes

  */

  // GET route for login page
  router.get("/login", (req, res) => {
    res.render("login");
    console.log("Get request for login page");
  });

  // Helper function to check username
  const loginVerification = function (email) {
    const emailFromDatabase = "";
    if (email === emailFromDatabase) {
      return true;
    }
    return false;
  };

  //POST route for login page
  router.post("/login", (req, res) => {
    const email = req.body.email;
    console.log("Req Body:", email);
    const queryString = `
    SELECT email, id
    FROM buyers
    WHERE buyers.email = $1;

    `;

    db.query(queryString, [email])
      .then((data) => {
        const emailFromDatabase = data.rows;
        console.log(emailFromDatabase[0]);
        //Need to pull email from object and store it in req.session.email
        //Need to pull ID from object and store it in req.session.buyer_ID

        // req.session.email =
        // console.log("Cookie", req.session.email);
      })
      .catch((err) => {
        console.log("Catch");
        res.status(500).json({ error: err.message });
      });
  });

  // POST route to logout. Sets cookie to NULL
  router.post("/logout", (req, res) => {
    const userCookie = req.session.email;
    userCookie = null;
    res.redirect("/login");
  });

  /*


  User Specific Routes

  */

  //GET route for buyer's page. Shows all favourite items.
  router.get("/users/:id", (req, res) => {
    const queryString = `
    SELECT listings.*, favorites.*
    FROM favorites
    JOIN listings ON favorites.listing_id = listings.id
    JOIN buyers ON favorites.buyer_id = buyers.id
    WHERE buyers.email = $1;
    `;
    // const email = req.session.email;
    const email = "john@gmail.com";
    const values = email;
    db.query(queryString, [values])
      .then((data) => {
        const products = data.rows;
        console.log(products);
        const templateVars = { products };

        console.log("Get request for buyer page");
        res.render("user", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to add favourite
  router.post("/:add_favorite", (req, res) => {
    console.log("test");
    const queryString = `
    INSERT INTO favorites (buyer_id, listing_id)
    VALUES ($1, $2)

    `;
    // let listingID = req.body;
    console.log(req.body);
    const values = ["3", "2"]
      .query(queryString, [values])
      .then((data) => {
        const products = data.rows;
        const templateVars = {};
        console.log(products);
        console.log("POST request to add favourite");
        res.render("index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //GET route to view seller's listings
  router.get("/listings:user", (req, res) => {
    const queryString = ` Query to add specific sellers items  `;
    db.query(queryString)
      .then((data) => {
        const products = data.rows;
        const templateVars = {};
        console.log(products);
        console.log("GET request to view seller's listings");
        res.render("user", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to edit seller's listings
  router.post("/listings:user", (req, res) => {
    const queryString = ` query to edit items`;
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
  router.post("/listings:user/delete", (req, res) => {
    const queryString = ` Query to delete items `;
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

  // /* End of Routes */

  return router;
};
