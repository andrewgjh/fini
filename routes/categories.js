
const express = require('express');
const router = express.Router();
const database = require('../database-functions');

module.exports = () => {

  router.get('/', (req,res)=>{
    const userID = req.session.user.id;
    database.getCategory(userID)
    .then(data=>{res.send(data)});
  });

  router.post('/', (req,res)=>{
    const userID = req.session.user.id;
    const categoryName = req.body.categoryName;
    database.addCategory(categoryName, userID)
    .then(data=>{res.send(data)});
  });
  return router;
};
