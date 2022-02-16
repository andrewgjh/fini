function moveCategory(itemid, newCategory){
  return $.ajax({
    method: 'PUT',
    url: "/to-do-items",
    data: `postID=${itemid}&newCategory=${newCategory}`
  });
};
