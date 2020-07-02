const express = require("express");
const router = express.Router();
const moment = require('moment'); // require

module.exports = (db) => {
  // POST route to logout. Sets cookie to NULL
  router.post("/logout", (req, res) => {
    console.log("POST request to logout");
    req.session.email = null;
    req.session.buyer_id = null;
    res.redirect("/login");
  });

  //GET route for buyer's page. Shows all favourite items.
  router.get("/myaccount", (req, res) => {
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
    const messagesQuery = `
      SELECT *
      FROM messages
      WHERE buyer_id = $1
      OR seller_id = $1;
      `;
    const email = req.session.email;
    const username = email;
    const promises = [
      db.query(favoritesQuery, [email]),
      db.query(listingsQuery, [req.session.buyer_id]),
      db.query(messagesQuery, [req.session.buyer_id]),
    ];

    Promise.all(promises)
      .then(([favoritesResults, listingResults, messagesResults]) => {
        const favorites = favoritesResults.rows;
        const listings = listingResults.rows;
        const messages = messagesResults.rows;
        const templateVars = { favorites, listings, messages, username };
        res.render("user", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to sort user's favourites by price
  router.post("/favorites_sort", (req, res) => {
    const favoritesQuery = `
    SELECT listings.*, favorites.*
    FROM favorites
    JOIN listings ON favorites.listing_id = listings.id
    JOIN buyers ON favorites.buyer_id = buyers.id
    WHERE buyers.email = $1
    ORDER BY price ASC;
        `;
    const listingsQuery = `
      SELECT *
      FROM listings
      WHERE seller_id = $1;
      `;
    const messagesQuery = `
      SELECT *
      FROM messages
      WHERE buyer_id = $1
      OR seller_id = $1;

      `;
    const email = req.session.email;
    const username = email;
    const promises = [
      db.query(favoritesQuery, [email]),
      db.query(listingsQuery, [req.session.buyer_id]),
      db.query(messagesQuery, [req.session.buyer_id]),
    ];

    Promise.all(promises)
      .then(([favoritesResults, listingResults, messagesResults]) => {
        const favorites = favoritesResults.rows;
        const listings = listingResults.rows;
        const messages = messagesResults.rows;
        const templateVars = { favorites, listings, messages, username };
        res.render("user", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //POST route to sort listings
  router.post("/listings_sort", (req, res) => {
    console.log("Listings Sort working");
    const favoritesQuery = `
    SELECT listings.*, favorites.*
    FROM favorites
    JOIN listings ON favorites.listing_id = listings.id
    JOIN buyers ON favorites.buyer_id = buyers.id
    WHERE buyers.email = $1
    ORDER BY price ASC;
        `;

    const listingsQuery = `
      SELECT listings.*
      FROM listings
      WHERE seller_id = $1;
      `;

    const messagesQuery = `
      SELECT buyers.username, messages.*
      FROM messages
      JOIN buyers ON buyer_id = buyers.id
      WHERE buyer_id = $1
      OR seller_id = $1;
      `;
    const email = req.session.email;
    const username = email;
    const name = username
    const promises = [
      db.query(favoritesQuery, [email]),
      db.query(listingsQuery, [req.session.buyer_id]),
      db.query(messagesQuery, [req.session.buyer_id]),
    ];

    Promise.all(promises)
      .then(([favoritesResults, listingResults, messagesResults]) => {
        const favorites = favoritesResults.rows.map(product => {
          const date = moment(favorite.created_at).format("ddd, hA");
          return { ...favorite, data:date}
        });
        const listings = listingResults.rows.map(product => {
          const date = moment(listing.created_at).format("ddd, hA");
          return { ...listing, date:date}
        });
        const messages = messagesResults.rows;
        const templateVars = { favorites, listings, messages, username };
        res.render("user", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
