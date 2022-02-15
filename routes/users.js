// USER ROUTES

const express = require('express');
const { DatabaseError } = require('pg');
const router  = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

module.exports = (db) => {
  router.get("/", (req, res) => {
    if (!req.session.user) {
      return res.redirect("../login");
    }
    return res.render("user");
  });
  router.post("/", (req, res) => {
    // For now this does nothing, stretch task would be to actually update user info
    return res.render("user");
  })
  return router;
};

