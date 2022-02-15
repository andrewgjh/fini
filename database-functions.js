const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const addToDoItem = (item, categoryId, userid)=>{
  const queryStatement = `
  INSERT INTO to_do_items (title, category_id, user_id) VALUES ($1, $2, $3)`
  const queryParams = [item, categoryId, userid]
  return db.query(queryStatement, queryParams);
}

const findItemsByCategory = (userid, category)=>{
  const queryStatement = `
    SELECT id, title FROM to_do_items
    WHERE user_id = $1
    AND category_id = $2
    `
    const queryParams = [userid, category]
    return db.query(queryStatement, queryParams)
    .then(data=>{
      return Promise.resolve(data.rows)});
}

module.exports={
  addToDoItem,
  findItemsByCategory,
}
