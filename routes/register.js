// REGISTER ROUTE
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

// TO TEST: $ curl -X POST -d 'email=test1@test.com' -d 'first_name=test1' -d 'last_name=test1' -d 'password=test1' http://localhost:8080/register
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });
  router.post("/", (req, res) => {
    const values = [req.body.email, req.body.first_name, req.body.last_name, req.body.password]
    db.query(`INSERT INTO users (
      email, first_name, last_name, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`, values)
      .then(data => {
        // No email checks (for duplicates)
        // no password hash
        // no location input functionality
        // literally just takes the info as given and plugs it into the database
        // then automatically logs in by setting a cookie and redirecting to main page
        req.session.user = data.rows[0];
        return res.redirect("../");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
 return router;
};
