const express = require("express");
const router = express.Router();
const { isAdmin } = require("../helperFunctions");
module.exports = (db) => {
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
    const listingID = req.params.id;
    const values = [req.session.buyer_id, listingID];
    db.query(queryString, values)
      .then((data) => {
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
