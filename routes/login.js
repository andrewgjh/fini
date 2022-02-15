// LOGIN ROUTES
require("dotenv").config();

const express = require('express');
const router  = express.Router();

const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


// Post to /login asserts if a login is valid, sets a cookie and redirects to /main if true
module.exports = (db) => {
  router.get("/", (req, res) => {
    if (req.session.user.id) {
      return res.redirect("../");
    }
    res.render("index");
  });

  router.post("/", (req, res) => {
    const email = req.body.email;
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        // THE FOLLOWING EMAIL CHECK COULD BE A HELPER FUNCTION
        // checks if input email matches a database email
        // If true, sets a cookie with the user profile, redirects to main page
        // NO PASSWORD CHECK (yet?)
        for (let userID of Object.values(users)) {
          console.log(email, userID.email)
          if (userID.email === email) {
            console.log("EMAIL FOUND", userID);
            req.session.user = userID;
            return res.redirect("../");
          }
        }
        return res.status(403).send(`<p>Email not found</p><a href="/login">Click here to go back</a>`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
 return router;
};

