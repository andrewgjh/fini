const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    db
    .query(`
    SELECT * FROM categories`)
    .then((result) => {
      const category = result.rows;
      res.json({category});
    });
  });
  return router;
};
