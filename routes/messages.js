const express = require("express");
const router = express.Router();
module.exports = (db) => {
  // GET route for new messages
  router.get("/listings/:id/messages", (req, res) => {
    const username = req.session.email;
    const getMessagesValues = [
      req.params.id,
      req.session.buyer_id,
    ];
    getMessages = `
    SELECT *
    FROM messages
    WHERE listing_id = $1
    AND (seller_id = $2 OR buyer_id = $2);
    `;
      db.query(getMessages, getMessagesValues).then((data) => {
        const listingID = req.params.id;
        const messageData = data.rows;
        templateVars = { username, listingID, messageData };
        res.render("messages", templateVars);
    });
  });
  //Post route to send a new message
  router.post("/listings/:id/messages", (req, res) => {
    getListingInfo = `
    SELECT *
    FROM listings
    WHERE id = $1;
    `;
    db.query(getListingInfo, [req.params.id]).then((data) => {
      const getMessages = `
      INSERT INTO messages (buyer_id, listing_id, seller_id, title, description)
      VALUES ($1, $2, $3, $4, $5);
      `;
      const username = req.session.email;
      const listingID = req.params.id;
      const templateVars = { username };
      const values = [
        req.session.buyer_id,
        listingID,
        data.rows[0].seller_id,
        req.body.subject,
        req.body.body,
      ];
      db.query(getMessages, values)
        .then((data) => {
          res.redirect("/users/myaccount");
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  });

  // GET route to reply to messages
  router.get("/listings/:id/messages/reply", (req, res) => {
    res.redirect(`/messages/listings/${req.params.id}/messages`);
  });
  return router;
};
