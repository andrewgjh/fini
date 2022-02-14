// LOGIN ROUTES

const express = require('express');
const router  = express.Router();

const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['X0BYyKPSFH', '9Rl8A5NesE'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


// Post to /login asserts if a login is valid, sets a cookie and redirects to /main if true
module.exports = (db) => {
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
          if (userID.email === email) {
            console.log("EMAIL FOUND", userID);
            req.session.user = userID;
            return res.redirect("/main");
          } else {
          return res.status(403).send("Email not found");
          }
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
 return router;
};
