const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const addToDoItem = (item, categoryId, userid)=>{
  const queryStatement = `
  INSERT INTO to_do_items (title, category_id, user_id) VALUES ($1, $2, $3) RETURNING *;`
  const queryParams = [item, categoryId, userid]
  return db.query(queryStatement, queryParams);
};

const findItemsByCategory = (userid, category)=>{
  const queryStatement = `
    SELECT id, title FROM to_do_items
    WHERE user_id = $1
    AND category_id = $2;
    `
    const queryParams = [userid, category]
    return db.query(queryStatement, queryParams)
    .then(data=>{
      return Promise.resolve(data.rows)});
};

// input paramater is category id, ouput will be in the format { completed: '#', total: '#' }
const findItemCount = (userID, catID) => {
  const queryStatement=`
  SELECT (SELECT COUNT(is_completed) FROM to_do_items WHERE is_completed IS TRUE AND user_id = $1 AND category_id = $2) as completed, COUNT(id) as total FROM to_do_items
  WHERE user_id = $1 AND category_id = $2;`
  const queryParams = [userID, catID];
  return db.query(queryStatement, queryParams)
    .then(data=>{
      return Promise.resolve(data.rows[0])});
};


module.exports={
  addToDoItem,
  findItemsByCategory,
  findItemCount,
};
