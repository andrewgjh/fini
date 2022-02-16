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

// TO TEST: curl http://localhost:8080/categories
module.exports = (db) => {
  router.get("/a/:cat_ID", (req, res) => {
    const userID = req.session.user.id;
    const catID = req.params.cat_ID;
    database.findItemCount(userID, catID)
    .then((items)=>{res.json(items)});
  });

  // TO TEST: curl -X POST -d 'title=groceries' -d 'category_id=1' -d 'user_id=2' -d 'deadline=2022-02-14' -d 'is_completed=FALSE' http://localhost:8080/categories
  // router.post("/", (req, res) => {
  //   console.log(req.session.user.id)
  //   const values = [req.body.title, req.session.user.id];
  //   db
  //   .query(`
  //   INSERT INTO to_do_items (title, user_id)
  //   VALUES ($1, $2)
  //   RETURNING *;`, values)
  //   .then(result => {
  //     res.redirect("/categories");
  //     console.log("To do item added.")
  //   })
  //   .catch(err => {
  //     res
  //     .status(500)
  //     // .json({error: err.message})
  //   });
  // });
  return router;
};
