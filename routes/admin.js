const express = require("express");
const router = express.Router();
const { isAdmin } = require("../helperFunctions");

module.exports = (db) => {
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
        const templateVars = { listings, username, isAdmin  };
        res.render("admin", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
