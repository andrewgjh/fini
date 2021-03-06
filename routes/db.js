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

  router.get("/c", (req, res) => {
    database.getAllCategories()
    .then((categories)=>{
      res.json(categories)});
  });

  router.put("/", (req, res) => {
    const content = req.body.content;
    const itemID = req.body.itemID;
    database.updateDescription(content, itemID)
    .then((data)=>res.json(data));
  })


  return router;
};
