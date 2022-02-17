
const express = require('express');
const router = express.Router();
const database = require('../database-functions');
const cookieSession = require('cookie-session');
const {sortCategories} = require('../smart-sort');

router.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

module.exports = () => {

  router.get("/getuser", (req, res) => {
    const userID = req.session.user.id;
    database.getUser(userID)
    .then((items)=>{res.json(items)});
  });


  router.post("/to-do-items", (req, res) => {
    const toDoItem = req.body.toDo;
    sortCategories(toDoItem)
    .then(category =>{
      const userID = req.session.user.id;
      database.addToDoItem(toDoItem, category, userID)
      .then((data)=>res.json(data))
    });
  });

  router.get('/to-do-items/:categoryid', (req,res)=>{
    const categoryId = req.params.categoryid;
    //  simulating grabbing userId (ATTENTION FOR LATER)
    const userID = req.session.user.id;
    database.findItemsByCategory(userID, categoryId)
    .then((items)=>{res.json(items)});
  });


  router.delete("/to-do-items", (req, res) => {
    const deleteItem = req.body.postID;
    console.log(deleteItem);
    database.deleteItem(deleteItem)
    .then((data)=>{res.send(data)});
  });

  router.put("/to-do-items", (req, res) => {
    const updateItemId = req.body.postID;
    const completedItem =req.body.bool;
    const newCategoryID = req.body.newCategory;
    if (newCategoryID && updateItemId){
      database.changeCategory(updateItemId, newCategoryID)
      .then((data)=>{res.json(data)});
    }
    if (completedItem && updateItemId){
      database.updateItem(updateItemId, completedItem)
      .then((data)=>{res.json(data)});
    }
  });
  return router;
};
