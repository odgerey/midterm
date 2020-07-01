const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.redirect("/listings");
  });
  return router;
};

// POST route to logout. Sets cookie to NULL
router.post("/logout", (req, res) => {
  console.log("POST request to logout");
  req.session.email = null;
  req.session.buyer_id = null;
  res.redirect("/login");
});
