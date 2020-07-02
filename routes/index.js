const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.redirect("/listings");
  });

  // POST route to logout. Sets cookie to NULL
  router.post("/logout", (req, res) => {
    req.session.email = null;
    req.session.buyer_id = null;
    res.redirect("/login");
  });

  return router;
};
