const express = require('express');
const database = require('../database-functions');
const router  = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

module.exports = (db) => {
  router.get("/a/:cat_ID", (req, res) => {
    const userID = req.session.user.id;
    const catID = req.params.cat_ID;
    database.findItemCount(userID, catID)
    .then((items)=>{res.json(items)});
  });

  router.get("/b/:itemID", (req, res) => {
    const itemID = req.params.itemID;
    database.findItemDetails(itemID)
    .then((items)=>{res.json(items)});
  });


  return router;
};
