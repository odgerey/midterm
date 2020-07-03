const express = require("express");
const router = express.Router();
const moment = require("moment"); // require
const { isFavorite, userCheck, isAdmin } = require("../helperFunctions");

module.exports = (db) => {
  //Get request to load listings and user's favourites
  router.get("/", (req, res) => {
    const getAllProducts = `
    SELECT *
    FROM listings;
    `;
    const getUsersFavorites = `
    SELECT listings.*, favorites.*
    FROM favorites
    JOIN listings ON favorites.listing_id = listings.id
    JOIN buyers ON favorites.buyer_id = buyers.id
    WHERE buyers.email = $1;
    `;

    const email = req.session.email;
    const username = email;
    const promises = [
      db.query(getAllProducts),
      db.query(getUsersFavorites, [email]),
    ];

    Promise.all(promises)
      .then(([productsResults, favoritesResults]) => {
        const favorites = favoritesResults.rows;
        const products = productsResults.rows.map((product) => {
          const date = moment(product.created_at).format("ddd, hA");
          return { ...product, date: date };
        });
        const templateVars = {
          favorites,
          products,
          username,
          isFavorite,
        };
        res.render("listings", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to sort by price
  router.post("/", (req, res) => {
    const getAllProducts = `
    SELECT *
    FROM listings
    ORDER BY price ASC;
    `;
    const getUsersFavorites = `
    SELECT listings.*, favorites.*
    FROM favorites
    JOIN listings ON favorites.listing_id = listings.id
    JOIN buyers ON favorites.buyer_id = buyers.id
    WHERE buyers.email = $1;
    `;
    const userPermissions = `
    SELECT *
    FROM buyers
    WHERE is_admin = true
    AND id = $1;
    `;
    const email = req.session.email;
    const username = email;
    const promises = [
      db.query(getAllProducts),
      db.query(getUsersFavorites, [email]),
      db.query(userPermissions, [req.session.buyer_id]),
    ];

    Promise.all(promises)
      .then(([productsResults, favoritesResults]) => {
        const favorites = favoritesResults.rows;
        console.log("Favorites:", favorites);
        const products = productsResults.rows;
        const templateVars = {
          favorites,
          products,
          username,
          isFavorite,
        };
        res.render("listings", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //GET route to add new listing
  router.get("/new", (req, res) => {
    const username = req.session.email;
    const templateVars = { username };
    res.render("new_listing", templateVars);
  });

  //POST route to add new listings
  router.post("/new_listing", (req, res) => {
    const values = [
      req.body.title,
      req.body.description,
      req.body.image_url,
      req.body.price,
      true,
      req.session.buyer_id,
    ];
    const queryString = `
      INSERT INTO listings
      (title, description, thumbnail_photo_url, price, for_sale, seller_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
  `;

    db.query(queryString, values)
      .then((data) => {
        res.redirect("/listings");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to delete listings
  router.post("/:id/delete", (req, res) => {
    userCheck(db, req.params.id, req.session.buyer_id);
    const queryString = `
      DELETE FROM listings
      WHERE id = $1;
      `;
    const values = [req.params.id];
    db.query(queryString, values)
      .then(() => {
        isAdmin(db, req.session.buyer_id).then((result) => {
          if (result === true) {
            res.redirect("/admin");
          } else {
            res.redirect("/users/myaccount");
          }
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET route for edit listing
  router.get("/:id", (req, res) => {
    userCheck(db, req.params.id, req.session.buyer_id)
      .then((product) => {
        const username = req.session.email;
        templateVars = { username, product };
        res.render("edit_listing", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to submit an edited listing
  router.post("/edit_listing/:id", (req, res) => {
    userCheck(db, req.params.id, req.session.buyer_id);
    const updateListing = `
      UPDATE listings
      SET  title = $1, description = $2, thumbnail_photo_url = $3, price = $4
      WHERE id = $5
      `;
    const listingValues = [
      req.body.title,
      req.body.description,
      req.body.image_url,
      req.body.price,
      req.params.id,
    ];
    db.query(updateListing, listingValues).then(() => {
      isAdmin(db, req.session.buyer_id).then((result) => {
        if (result === true) {
          res.redirect("/admin");
        } else {
          res.redirect("/users/myaccount");
        }
      });
    });
  });

  //POST route to mark as sold
  router.post("/:id/sold/", (req, res) => {
    userCheck(db, req.params.id, req.session.buyer_id);
    const markAsSold = `
      UPDATE listings
      SET thumbnail_photo_url = '/images/sold.png'
      WHERE id = $1
      AND for_sale = true;
        `;
    const values = [req.params.id];
    db.query(markAsSold, values)
      .then(() => {
        isAdmin(db, req.session.buyer_id).then((result) => {
          if (result === true) {
            res.redirect("/admin");
          } else {
            res.redirect("/users/myaccount/#section-listings");
          }
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
