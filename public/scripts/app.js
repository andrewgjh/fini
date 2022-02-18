// Client facing scripts here
$(function(on) {
  //show & hide the create new to do item form
  $('.navbar-add-todo').on('click', onClickAddItem);
  //post a new item to db
  $('.add-item-form').on('submit', addItem);
  //expands each category with updated items
  $('body').on('click', '.to-do-list-detail-expand', toggleCategory);
  //shows more information and change/delete options for each item
  $('body').on('click', '.to-do-details-detail-expand', toggleToDoListItem);
  // moves an item to another category
  $('body').on('change', '.change-category', changeCategory);
  //toggles the completeness of an item (persisting in the db)
  $('body').on('click', '.item-complete', toggleItemComplete);
  //delete an item from the db
  $('body').on('click', '.item-delete', deleteItemById);
  //saves extra information for each to do item to db
  $('body').on('input', '.text-area-catch', postDescriptionHandler);
  //take inputs for new category name
  $('.to-do-list-add-category').on('click', newCategoryName);
  //submits new category to db
  $('body').on('submit', '.add-category-form', addCategory);
  //gets all extra categories created by current logged in user
  getAllUserCategories();
});




