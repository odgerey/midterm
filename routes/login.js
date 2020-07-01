const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET route for login page
  router.get("/", (req, res) => {
    const username = req.session.email;
    templateVars = { username };
    res.render("login", templateVars);
  });

  //POST route for login page
  router.post("/", (req, res) => {
    const email = req.body.email;
    const queryString = `
    SELECT email, id
    FROM buyers
    WHERE buyers.email = $1;
    `;

    db.query(queryString, [email])
      .then((data) => {
        if (!data.rows[0]) {
          console.log("User does not exist");
          res.status(403).json({ message: "User does not exist" });
        }
        const userData = data.rows[0];
        req.session.email = userData.email;
        req.session.buyer_id = userData.id;
        console.log(`Login successful.
        // User Cookie ${req.session.email} and id is ${req.session.buyer_id}`);
        res.redirect(`/users/myaccount`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
