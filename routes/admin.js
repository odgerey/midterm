const express = require("express");
const router = express.Router();
const moment = require("moment");
const { isAdmin } = require("../helperFunctions");

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.is_admin === null) {
      res.redirect("/users/myaccount");
    }
    const listingsQuery = `
      SELECT *
      FROM listings
      `;
    const email = req.session.email;
    const username = email;
    const promises = [db.query(listingsQuery)];

    Promise.all(promises)
      .then(([listingResults]) => {
        const listings = listingResults.rows.map((listing) => {
          const date = moment(listing.created_at).format("ddd, hA");
          return { ...listing, date:date }
        });
        const templateVars = { listings, username, isAdmin };
        res.render("admin", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
