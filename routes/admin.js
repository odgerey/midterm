const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //GET route for buyer's page. Shows all favourite items.
  router.get("/", (req, res) => {
    const listingsQuery = `
      SELECT *
      FROM listings
      `;
    const email = req.session.email;
    const username = email;
    const promises = [db.query(listingsQuery)];

    Promise.all(promises)
      .then(([listingResults]) => {
        const listings = listingResults.rows;
        const templateVars = { listings, username };
        res.render("admin", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
