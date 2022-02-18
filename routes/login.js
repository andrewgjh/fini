// LOGIN ROUTES
require("dotenv").config();

const express = require('express');
const router  = express.Router();
const database =require('../database-functions');

const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


// Post to /login asserts if a login is valid, sets a cookie and redirects to /main if true
module.exports = () => {
  router.get("/", (req, res) => {
    if (req.session.user) {
      return res.redirect("../");
    }
    res.render("index");
  });

  router.post("/", (req, res) => {
    const email = req.body.email;
    database.findUserByEmail(email)
      .then(data => {
        const user = data[0]
        if (user === undefined){
          return res.status(403).send(`<p>Email not found</p><a href="/login">Click here to go back</a>`);
        }
        if (user.email === email) {
            req.session.user = user;
            return res.redirect("../");
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

