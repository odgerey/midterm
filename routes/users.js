/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { c } = require("tar");
const { query } = require("express");
const { user } = require("osenv");
// const { redirect } = require("statuses");

module.exports = (db) => {
  /*  Index Routes  */

  //GET route to view seller's listings
  router.post("/new_message", (req, res) => {
    const queryString = `  `;
    const username = req.body.email;
    const templateVars = { username };
    db.query(queryString)
      .then((data) => {
        res.render("new_message", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //GET route to show index. Index displays all listings.
  router.get("/", (req, res) => {
    const queryString = `
    SELECT *
    FROM listings;
    `;
    db.query(queryString)
      .then((data) => {
        if (req.session.email === null) {
          res.redirect("login");
        }
        const products = data.rows;
        const username = req.session.email;
        const templateVars = { products, username };
        res.render("listings", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Get request to load listings
  router.get("/listings", (req, res) => {
    const queryString = `
    SELECT *
    FROM listings;
    `;
    db.query(queryString)
      .then((data) => {
        if (req.session.email === null) {
          res.redirect("login");
        }
        const products = data.rows;
        const username = req.session.email;
        const templateVars = { products, username };
        res.render("listings", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to filter by price
  router.post("/listings", (req, res) => {
    const username = req.session.email;
    const queryString = `
    SELECT *
    FROM listings
    ORDER BY price ASC;
    `;
    db.query(queryString)
      .then((data) => {
        const products = data.rows;
        const templateVars = { products, username };
        res.render("listings", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  /* Login Routes  */

  // GET route for login page
  router.get("/login", (req, res) => {
    const username = req.session.email;
    templateVars = { username };
    res.render("login", templateVars);
  });

  //POST route for login page
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const queryString = `
    SELECT email, id
    FROM buyers
    WHERE buyers.email = $1;

    `;

    db.query(queryString, [email])
      .then((data) => {
        if (!data.rows[0]) {
          console.log("User does not exist");
          res.status(403).json({ message: "User does not exist" });
        }
        const userData = data.rows[0];
        req.session.email = userData.email;
        req.session.buyer_id = userData.id;
        console.log(`Login successful.
        // User Cookie ${req.session.email} and id is ${req.session.buyer_id}`);
        res.redirect(`/users/myaccount`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // POST route to logout. Sets cookie to NULL
  router.post("/logout", (req, res) => {
    console.log("POST request to logout");
    req.session.email = null;
    req.session.buyer_id = null;
    res.redirect("/login");
  });

  /*  User Specific Routes  */

  //GET route for buyer's page. Shows all favourite items.
  router.get("/users/myaccount", (req, res) => {
    const favoritesQuery = `
    SELECT listings.*, favorites.*
    FROM favorites
    JOIN listings ON favorites.listing_id = listings.id
    JOIN buyers ON favorites.buyer_id = buyers.id
    WHERE buyers.email = $1;
    `;
    const listingsQuery = `
      SELECT *
      FROM listings
      WHERE seller_id = $1;
      `;
    const email = req.session.email;
    const username = email;
    const promises = [
      db.query(favoritesQuery, [email]),
      db.query(listingsQuery, [req.session.buyer_id]),
    ];

    Promise.all(promises)
      .then(([favoritesResults, listingResults]) => {
        const favorites = favoritesResults.rows;
        const listings = listingResults.rows;
        const templateVars = { favorites, listings, username };
        res.render("user", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to add favourite
  router.post("/add_favorite/:listingID", (req, res) => {
    const queryString = `
    INSERT INTO favorites (buyer_id, listing_id)
    VALUES  ($1, $2);
    `;
    const listingID = req.params.listingID;
    const values = [req.session.buyer_id, listingID];
    db.query(queryString, values)
      .then((data) => {
        console.log(
          `Added item # ${listingID} from id ${req.session.buyer_id}`
        );
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to remove favourite
  router.post("/remove_favorite/:id", (req, res) => {
    const queryString = `
    DELETE FROM favorites
    WHERE buyer_id = $1
    AND listing_id = $2;
      `;
    const listingID = req.params.listingID;
    const values = [req.session.buyer_id, listingID];
    db.query(queryString, values)
      .then((data) => {
        console.log(
          `Removed item # ${listingID} from id ${req.session.buyer_id}`
        );
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //GET route to view seller's listings
  router.get("/listings/new", (req, res) => {
    const queryString = `  `;
    const username = req.body.email;
    const templateVars = { username };
    db.query(queryString)
      .then((data) => {
        res.render("new_listing", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to add new listings
  router.post("/new_listing", (req, res) => {
    const username = req.session.email;
    const queryString = `
    INSERT INTO listings
    (title, description, cover_photo_url, price, for_sale, seller_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;
    const values = [
      req.body.title,
      req.body.description,
      req.body.image_url,
      req.body.price,
      true,
      req.session.buyer_id,
    ];
    const templateVars = { username };

    db.query(queryString, values)
      .then((data) => {
        console.log(`Listing added
         ${values}`);

        res.redirect("/listings");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to delete listings
  router.post("/listings/:id/delete", (req, res) => {
    const queryString = `
      DELETE FROM listings
      WHERE seller_id = $1
      AND id = $2;
      `;
    const values = [req.session.buyer_id, req.params.id];
    db.query(queryString, values)
      .then((data) => {
        console.log(`Listing #${req.params.id} deleted`);
        res.redirect("/users/myaccount");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET route for new listings page
  router.get("/listings/:id", (req, res) => {
    listingID = req.params.id;
    const queryString = `
    SELECT *
    FROM listings
    WHERE seller_id = $1
    AND id = $2
    `;
    const values = [req.session.buyer_id, listingID];
    db.query(queryString, values)
      .then((data) => {
        const product = data.rows[0];
        const username = req.session.email;
        templateVars = { username, product };
        res.render("edit_listing", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to add edit listings
  router.post("/edit_listing/:id", (req, res) => {
    const queryString = `
    UPDATE listings
    SET  title = $1, description = $2, thumbnail_photo_url = $3, price = $4
    WHERE seller_id = $5
    AND id = $6
    `;

    const values = [
      req.body.title,
      req.body.description,
      req.body.image_url,
      req.body.price,
      req.session.buyer_id,
      req.params.id
    ];

    db.query(queryString, values)
      .then((data) => {
        res.redirect("/listings");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET route for new messages
  router.get("/new_message", (req, res) => {
    const username = req.session.email;
    templateVars = { username };
    res.render("new_message", templateVars);
  });

  // /* End of Routes */

  return router;
};
