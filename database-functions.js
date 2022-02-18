const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const getUser = (userid)=>{
  const queryStatement = `
  SELECT * FROM users WHERE id = $1`
  const queryParams = [userid]
  return db.query(queryStatement, queryParams)
  .then(data=>{
    return Promise.resolve(data.rows[0])});
};

const addToDoItem = (item, categoryId, userid)=>{
  const queryStatement = `
  INSERT INTO to_do_items (title, category_id, user_id) VALUES ($1, $2, $3) RETURNING *;`
  const queryParams = [item, categoryId, userid]
  return db.query(queryStatement, queryParams);
};

const findItemsByCategory = (userid, category)=>{
  const queryStatement = `
    SELECT id, title, is_completed FROM to_do_items
    WHERE user_id = $1
    AND category_id = $2;
    `
    const queryParams = [userid, category]
    return db.query(queryStatement, queryParams)
    .then(data=>{
      return Promise.resolve(data.rows)});
};

const findItemDetails = (itemID) =>{
  const queryStatement = `
  SELECT * FROM to_do_items WHERE id = $1;`
  const queryParams = [itemID];
  return db.query(queryStatement, queryParams)
  .then(data=>{
    return Promise.resolve(data.rows[0])});
};

const updateDescription = function(content, item_id){
  const queryStatement = `
  UPDATE to_do_items
  SET content = $1
  WHERE id = $2
  RETURNING content;`
  const queryParams = [content, item_id];
  return db.query(queryStatement, queryParams)
    .then(data=>{
      return Promise.resolve(data.rows)});
};

const updateItem = function(postid, bool){
  const queryStatement = `
  UPDATE to_do_items
  SET is_completed = $1
  WHERE id = $2
  `
  const queryParams = [bool, postid]
  return db.query(queryStatement, queryParams)
  .then(data=>{
    return Promise.resolve(data.rows)});
};

// input paramater is user id and category id, ouput will be in the format { completed: '#', total: '#' }
const findItemCount = (userID, catID) => {
  const queryStatement=`
  SELECT (SELECT COUNT(is_completed) FROM to_do_items WHERE is_completed IS TRUE AND user_id = $1 AND category_id = $2) as completed, COUNT(id) as total FROM to_do_items
  WHERE user_id = $1 AND category_id = $2;`
  const queryParams = [userID, catID];
  return db.query(queryStatement, queryParams)
    .then(data=>{
      return Promise.resolve(data.rows[0])});
};


const changeCategory = function(postid, newcategoryID){
  const queryStatement = `
  UPDATE to_do_items
  SET category_id = $1
  WHERE id = $2
  RETURNING category_id
  `
  const queryParams = [newcategoryID, postid];
  return db.query(queryStatement, queryParams)
  .then(data=>{
    return Promise.resolve(data.rows)});
}

const deleteItem = function(postid){
  const queryStatement = `
  DELETE FROM to_do_items
  WHERE id = $1
  `
  const queryParams = [postid];
  return db.query(queryStatement, queryParams)
  .then(data=>{
    return Promise.resolve(data.rows)});
}

const getCategory = (userid) => {
  const queryStatement=`
  SELECT * FROM categories
  WHERE user_id = $1;`
  const queryParams = [userid];
  return db.query(queryStatement, queryParams)
    .then(data=>{
      return Promise.resolve(data.rows)});
};

const addCategory = function (categoryName, userid){
  const queryStatement = `
  INSERT INTO categories (name, user_id)
  VALUES ($1, $2)
  RETURNING *;
  `
  const queryParams = [categoryName, userid];
  return db.query(queryStatement, queryParams)
  .then(data=>{
    return Promise.resolve(data.rows[0])});
}

module.exports={
  addToDoItem,
  findItemsByCategory,
  findItemCount,
  updateItem,
  changeCategory,
  deleteItem,
  findItemDetails,
  updateDescription,
  getUser,
  getCategory,
  addCategory
};
