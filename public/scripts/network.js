function moveCategory(itemid, newCategory){
  return $.ajax({
    method: 'PUT',
    url: "/to-do-items",
    data: `postID=${itemid}&newCategory=${newCategory}`
  });
};

function getItems (categoryid){
  return $.ajax({
    type: 'GET',
    url: `/to-do-items/${categoryid}`,
  })
}

function postDescription (content, item_id) {
  return $.ajax({
    method: 'PUT',
    url: '/db',
    data: `itemID=${item_id}&content=${content}`
    })
}

function getItemDetails(itemID){
  return $.ajax({
    type: 'GET',
    url: `/db/b/${itemID}`,
  })
}

function completeItemBool(postid, bool){
  return $.ajax({
    method: 'PUT',
    url: "/to-do-items",
    data: `postID=${postid}&bool=${bool}`
  })
}

function postToDoItem (item){
  return $.ajax({
    method: 'POST',
    url: "/to-do-items",
    data: item
  })
}
