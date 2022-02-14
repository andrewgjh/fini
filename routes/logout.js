// LOGOUT ROUTES

const express = require('express');
const router  = express.Router();

const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect("../");
  });
  return router;
};
