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

  //POST route to filter user's favourites by price
  router.post("/favorites_sort", (req, res) => {
    console.log("favorites sort working");
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

  //POST route to sort listings
  router.post("/listings_sort", (req, res) => {
    console.log("Listings Sort working");
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

  return router;
};
