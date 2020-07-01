const express = require("express");
const router = express.Router();
module.exports = (db) => {
  //Get request to load listings
  router.get("/", (req, res) => {
    const queryString = `
    SELECT *
    FROM listings;
    `;
    db.query(queryString)
      .then((data) => {
        if (req.session.email === null) {
          res.redirect("/login");
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
  router.post("/", (req, res) => {
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
  (title, description, cover_photo_url, price, for_sale, seller_id)
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
  router.get("/:id", (req, res) => {
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
      req.params.id,
    ];

    db.query(queryString, values)
      .then((data) => {
        res.redirect("/listings");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
